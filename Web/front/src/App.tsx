import { Grid } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostsDashboard from "./components/posts/PostsDashboard";
import UsersDashboard from "./components/users/UsersDashboard";

function App() {
  return (
    <Grid container>
      <ToastContainer />
      <Grid item xs={5.99} style={{ height: "100vh" }}>
        <UsersDashboard />
      </Grid>
      <Grid
        item
        xs={0.01}
        style={{ height: "100vh", backgroundColor: "#ccc", marginTop: "1em" }}
      ></Grid>

      <Grid item xs={5.99} style={{ height: "100vh" }}>
        <PostsDashboard />
      </Grid>
    </Grid>
  );
}

export default App;
