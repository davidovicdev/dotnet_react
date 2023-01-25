import { IGetPost } from "../posts/IGetPost";

export interface IGetUser {
  id: string;
  firstName: string;
  lastName: string;
  posts: IGetPost[];
}
