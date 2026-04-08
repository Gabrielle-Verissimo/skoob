export interface LoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface Login {
  token: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
}

export interface UserResponse {
  id: string;
  name: string;
  userName: string;
  email: string;
}

export interface RegisterInput {
  name: string;
  userName: string;
  email: string;
  password: string;
}
