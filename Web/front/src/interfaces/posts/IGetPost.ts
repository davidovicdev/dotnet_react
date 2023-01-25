import { IGetUser } from "../users/IGetUser";

export interface IGetPost {
  id: string;
  title: string;
  body: string;
  user?: IGetUser;
}
