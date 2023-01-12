import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function PostsDashboard() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Posts");
        if (!isCancelled) {
          setPosts(response.data.posts);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Body</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post, index) => (
            // <TableRow key={user.id}>
            <TableRow key={++index}>
              <TableCell>{++index}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.body}</TableCell>
              <TableCell>
                {post.user.firstName} {post.user.lastName}
              </TableCell>
              <TableCell>
                <Button variant="contained" color="warning">
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="contained" color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
export default PostsDashboard;
