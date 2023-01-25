import {
  Button,
  Dialog,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import { useRef } from "react";
import { toast } from "react-toastify";
import { updateUser } from "../../Api";
import { IGetUser } from "../../interfaces/users/IGetUser";
import { IUpdateUser } from "../../interfaces/users/IUpdateUser";

interface Props {
  user: IGetUser;
  setIsOpenedEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUpdatedUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditUserModal({
  user,
  setIsOpenedEditModal,
  setIsUpdatedUser,
}: Props) {
  const firstNameRef = useRef<HTMLInputElement>();
  const lastNameRef = useRef<HTMLInputElement>();
  const handleUpdateRequest = (e: any) => {
    e.preventDefault();
    if (
      (firstNameRef.current && firstNameRef.current?.value.length < 3) ||
      (lastNameRef.current && lastNameRef.current?.value.length < 3)
    ) {
      toast.error("Names need to have at least 2 characters each");
    } else {
      const userToUpdate: IUpdateUser = {
        id: user.id,
        firstName: firstNameRef.current?.value ?? "",
        lastName: lastNameRef.current?.value ?? "",
      };
      updateUser(userToUpdate).then((response) => {
        setIsUpdatedUser(true);
        setIsOpenedEditModal(false);
      });
    }
  };

  return (
    <Dialog open={true} onClose={() => setIsOpenedEditModal(false)}>
      <form
        autoComplete="off"
        onSubmit={handleUpdateRequest}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "3em",
        }}
      >
        <h1>Edit user</h1>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <TextField
            id="first-name"
            variant="outlined"
            defaultValue={user.firstName}
            inputRef={firstNameRef}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <TextField
            id="last-name"
            variant="outlined"
            defaultValue={user.lastName}
            inputRef={lastNameRef}
          />
        </FormControl>
        <Button variant="contained" color="success" type="submit">
          Update
        </Button>
      </form>
    </Dialog>
  );
}
