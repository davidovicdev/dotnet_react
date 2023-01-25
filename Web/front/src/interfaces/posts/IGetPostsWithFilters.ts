import { IFilters } from "../IFilters";
import { IGetPost } from "./IGetPost";

export interface IGetPostsWithFilters {
  filters: IFilters;
  posts: IGetPost[];
}
