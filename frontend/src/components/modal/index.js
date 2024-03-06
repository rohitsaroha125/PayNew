import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Modal as MuiModal } from "@mui/material";
import styles from "./Modal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Modal({ open, handleClose, children }) {
  return (
    <div>
      <MuiModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modalOuter}
      >
          <Box className={styles.modalBody}>{children}</Box>
      </MuiModal>
    </div>
  );
}
