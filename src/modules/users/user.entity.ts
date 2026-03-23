export class User {
  id: string;
  email: string;
  password?: string; // Hashed password, optional in return types
  name: string;
  createdAt: Date;
}
