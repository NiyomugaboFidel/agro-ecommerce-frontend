import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Select, MenuItem, CircularProgress, Snackbar, Alert } from '@mui/material';
import { updateUserActive, updateUserRole } from '../../../../services/auth/users';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid green',
  borderRadius: '12px',
  boxShadow: 24,
  p: 2,
};

const UserEditModal = ({ open, handleClose, user, fetchUsers }) => {
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.isActive);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [loadingRole, setLoadingRole] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Snackbar close handler
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleRoleChange = async () => {
    setLoadingRole(true);
    try {
      const res=await updateUserRole(user._id, role);
      await fetchUsers();
      setSnackbar({ open: true, message: res.message, severity: 'success' });
      handleClose();
    } catch (error) {
      console.error("Failed to update user role", error);
      setSnackbar({ open: true, message: 'Failed to update role', severity: 'error' });
    } finally {
      setLoadingRole(false);
    }
  };

  const handleStatusChange = async () => {
    setLoadingStatus(true);
    try {
      const updatedStatus = !status;
      await updateUserActive(user._id, updatedStatus);
      setStatus(updatedStatus);
      await fetchUsers();
      setSnackbar({ open: true, message: 'Status updated successfully!', severity: 'success' });
      handleClose();
    } catch (error) {
      console.error("Failed to update user status", error);
      setSnackbar({ open: true, message: 'Failed to update status', severity: 'error' });
    } finally {
      setLoadingStatus(false);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        className='text-sm font-outfit text-slate-600'
      >
        <Box sx={style} className="bg-slate-500">
          <Typography className='text-center underline underline-offset-auto' sx={{ mb: 2 }}>
            Edit User Role & Status
          </Typography>
          <Typography>
            <strong>Name:</strong> {user.firstname} {user.lastname}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <strong>Email:</strong> {user.email}
          </Typography>

          {/* Role Selection */}
          <Typography sx={{ mt: 2 }}>Role:</Typography>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            disabled={loadingRole} // Disable when updating the role
          >
            <MenuItem value="superAdmin">Super Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>

          <Typography sx={{ mt: 2 }}>Update Status:</Typography>
          <div className="flex items-center justify-start mt-2 gap-2">
            <Button
              variant={status ? "contained" : "outlined"}
              color={status ? "success" : "error"}
              onClick={handleStatusChange}
              disabled={loadingStatus} // Disable when updating the status
            >
              {loadingStatus ? <CircularProgress size={24} /> : (status ? "Active" : "Inactive")}
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleRoleChange}
              disabled={loadingRole} // Disable when updating the role
            >
              {loadingRole ? <CircularProgress size={24} /> : "Update Role"}
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserEditModal;
