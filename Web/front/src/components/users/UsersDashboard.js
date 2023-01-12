import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AddUserModal from "./AddUserModal";

function UsersDashboard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("FirstName");
  const deleteUserClickHandler = (user) => {
    <AddUserModal user={user} />;
  };
  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Users");
        if (!isCancelled) {
          console.log(response.data);
          setUsers(response.data.users);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [showAddModal, showDeleteModal]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => setShowAddModal(true)}
        >
          Add New User
        </Button>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              autoFocus
              id="search"
              label="Search..."
              type="text"
              variant="standard"
            />
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel id="sortBy" htmlFor="sortBy">
                Sort By
              </InputLabel>
              <Select
                labelId="sortBy"
                id="sortBy"
                value={sortBy}
                label="sortBy"
                // onChange={handleChange}
              >
                <MenuItem value="FirstName">First Name</MenuItem>
                <MenuItem value="LastName">Last Name</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="perPage" htmlFor="perPage">
                Per Page
              </InputLabel>
              <Select
                labelId="perPage"
                id="perPage"
                value={perPage}
                label="perPage"
                // onChange={handleChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <AddUserModal setShowModal={setShowAddModal} showModal={showAddModal} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Posts</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            // <TableRow key={user.id}>
            <TableRow key={++index}>
              <TableCell>{++index}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>
                {user.posts.length !== 0 ? user.posts.length : "No posts"}
              </TableCell>
              <TableCell>
                <Button variant="contained" color="warning">
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    deleteUserClickHandler(user);
                  }}
                >
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
export default UsersDashboard;
