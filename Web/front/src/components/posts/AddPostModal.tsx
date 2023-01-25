import {
  Button,
  Dialog,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { addPost, getUsersWithoutFilters } from "../../Api";
import { IAddPost } from "../../interfaces/posts/IAddPost";
import { IGetUser } from "../../interfaces/users/IGetUser";
interface Props {
  setIsOpenedAddPostModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddedPost: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AddUserModal({
  setIsOpenedAddPostModal,
  setIsAddedPost,
}: Props) {
  const [users, setUsers] = useState<IGetUser[]>([]);
  const titleRef = useRef<HTMLInputElement>();
  const bodyRef = useRef<HTMLInputElement>();
  const userRef = useRef<HTMLInputElement>();
  useEffect(() => {
    getUsersWithoutFilters()
      .then((response) => setUsers(response.data))
      .catch((e) => console.log(e));
  }, []);

  const handleSubmitRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      (bodyRef.current && bodyRef.current?.value.length < 3) ||
      (titleRef.current && titleRef.current?.value.length < 3)
    ) {
      toast.error("Title and Body need to have at least 2 characters each");
    } else if (userRef.current && userRef.current?.value.toString() === "0") {
      toast.error("You need to choose a user");
    } else {
      const postToAdd: IAddPost = {
        title: titleRef.current?.value ?? "",
        body: bodyRef.current?.value ?? "",
        userId: userRef.current?.value ?? "",
      };
      addPost(postToAdd).then((response) => {
        setIsAddedPost(true);
        setIsOpenedAddPostModal(false);
        toast.success("Successfully added new post !");
      });
    }
  };
  return (
    <Dialog open={true} onClose={() => setIsOpenedAddPostModal(false)}>
      <form
        autoComplete="off"
        onSubmit={handleSubmitRequest}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "3em",
        }}
      >
        <h1>Add New Post</h1>
        <FormControl>
          <FormLabel>Body</FormLabel>
          <TextField id="body" variant="outlined" inputRef={bodyRef} />
        </FormControl>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <TextField id="title" variant="outlined" inputRef={titleRef} />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="userId">User</InputLabel>
          <Select
            labelId="userId"
            id="userId"
            defaultValue={0}
            label="User"
            inputRef={userRef}
          >
            <MenuItem value={0}>Choose...</MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="success" type="submit">
          Submit
        </Button>
      </form>
    </Dialog>
  );
}
