import React, { useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import QRCode from "react-qr-code";
import { StyleSheet, Button, View, Text, Image, TextInput } from "react-native";

import Navbar from "../components/common/navbar.js";

import { useSelector, useDispatch } from "react-redux";

import { mockUpdateTransaction, mockCancelTransaction } from "../api/mock.js";
import { updateActiveTransaction } from "../redux/actions";

const Detail = ({ navigation }) => {
  const dispatch = useDispatch();
  const [currentState, setCurrentState] = useState("default");

  const { userData, token } = useSelector((state) => state.userReducer);

  // console.log(userData.user);

  let userId = userData.user.userId;
  let balanceAmount = userData.user.balanceAmount;
  let date = userData.activeTransaction.date;
  let transactionId = userData.activeTransaction.transactionId;
  let transactionState = userData.activeTransaction.transactionState;
  let transactionAmount = userData.activeTransaction.transactionAmount;

  // console.log(userId, date);

  const [balance, setBalance] = useState(transactionAmount.toString());
  const [errorMessage, setErrorMessage] = useState("");

  const onBack = () => {
    navigation.navigate("Account");
  };

  const cancel = async () => {
    setErrorMessage("");
    let res = await mockCancelTransaction(userId, transactionId);
    if (res.status == 200) {
      navigation.navigate("Account");
      dispatch(updateActiveTransaction(null));
    } else {
      setErrorMessage("Could not be completed");
      setTimeout(() => {
        setErrorMessage(""), setCurrentState("default");
      }, 2000);
    }
  };

  const update = async () => {
    // console.log(balanceAmount);
    setErrorMessage("");
    if (isNaN(balance) || balance == "") {
      setErrorMessage("Invalid Entry");
    } else {
      let val = parseFloat(balance).toFixed(2);

      if (val <= 0 || val >= 1000.0 || val > balanceAmount) {
        setErrorMessage("Invalid Amount");
        // console.log('got herre');
      } else {
        let res = await mockUpdateTransaction(
          userId,
          transactionId,
          val,
          transactionState
        );
        // console.log(res);
        if (res.status == 200 && res.newTransaction) {
          dispatch(updateActiveTransaction(res.newTransaction));
          // console.log('dispatched');
          // setBalance(transactionAmount.toString());
          setCurrentState("default");
          setErrorMessage("");
        } else {
          setErrorMessage("Could Not Be Completed");
          setTimeout(() => {
            setErrorMessage(""), setCurrentState("default");
          }, 2000);

          console.log("could not be dispatched");
        }
      }
    }
  };

  // const clearLocalStates = () => {
  //   setCurrentState('default');
  //   setBalance(activeTransaction.transactionAmount);
  //   setErrorMessage('');
  // };

  return (
    <View style={styles.outercontainer}>
      <Navbar navigation={navigation} />
      <View>
        <View style={styles.header}>
          <IconButton
            icon="chevron-left-circle"
            color="#2a5182"
            size={30}
            onPress={onBack}
          />
          <Text style={styles.title}>Active Transaction</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.balance}>
            ${transactionAmount.toFixed(2).toString()}
          </Text>
          <Text style={{ color: "#f3bc88" }}>
            created on{" "}
            <Text style={{ color: "black", fontSize: 15 }}>
              {prettyDate(date)}
            </Text>
          </Text>
        </View>
        <View style={styles.button}>
          <View style={{ width: "40%", marginHorizontal: 10 }}>
            <Button
              title="edit"
              color="#71ae66"
              onPress={() => setCurrentState("edit")}
            />
          </View>
          <View style={{ width: "40%", marginHorizontal: 10 }}>
            <Button title="cancel" color="#f3bc88" onPress={cancel} />
          </View>
        </View>
        {currentState == "edit" ? (
          <View style={styles.container2}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setBalance(text)}
              value={balance}
              // secureTextEntry
              // placeholder="password"
            />
            <View style={styles.button}>
              <Button title="Update" color="#2a5182" onPress={update} />
            </View>
          </View>
        ) : null}

        <View style={styles.container2}>
          {errorMessage ? (
            <Text style={{ color: "red" }}>{errorMessage}</Text>
          ) : (
            <Text></Text>
          )}
        </View>

        {currentState == "default" ? (
          <View style={styles.code}>
            <Text style={{ marginTop: 5, marginBottom: 20 }}>
              {" "}
              Scan at ATM{" "}
            </Text>
            <QRCode value={transactionId} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

const prettyDate = (dateString) => {
  let date = dateString.split(".")[0];
  return date;
};

const styles = StyleSheet.create({
  outercontainer: {
    flex: 1,
    backgroundColor: "white",
  },
  outerinput: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    margin: 5,
  },
  outerbutton: {
    height: 40,
    width: 300,
    margin: 10,
  },
  container: {
    backgroundColor: "white",
    marginVertical: 5,
    marginHorizontal: 30,
    padding: 10,
    color: "black",
    borderColor: "#2a5182",
    borderWidth: 2,
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    color: "#2a5182",
  },
  header: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  balance: {
    fontSize: 25,
    color: "black",
    paddingBottom: 5,
  },
  button: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 30,
  },
  code: {
    marginTop: 10,
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    margin: 5,
  },
});

export default Detail;
