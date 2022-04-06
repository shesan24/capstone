import React, { useEffect, Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Navbar from "../components/common/navbar.js";
// import Error from '../components/common/error.js';
import Balance from "../components/account/balance.js";
import Active from "../components/account/active.js";
import Recent from "../components/account/recent.js";

import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../redux/actions";
import { setToken } from "../redux/actions";

import { mockUserData } from "../api/mock.js";

const Account = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData, token } = useSelector((state) => state.userReducer);

  console.log("account called");

  const fetchData = async () => {
    let res = await mockUserData(token);
    if (res.status == 200 && res.userData) {
      dispatch(setUserData(res.userData));
    } else {
      console.log("error while getting user account");
      dispatch(setToken(null));
      navigation.navigate("Login");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        let res = await mockUserData(token);
        if (res.status == 200 && res.userData) {
          dispatch(setUserData(res.userData));
        } else {
          console.log("error while getting user account");
          dispatch(setToken(null));
          navigation.navigate("Login");
        }
      };
      fetchData();
    }, [token])
  );

  return (
    <View style={styles.container}>
      {userData ? (
        <Fragment>
          <Navbar navigation={navigation} />
          <Balance />
          <Active navigation={navigation} />
          <Recent navigation={navigation} />
        </Fragment>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    margin: 5,
  },
  button: {
    height: 40,
    width: 300,
    margin: 10,
  },
});

export default Account;
