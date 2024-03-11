import { Box, Button, Grid } from "@mui/material";
import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import Modal from "../../components/modal";
import useHttpRequest from "../../hooks/useHttpRequest";
import Loader from "../../components/loader";
import { API_URL } from "../../utils/vars";
import { useNavigate } from "react-router-dom";

const userData = {
  firstName: "User",
  balance: 5000,
};

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [amountInput, setAmountInput] = useState(0);
  const [users, setUsers] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [userData, setUserData] = useState({
    firstName: "--",
    lastName: "--",
  });
  const { loading, sendRequestWithToken } = useHttpRequest(transformData);
  const { loading: balanceLoading, sendRequestWithToken: getBalance } =
    useHttpRequest(transformDataBalance);
  const { loading: transferLoading, sendRequestWithToken: transferAmount } =
    useHttpRequest(transformDataAmount);

  const navigate = useNavigate();

  function transformDataAmount(data) {
    setModalOpen(false);
    setAmountInput(0);
    setSelectedUser(null);
  }

  function transformData(data) {
    setUsers(data.data);
  }

  function transformDataBalance(data) {
    setBalanceAmount(data.data.balance);
  }

  const handleSelectedUserId = (user) => {
    setModalOpen(true);
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  function handleSearchValue(e) {
    setSearchVal(e.target.value);
  }

  function handleGetBalance() {
    const httpRequest = {
      method: "GET",
      url: `${API_URL}account`,
    };

    getBalance(httpRequest, false);
  }

  function handleTransfer() {
    const httpRequest = {
      method: "POST",
      url: `${API_URL}account/transfer`,
      data: {
        to: selectedUser._id,
        amount: amountInput,
      },
    };

    transferAmount(httpRequest);
  }

  function handleAmountInput(e) {
    setAmountInput(e.target.value);
  }

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  }

  useEffect(() => {
    const userDataFromStorage = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!userDataFromStorage || !token) {
      navigate("/");
    } else {
      setUserData(userDataFromStorage);
      handleGetBalance();
    }
  }, []);

  useEffect(() => {
    const httpOptions = {
      method: "GET",
      url: `${API_URL}user/bulk?filter=${searchVal}`,
    };

    sendRequestWithToken(httpOptions, false);
  }, [searchVal]);

  return (
    <>
      {(loading || balanceLoading || transferLoading) && <Loader />}
      <Box className={styles.headerBox}>
        <Grid container>
          <Grid item xs={6}>
            <h2>PayNew App</h2>
          </Grid>
          <Grid item xs={6} className={styles.userInfo}>
            <p>Hello, {userData.firstName || "--"}</p>
            <Box className={styles.imgBox} onClick={handleLogout}></Box>
          </Grid>
        </Grid>
      </Box>
      <Box className={styles.balanceBox}>
        <h2>Your Balance: {balanceAmount.toFixed(2)}</h2>
      </Box>
      <Box className={styles.usersSection}>
        <Box className={styles.searchInput}>
          <input
            placeholder="Search Name"
            type="text"
            onChange={handleSearchValue}
          />
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
            <input
              className={styles.amountInput}
              type="text"
              placeholder="Enter Amount"
              onChange={handleAmountInput}
            />
          </Box>
          <Button
            variant="contained"
            className={styles.sendBtn}
            onClick={handleTransfer}
          >
            Send Money
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Dashboard;
