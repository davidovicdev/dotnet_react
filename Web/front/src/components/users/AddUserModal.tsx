import {
  Button,
  Dialog,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import { useRef } from "react";
import { toast } from "react-toastify";
import { addUser } from "../../Api";
import { IAddUser } from "../../interfaces/users/IAddUser";
interface Props {
  setIsOpenedAddUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddedUser: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AddUserModal({
  setIsOpenedAddUserModal,
  setIsAddedUser,
}: Props) {
  const firstNameRef = useRef<HTMLInputElement>();
  const lastNameRef = useRef<HTMLInputElement>();
  const handleSubmitRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      (firstNameRef.current && firstNameRef.current?.value.length < 3) ||
      (lastNameRef.current && lastNameRef.current?.value.length < 3)
    ) {
      toast.error("Names need to have at least 2 characters each");
    } else {
      const userToAdd: IAddUser = {
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
      };
      addUser(userToAdd).then((response) => {
        setIsAddedUser(true);
        setIsOpenedAddUserModal(false);
        toast.success("Successfully added new user !");
      });
    }
  };
  return (
    <Dialog open={true} onClose={() => setIsOpenedAddUserModal(false)}>
      <form
        autoComplete="off"
        onSubmit={handleSubmitRequest}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "3em",
        }}
      >
        <h1>Add New User</h1>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <TextField
            id="first-name"
            variant="outlined"
            inputRef={firstNameRef}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <TextField id="last-name" variant="outlined" inputRef={lastNameRef} />
        </FormControl>
        <Button variant="contained" color="success" type="submit">
          Submit
        </Button>
      </form>
    </Dialog>
  );
}
