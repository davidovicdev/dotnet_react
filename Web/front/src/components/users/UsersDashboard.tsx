import { useEffect, useState } from "react";
import { getFilteredUsers } from "../../api";
import { Filters } from "../../Interfaces/Filters";
import { User } from "../../Interfaces/User";
export default function UsersDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<Filters>({
    perPage: 10,
    page: 1,
    sortBy: "FirstName",
    search: "",
  });
  useEffect(() => {
    getFilteredUsers(filters).then((response) => {
      if (response) {
        setUsers(response.data.users);
      }
    });
  }, [filters]);

  return <div>UsersDashboard</div>;
}
