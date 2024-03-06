import { Box, Button, Grid } from "@mui/material";
import styles from "./Dashboard.module.css";
import { useState } from "react";
import Modal from "../../components/modal";

const userData = {
  firstName: "User",
  balance: 5000,
};

const users = [
  {
    id: 1,
    firstName: "User",
    lastName: "1",
  },
  {
    id: 2,
    firstName: "User",
    lastName: "2",
  },
];

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectedUserId = (user) => {
    setModalOpen(true);
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Box className={styles.headerBox}>
        <Grid container>
          <Grid item xs={6}>
            <h2>PayNew App</h2>
          </Grid>
          <Grid item xs={6} className={styles.userInfo}>
            <p>Hello, {userData.firstName}</p>
            <Box className={styles.imgBox}></Box>
          </Grid>
        </Grid>
      </Box>
      <Box className={styles.balanceBox}>
        <h2>Your Balance: {userData.balance}</h2>
      </Box>
      <Box className={styles.usersSection}>
        <Box className={styles.searchInput}>
          <input placeholder="Search Name" type="text" />
        </Box>
        {users.map((user, i) => {
          return (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              className={styles.userRow}
              key={user.id}
            >
              <Box display="flex" alignItems="center">
                <Box className={styles.imgBox}></Box>
                <p
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  {user.firstName} {user.lastName}
                </p>
              </Box>
              <Button
                variant="contained"
                onClick={() => handleSelectedUserId(user)}
              >
                Send Money
              </Button>
            </Box>
          );
        })}
      </Box>
      <Modal open={modalOpen} handleClose={handleCloseModal}>
        <Box>
          <h1 className="text-center">Send Money</h1>
          <Box display="flex" alignItems="center">
            {selectedUser && (
              <>
                <Box className={styles.imgBox}></Box>
                <p
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  {selectedUser.firstName} {selectedUser.lastName}
                </p>
              </>
            )}
          </Box>
          <Box className={styles.inputBox}>
            <input className={styles.amountInput} type="text" placeholder="Enter Amount" />
          </Box>
          <Button variant="contained" className={styles.sendBtn}>Send Money</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Dashboard;
