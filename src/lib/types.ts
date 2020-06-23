import { Collection, ObjectId } from "mongodb";

export interface User {
	_id: ObjectId;
	name: string;
	email: string;
	password: string;
	files: string[];
	resetToken: string;
	resetTokenExpiresIn: number;
}
export interface Database {
	users: Collection<User>;
}
