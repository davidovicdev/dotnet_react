import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function DeleteUserModal({ showModal, setShowModal, user }) {
  return (
    <>
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <form>
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            Are you sure you want to delete {user} ? You will delete all his
            posts too
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setShowModal(false)}>
              No
            </Button>
            <Button variant="contained" color="success" type="submit">
              Yes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
