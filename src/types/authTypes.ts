export type LoginFormProps = {
  onRegister: () => void;

}

export type RegisterFormProps = {
  onLogin: () => void;
}

export type RegisterAuthType = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;

}


export type LoginAuthType = Pick<RegisterAuthType, "email" | "password">

export type AuthContextType = {
  register: (data: RegisterAuthType) => Promise<void>;
  login: (data: LoginAuthType) => Promise<void>;
}



