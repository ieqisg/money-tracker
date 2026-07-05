export type LoginFormProps = {
  onRegister: () => void;

}

export type RegisterFormProps = {
  onLogin: () => void;
}

export type RegisterUser = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  jobTitle: string;
  age: number;
  monthlyIncome: number;
}

export type PasswordFields = Pick<RegisterUser, "password" | "confirmPassword">;
