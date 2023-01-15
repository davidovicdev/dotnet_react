import axios from "axios";
import { Filters } from "./Interfaces/Filters";

const SERVER_URL = "http://localhost:5000/api";

export const getFilteredUsers = async (filters: Filters) => {
  try {
    const response = await axios.get(SERVER_URL + "/UsersFilters", {
      params: filters,
    });
    return response;
  } catch (e) {
    return console.log(e);
  }
};
