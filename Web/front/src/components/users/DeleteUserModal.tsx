import { Button, Dialog } from "@mui/material";
import { toast } from "react-toastify";
import { deleteUser } from "../../Api";
import { IGetUser } from "../../interfaces/users/IGetUser";

interface Props {
  user: IGetUser;
  setIsOpenedDeleteUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeletedUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteUserModal({
  user,
  setIsOpenedDeleteUserModal,
  setIsDeletedUser,
}: Props) {
  const handleDeleteRequest = (e: any) => {
    e.preventDefault();
    deleteUser(user.id).then((response) => {
      setIsDeletedUser(true);
      setIsOpenedDeleteUserModal(false);
      toast.success("Successfully deleted user !");
    });
  };
  return (
    <Dialog open={true} onClose={() => setIsOpenedDeleteUserModal(false)}>
      <form
        autoComplete="off"
        onSubmit={handleDeleteRequest}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "3em",
        }}
      >
        <h2>
          Are you sure you want to delete {user.firstName} {user.lastName} ?
        </h2>
        <h4>(You will delete all his posts too)</h4>
        <Button variant="contained" color="error" type="submit">
          Yes
        </Button>
      </form>
    </Dialog>
  );
}
