import React, { useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import { StyleSheet, Button, View, Text, TextInput } from "react-native";

import Navbar from "../components/common/navbar.js";

import { useSelector, useDispatch } from "react-redux";

import { mockCreateTransaction } from "../api/mock.js";
import { updateActiveTransaction } from "../redux/actions";

const Create = ({ navigation }) => {
  const dispatch = useDispatch();

  const { userData, token } = useSelector((state) => state.userReducer);
  let userId = userData.user.userId;
  let balanceAmount = userData.user.balanceAmount;

  const [balance, setBalance] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onBack = () => {
    setErrorMessage("");
    navigation.navigate("Account");
  };

  const create = async () => {
    setErrorMessage("");
    if (isNaN(balance) || balance == "") {
      setErrorMessage("Invalid Entry");
    } else {
      let val = parseFloat(balance).toFixed(2);

      if (val <= 0 || val >= 1000.0 || val > balanceAmount) {
        setErrorMessage("Invalid Amount");
        // console.log('got herre');
      } else {
        let res = await mockCreateTransaction(userId, balance);
        if (res.status == 200 && res.newTransaction) {
          navigation.navigate("Account");
          dispatch(updateActiveTransaction(res.newTransaction));
          console.log("dispatched");
          setErrorMessage("");
        } else {
          setErrorMessage("Could not be completed");
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);

          console.log("could not be dispatched");
        }
      }
    }
  };
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
          <Text style={styles.title}>Create Transaction</Text>
        </View>

        <View style={styles.container2}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setBalance(text)}
            value={balance}
            // secureTextEntry
            placeholder="amount"
          />
          <View style={styles.button}>
            <Button title="Create" color="#2a5182" onPress={create} />
          </View>

          {errorMessage ? (
            <Text style={{ color: "red" }}>{errorMessage}</Text>
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
    </View>
  );
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

export default Create;
