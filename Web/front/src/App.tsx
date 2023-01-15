import { Button } from "@mui/material";
import { useState } from "react";
import PostsDashboard from "./components/posts/PostsDashboard";
import UsersDashboard from "./components/users/UsersDashboard";

function App() {
  const [showDashboard, setShowDashboard] = useState("");
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "30px auto",
          width: "50%",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setShowDashboard("Users");
          }}
        >
          Users
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setShowDashboard("Posts");
          }}
        >
          Posts
        </Button>
      </div>
      {showDashboard === "Users" && <UsersDashboard />}
      {showDashboard === "Posts" && <PostsDashboard />}
    </>
  );
}

export default App;
