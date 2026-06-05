export type AuthFormData = {
  userName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpFormData = AuthFormData;

export type LoginFormData = Pick<AuthFormData, 'email' | 'password'>;

export type ForgotPasswordFormData = Pick<AuthFormData, 'email'>;

export type ResetPasswordFormData = Pick<AuthFormData, 'email' | 'password' | 'confirmPassword'> & {
  seed: string;
};

export type ChangePasswordFormData = Pick<AuthFormData, 'password' | 'confirmPassword'> & {
  oldPassword: string;
};