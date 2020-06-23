const { gql } = require("apollo-server-express");

export const typeDefs = gql`
	input logInInput {
		email: String!
		password: String!
	}
	input forgotPasswordInput {
		email: String!
	}
	input resetPasswordInput {
		password: String!
	}
	type JwtToken {
		token: String!
	}
	type ResetToken {
		resetToken: String!
	}
	type Query {
		logIn(input: logInInput!): JwtToken!
	}
	type Mutation {
		forgotPassword(input: forgotPasswordInput!): ResetToken!
		resetPassword(input: resetPasswordInput!): String!
	}
`;
