export interface LogInArgs {
	input: {
		email: string;
		password: string;
	};
}
export interface ForgotPasswordArgs {
	input: {
		email: string;
	};
}
export interface ResetPasswordArgs {
	input: {
		password: string;
	};
}
