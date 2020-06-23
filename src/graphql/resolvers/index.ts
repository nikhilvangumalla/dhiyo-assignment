import { IResolvers } from "apollo-server-express";
import jwt from "jsonwebtoken";
import { Database } from "../../lib/types";
import { LogInArgs } from "./types";

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
};
