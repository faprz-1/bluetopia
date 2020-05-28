export class LoginData {
  public email: string;
  public password: string;
}

export class RegistrationData extends LoginData {
  public username: string;
  public type: string;
}
