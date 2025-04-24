import { User } from "./User";

export type Request = {
  id: number;
  details: string;
  createdAt: string;
  status: string;
  user: User;
}
