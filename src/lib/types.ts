import { Collection, ObjectId } from "mongodb";

export interface User {
	_id: ObjectId;
	token: string;
	name: string;
	email: string;
	password: string;
	files: string[];
}
export interface Database {
	users: Collection<User>;
}
