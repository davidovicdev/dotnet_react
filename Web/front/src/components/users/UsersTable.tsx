import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { IGetUser } from "../../interfaces/users/IGetUser";
import UserTableRow from "./UserTableRow";

interface Props {
  users: IGetUser[];
  setIsUpdatedUser: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeletedUser: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  perPage: number;
}
export default function UsersTable({
  users,
  setIsDeletedUser,
  setIsUpdatedUser,
  currentPage,
  perPage,
}: Props) {
  if (users.length === 0)
    return (
      <>
        <h1>No users found.</h1>
      </>
    );
  else {
    return (
      <TableContainer>
        <Table sx={{ minWidth: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Number of Posts</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <UserTableRow
                key={user.id}
                user={user}
                index={perPage * currentPage + index - perPage}
                setIsDeletedUser={setIsDeletedUser}
                setIsUpdatedUser={setIsUpdatedUser}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
