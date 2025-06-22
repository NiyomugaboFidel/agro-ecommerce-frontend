import { Modal, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SuccessPopup = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    handleClose();
    navigate("/");
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="order-success-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          textAlign:"center",
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="order-success-modal" variant="h6" component="h2" sx={{
            color:"gray",
            fontWeight:"700"
        }}>
          Order Submitted Successfully!
        </Typography>
        <Typography sx={{ mt: 2,fontSize:"14px" }}>
          Your order has been submitted successfully. We will get back to you soon with a response.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={goToHomePage}
          sx={{ mt: 3, width: '100%',backgroundColor:"green" }}
        >
          Go to Home
        </Button>
      </Box>
    </Modal>
  );
};

export default SuccessPopup;
