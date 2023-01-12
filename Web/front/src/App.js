import { Button, Container } from "@mui/material";
import { useState } from "react";
import "./App.css";
import PostsDashboard from "./components/posts/PostsDashboard";
import UserDashboard from "./components/users/UsersDashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const USERS = "Users";
const POSTS = "Posts";

function App() {
  const [dashboard, setDashboard] = useState("");
  return (
    <>
      <Container maxWidth="sm" className="buttons">
        <Button variant="contained" onClick={() => setDashboard(USERS)}>
          {USERS}
        </Button>
        <Button variant="contained" onClick={() => setDashboard(POSTS)}>
          {POSTS}
        </Button>
      </Container>
      <Container maxWidth="xl" className="dashboard">
        {dashboard === USERS ? <UserDashboard /> : ""}
        {dashboard === POSTS ? <PostsDashboard /> : ""}
      </Container>
      <ToastContainer />
    </>
  );
}
export default App;
