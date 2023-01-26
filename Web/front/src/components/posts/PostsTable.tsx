import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { IGetPost } from "../../interfaces/posts/IGetPost";
import PostTableRow from "./PostTableRow";

interface Props {
  posts: IGetPost[];
  setIsUpdatedPost: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeletedPost: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  perPage: number;
}
export default function PostsTable({
  posts,
  setIsDeletedPost,
  setIsUpdatedPost,
  currentPage,
  perPage,
}: Props) {
  if (posts.length === 0)
    return (
      <>
        <h1>No posts found.</h1>
      </>
    );
  else {
    return (
      <TableContainer>
        <Table sx={{ minWidth: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post, index) => (
              <PostTableRow
                key={post.id}
                post={post}
                index={perPage * currentPage + index - perPage}
                setIsDeletedPost={setIsDeletedPost}
                setIsUpdatedPost={setIsUpdatedPost}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
