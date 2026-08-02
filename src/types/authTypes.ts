export type LoginFormProps = {
  onRegister: () => void;

}

export type RegisterFormProps = {
  onLogin: () => void;
}

export type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  jobTitle: string;
  age: number | null;
  monthlyIncome: number | null;
}

export type RegisterAuth = Pick<RegisterForm, "username" | "email" | "password">

export type RegisterData = {
  message: string;
  success: boolean;
  data?: Omit<RegisterForm, "password" | "confirmPassword">;
}

export type AuthContextType = {
  register: (data: RegisterAuth) => Promise<void>
}



