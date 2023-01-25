import {
  Button,
  Dialog,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import { useRef } from "react";
import { toast } from "react-toastify";
import { updatePost } from "../../Api";
import { IGetPost } from "../../interfaces/posts/IGetPost";
import { IUpdatePost } from "../../interfaces/posts/IUpdatePost";

interface Props {
  post: IGetPost;
  setIsOpenedEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUpdatedPost: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditPostModal({
  post,
  setIsOpenedEditModal,
  setIsUpdatedPost,
}: Props) {
  const titleRef = useRef<HTMLInputElement>();
  const bodyRef = useRef<HTMLInputElement>();
  const handleUpdateRequest = (e: any) => {
    e.preventDefault();
    if (
      (titleRef.current && titleRef.current?.value.length < 3) ||
      (bodyRef.current && bodyRef.current?.value.length < 3)
    ) {
      toast.error("Body and Title need to have at least 2 characters each");
    } else {
      const postToUpdate: IUpdatePost = {
        id: post.id,
        title: titleRef.current?.value ?? "",
        body: bodyRef.current?.value ?? "",
      };
      updatePost(postToUpdate).then((response) => {
        setIsUpdatedPost(true);
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
        <h1>Edit Post</h1>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <TextField
            id="title"
            variant="outlined"
            defaultValue={post.title}
            inputRef={titleRef}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Body</FormLabel>
          <TextField
            id="body"
            variant="outlined"
            defaultValue={post.body}
            inputRef={bodyRef}
          />
        </FormControl>
        <Button variant="contained" color="success" type="submit">
          Update
        </Button>
      </form>
    </Dialog>
  );
}
