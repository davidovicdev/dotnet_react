import { Button, Dialog } from "@mui/material";
import { toast } from "react-toastify";
import { deletePost } from "../../Api";
import { IGetPost } from "../../interfaces/posts/IGetPost";

interface Props {
  post: IGetPost;
  setIsOpenedDeletePostModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeletedPost: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeletePostModal({
  post,
  setIsOpenedDeletePostModal,
  setIsDeletedPost,
}: Props) {
  const handleDeleteRequest = (e: any) => {
    e.preventDefault();
    deletePost(post.id).then((response) => {
      setIsDeletedPost(true);
      setIsOpenedDeletePostModal(false);
      toast.success("Successfully deleted Post !");
    });
  };
  return (
    <Dialog open={true} onClose={() => setIsOpenedDeletePostModal(false)}>
      <form
        autoComplete="off"
        onSubmit={handleDeleteRequest}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "3em",
        }}
      >
        <h2>Are you sure you want to delete the post ?</h2>
        <Button variant="contained" color="error" type="submit">
          Yes
        </Button>
      </form>
    </Dialog>
  );
}
