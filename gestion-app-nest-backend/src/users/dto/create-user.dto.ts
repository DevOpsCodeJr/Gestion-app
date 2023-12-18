export class CreateUserDto {
  email: string;
  password: string;
  dni: string;
  name?: string;
  role?: string;
}
