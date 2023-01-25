import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getUsersWithFilters } from "../../Api";
import { IFilters } from "../../interfaces/IFilters";
import { IGetUser } from "../../interfaces/users/IGetUser";
import Filters from "../common/Filters";
import Pagination from "../common/Pagination";
import AddUserModal from "./AddUserModal";
import UsersTable from "./UsersTable";

const DEFAULT_FILTERS: IFilters = {
  perPage: 10,
  page: 1,
  search: "",
  sortBy: "FirstName",
};
export default function UsersDashboard() {
  const [isOpenedAddUserModal, setIsOpenedAddUserModal] =
    useState<boolean>(false);
  const [users, setUsers] = useState<IGetUser[]>([]);
  const [isAddedUser, setIsAddedUser] = useState<boolean>(false);
  const [isDeletedUser, setIsDeletedUser] = useState<boolean>(false);
  const [isUpdatedUser, setIsUpdatedUser] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState<number>(1);
  const [filters, setFilters] = useState<IFilters>(DEFAULT_FILTERS);
  useEffect(() => {
    setIsUpdatedUser(false);
    setIsDeletedUser(false);
    setIsAddedUser(false);
    getUsersWithFilters(filters)
      .then((response) => {
        setUsers(response.data.users);
        setPageCount(response.data.filters.pageCount);
      })
      .catch((error) => console.log(error));
  }, [filters, isAddedUser, isDeletedUser, isUpdatedUser]);
  console.log(pageCount);
  return (
    <div style={{ marginRight: "1em" }}>
      <h2 style={{ textAlign: "center" }}>USERS</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Button
          color="success"
          variant="contained"
          onClick={() => setIsOpenedAddUserModal(true)}
        >
          Add New User
        </Button>
        {isOpenedAddUserModal && (
          <AddUserModal
            setIsOpenedAddUserModal={setIsOpenedAddUserModal}
            setIsAddedUser={setIsAddedUser}
          />
        )}
        <Filters filters={filters} dashboard="users" setFilters={setFilters} />
      </div>
      <UsersTable
        users={users}
        currentPage={filters.page}
        perPage={filters.perPage}
        setIsDeletedUser={setIsDeletedUser}
        setIsUpdatedUser={setIsUpdatedUser}
      />
      <Pagination
        filters={filters}
        setFilters={setFilters}
        pageCount={pageCount}
      />
    </div>
  );
}
