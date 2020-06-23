import { IResolvers } from "apollo-server-express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Database, User } from "../../lib/types";
import { LogInArgs, ForgotPasswordArgs, ResetPasswordArgs } from "./types";

const createJWT = (id: string) => {
	if (process.env.JWT_SECRET && process.env.JWT_EXPIRES_IN) {
		return jwt.sign({ id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN,
		});
	} else {
		throw new Error("Failed to create jwt");
	}
};

export const resolvers: IResolvers = {
	Query: {
		logIn: async (
			_root,
			{ input }: LogInArgs,
			{ db }: { db: Database }
		): Promise<{ token: string }> => {
			try {
				const user = await db.users.findOne({
					email: input.email,
					password: input.password,
				});
				if (user === null) {
					throw new Error(
						"Invalid Credentials or Sign Up If you haven't already"
					);
				}
				const token = createJWT(user._id.toString());
				return { token };
			} catch (error) {
				if (error.message) {
					throw new Error(error.message);
				}
				throw new Error("Failed to Log in");
			}
		},
	},
	Mutation: {
		forgotPassword: async (
			_root,
			{ input }: ForgotPasswordArgs,
			{ db }: { db: Database }
		): Promise<{ resetToken: string }> => {
			try {
				const user = db.users.findOne({ email: input.email });
				if (!user) throw new Error("User Does not exist");
				const resetToken = crypto.randomBytes(32).toString("hex");
				await db.users.findOneAndUpdate(
					{ email: input.email },
					{
						$set: {
							resetToken,
							resetTokenExpiresIn: Date.now() * 10 * 60 * 1000,
						},
					}
				);
				return { resetToken };
			} catch (error) {
				if (error.message) {
					throw new Error(error.message);
				}
				throw new Error("Failed to Log in");
			}
		},
		resetPassword: async (
			_root,
			{ input }: ResetPasswordArgs,
			{ req, db }: { req: any; db: Database }
		): Promise<string | undefined> => {
			try {
				const user = await db.users.findOne({
					resetToken: req.headers.resettoken,
					resetTokenExpiresIn: { $gt: Date.now() },
				});
				if (!user) throw new Error("Password Reset Token Expired");
				const updatedUser = await db.users.findOneAndUpdate(
					{ _id: user._id },
					{
						$set: {
							password: input.password,
							resetToken: undefined,
							resetTokenExpiresIn: undefined,
						},
					}
				);
				if (!updatedUser) throw new Error("Failed to reset Password");
				return "Successfully updated Password";
			} catch (error) {
				if (error.message) throw new Error(error.message);
				throw new Error("Failed to reset Password");
			}
		},
	},
};
