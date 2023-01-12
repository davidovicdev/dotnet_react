import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useRef } from "react";
import { toast } from "react-toastify";
export default function AddUserModal({ showModal, setShowModal }) {
  const formRef = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const firstName = formRef.current.firstName.value;
    const lastName = formRef.current.lastName.value;
    if (firstName.length < 3 || lastName.length < 3) {
      console.log("NE PROLAZI");
      toast.error("Names need to have at least 2 letters !");
    } else {
      console.log("PROLAZI");
      const data = {
        firstName: firstName,
        lastName: lastName,
      };
      axios
        .post("http://localhost:5000/api/Users", data)
        .then(() => {
          setShowModal(false);
        })
        .catch((e) => toast.error(e));
    }
  };
  return (
    <>
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <form ref={formRef} onSubmit={handleSubmit}>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
