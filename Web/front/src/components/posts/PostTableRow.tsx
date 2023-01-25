import { Button, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { IGetPost } from "../../interfaces/posts/IGetPost";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";

interface Props {
  post: IGetPost;
  index: number;
  setIsUpdatedPost: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeletedPost: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function PostTableRow({
  post,
  index,
  setIsDeletedPost,
  setIsUpdatedPost,
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
        <TableCell>
          {post.user?.firstName} {post.user?.lastName}
        </TableCell>
        <TableCell>{post.title}</TableCell>
        <TableCell>{post.body}</TableCell>
        <TableCell>
          <Button variant="contained" color="warning" onClick={handleEditClick}>
            Edit
          </Button>
          {isOpenedEditModal && (
            <EditPostModal
              setIsOpenedEditModal={setIsOpenedEditModal}
              setIsUpdatedPost={setIsUpdatedPost}
              post={post}
            />
          )}
        </TableCell>
        <TableCell>
          <Button variant="contained" color="error" onClick={handleDeleteClick}>
            Delete
          </Button>
          {isOpenedDeleteModal && (
            <DeletePostModal
              setIsOpenedDeletePostModal={setIsOpenedDeleteModal}
              setIsDeletedPost={setIsDeletedPost}
              post={post}
            />
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
