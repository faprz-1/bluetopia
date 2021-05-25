import { LoginData } from "./login-data.interface";

export interface RegistrationData extends LoginData {
  username: string;
  type: string;
}