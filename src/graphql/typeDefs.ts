const { gql } = require("apollo-server-express");

export const typeDefs = gql`
	input logInInput {
		email: String!
		password: String!
	}
	type JwtToken {
		token: String!
	}
	type Query {
		logIn(input: logInInput!): JwtToken!
	}
`;
