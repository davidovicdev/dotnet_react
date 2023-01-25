import { Button, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { IGetUser } from "../../interfaces/users/IGetUser";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";

interface Props {
  user: IGetUser;
  index: number;
  setIsUpdatedUser: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeletedUser: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function UserTableRow({
  user,
  index,
  setIsDeletedUser,
  setIsUpdatedUser,
}: Props) {
  const [isOpenedEditModal, setIsOpenedEditModal] = useState<boolean>(false);
  const [isOpenedDeleteModal, setIsOpenedDeleteModal] =
    useState<boolean>(false);
  const handleEditClick = () => {
    setIsOpenedEditModal(true);
  };
  const handleDeleteClick = () => {
    setIsOpenedDeleteModal(true);
  };
  return (
    <>
      <TableRow>
        <TableCell>{++index}</TableCell>
        <TableCell>{user.firstName}</TableCell>
        <TableCell>{user.lastName}</TableCell>
        <TableCell>
          {user.posts.length === 0 ? "No Posts" : user.posts.length}
        </TableCell>
        <TableCell>
          <Button variant="contained" color="warning" onClick={handleEditClick}>
            Edit
          </Button>
          {isOpenedEditModal && (
            <EditUserModal
              setIsOpenedEditModal={setIsOpenedEditModal}
              setIsUpdatedUser={setIsUpdatedUser}
              user={user}
            />
          )}
        </TableCell>
        <TableCell>
          <Button variant="contained" color="error" onClick={handleDeleteClick}>
            Delete
          </Button>
          {isOpenedDeleteModal && (
            <DeleteUserModal
              setIsOpenedDeleteUserModal={setIsOpenedDeleteModal}
              setIsDeletedUser={setIsDeletedUser}
              user={user}
            />
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
