import { authClient } from "@/lib/authClient";
export type LoginFormProps = {
  onRegister: () => void;
};

export type RegisterFormProps = {
  onLogin: () => void;
};

export type RegisterAuthType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginAuthType = Pick<RegisterAuthType, "email" | "password">;

export type AuthContextType = {
  register: (data: RegisterAuthType) => Promise<ApiResponse>;
  login: (data: LoginAuthType) => Promise<ApiResponse>;
  getSession: () => Promise<ApiResponse>;
  signOut: () => Promise<ApiResponse>;
  session: Session | null;
  loading: boolean;
};

export type ApiResponse = {
  success: boolean;
  data?: any;
  message?: string;
  status?: number;
  error?: any;
};

export type Session = typeof authClient.$Infer.Session;
