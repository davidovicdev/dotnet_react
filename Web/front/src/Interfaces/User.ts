import { Post } from "./Post";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  posts?: Array<Post>;
}
