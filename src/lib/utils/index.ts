import { promisify } from "util";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { Database, DecodedData, User } from "../types";

export const authorize = async (
	req: any,
	db: Database
): Promise<User | undefined> => {
	try {
		if (process.env.JWT_SECRET && req.headers.authorization) {
			const token = req.headers.authorization.split(" ")[1];
			const decodedData = (await promisify(jwt.verify)(
				token,
				process.env.JWT_SECRET
			)) as DecodedData;
			const id = new ObjectId(decodedData.id);
			const user = await db.users.findOne({ _id: id });
			if (!user) {
				throw new Error(
					"user with the provided token no longer exists in the database"
				);
			}
			return user;
		}
	} catch (error) {
		throw new Error("User Not Logged in or Token Expried. Please Log in");
	}
};
