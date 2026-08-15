import { authClient } from "@/lib/authClient";
export type LoginFormProps = {
  onRegister: () => void;

}

export type RegisterFormProps = {
  onLogin: () => void;
}

export type RegisterAuthType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;

}


export type LoginAuthType = Pick<RegisterAuthType, "email" | "password">

export type AuthContextType = {
  register: (data: RegisterAuthType) => Promise<AuthResponse>;
  login: (data: LoginAuthType) => Promise<AuthResponse>;
  getSession: () => Promise<AuthResponse>
  signOut: () => Promise<AuthResponse>
  session: Session | null
  loading: boolean;
}

export type AuthResponse = {
  success: boolean;
  data?: any;
  message?: string;
  status?: number
  error?: any;
}


export type Session = typeof authClient.$Infer.Session



