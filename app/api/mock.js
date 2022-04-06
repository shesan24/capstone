import axios from "axios";

const ip = "";

const mockSuccess = (value) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), 0);
  });
};

const mockFailure = (value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(value), 2000);
  });
};

const uri = `http://${ip}:5000`;

export const mocklogin = async (username, password, shouldSucceed = true) => {
  if (!shouldSucceed) {
    return mockFailure({ authToken: null, status: 500 });
  }

  try {
    const res = await axios.get(`${uri}/api/login/${username}/${password}`);
    console.log(res);
    return mockSuccess({ authToken: res.data, status: 200 });
  } catch (err) {
    return mockSuccess({ authToken: "", status: 500 });
  }
};

export const mockUserData = async (authToken) => {
  if (!authToken) {
    return mockFailure({ status: 500 });
  }

  try {
    const res1 = await axios.get(`${uri}/api/getUser/${authToken}`);
    let user = res1.data;

    const res2 = await axios.get(`${uri}/api/getAllTransactions/${authToken}`);
    let allTransactions = res2.data;
    allTransactions = allTransactions.filter(
      (transaction) => transaction.transactionState !== "Initialized"
    );

    // let activeTransaction = null;

    const res3 = await axios.get(
      `${uri}/api/getActiveTransactions/${authToken}`
    );

    let activeTransaction = res3.data;
    if (!activeTransaction) {
      activeTransaction = null;
    } else {
      activeTransaction = activeTransaction[0];
    }

    return mockSuccess({
      userData: {
        user: user,
        activeTransaction: activeTransaction,
        allTransactions: allTransactions,
      },
      status: 200,
    });
  } catch (err) {
    return mockSuccess({ authToken: "", status: 500 });
  }
};

export const mockUpdateTransaction = async (
  userId,
  transactionId,
  transactionAmount,
  transactionState
) => {
  if (!userId || !transactionId || !transactionAmount || !transactionState) {
    return mockFailure({ newTransaction: null, status: 500 });
  }
  transactionAmount = parseInt(transactionAmount);
  console.log(userId, transactionId, transactionAmount, transactionState);
  try {
    const res = await axios.put(`${uri}/api/editTransaction`, {
      userId: userId,
      transactionId: transactionId,
      transactionAmount: transactionAmount,
      transactionState: transactionState,
    });

    if (res.data) {
      return mockSuccess({ newTransaction: res.data, status: 200 });
    }
    return mockSuccess({ newTransaction: null, status: 500 });
  } catch (err) {
    return mockSuccess({ newTransaction: null, status: 500 });
  }
};

export const mockCancelTransaction = async (userId, transactionId) => {
  if (!userId || !transactionId) {
    return mockFailure({ newTransaction: null, status: 500 });
  }

  try {
    const res = await axios.delete(`${uri}/api/deleteTransaction`, {
      data: {
        userId: userId,
        transactionId: transactionId,
      },
    });

    if (res.data) {
      return mockSuccess({ status: 200 });
    }
    return mockSuccess({ status: 500 });
  } catch (err) {
    return mockSuccess({ newTransaction: null, status: 500 });
  }
};

export const mockCreateTransaction = async (userId, transactionAmount) => {
  if (!userId || !transactionAmount) {
    return mockFailure({ newTransaction: null, status: 500 });
  }
  transactionAmount = parseInt(transactionAmount);
  try {
    const res = await axios.post(`${uri}/api/createTransaction`, {
      userId: userId,
      transactionAmount: transactionAmount,
    });

    if (res.data) {
      return mockSuccess({ newTransaction: res.data, status: 200 });
    }
    return mockSuccess({ newTransaction: null, status: 500 });
  } catch (err) {
    return mockSuccess({ newTransaction: null, status: 500 });
  }
};
