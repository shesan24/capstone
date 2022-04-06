import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Divider } from "react-native-paper";

import { useSelector } from "react-redux";

const Recent = ({ navigation }) => {
  const {
    userData: { allTransactions },
  } = useSelector((state) => state.userReducer);

  return (
    <View>
      <Text style={styles.title}>Transaction History</Text>
      {allTransactions.length != 0 ? (
        <View style={styles.container}>
          {allTransactions.map((transaction, index) => {
            return (
              <View key={index} style={{ marginBottom: 5 }}>
                <Text style={styles.balance}>
                  {transaction.transactionAmount}
                </Text>
                <Text>
                  {transaction.transactionState} on{" "}
                  <Text style={{ color: "black", fontSize: 15 }}>
                    {prettyDate(transaction.date)}
                  </Text>
                </Text>
                <Divider />
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.container}>
          <Text>No Transaction History</Text>
        </View>
      )}
    </View>
  );
};

const prettyDate = (dateString) => {
  let date = dateString.split(".")[0];
  return date;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginVertical: 5,
    marginHorizontal: 30,
    padding: 10,
    borderColor: "black",
    color: "black",
    borderWidth: 1,
    borderColor: "#2a5182",
    borderWidth: 2,
  },
  balance: {
    fontSize: 25,
    color: "black",
    paddingVertical: 5,
  },
  title: {
    marginHorizontal: 35,
    marginTop: 10,
    marginBottom: 5,
  },
});

export default Recent;
