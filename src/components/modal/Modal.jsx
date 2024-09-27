import { Modal } from "@mui/material";

const CustomModal = ({ handleClose, children, open }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-6 rounded-md">
        {children}
      </div>
    </Modal>
  );
};

export default CustomModal;
