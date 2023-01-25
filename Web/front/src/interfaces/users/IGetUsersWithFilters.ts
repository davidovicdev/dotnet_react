import { IFilters } from "../IFilters";
import { IGetUser } from "./IGetUser";

export interface IGetUsersWithFilers {
  filters: IFilters;
  users: IGetUser[];
}
