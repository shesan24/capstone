import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {useSelector} from 'react-redux';

const Balance = () => {
  const {
    userData: {user},
  } = useSelector(state => state.userReducer);
  return (
    <View style={styles.container}>
      <Text>Total Balance</Text>
      <Text style={styles.balance}>{user.balanceAmount.toString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 30,
    marginBottom: 5,
    padding: 10,
    borderColor: '#2a5182',
    borderWidth: 2,
  },
  balance: {
    fontSize: 25,
    paddingTop: 10,
    color: 'black',
  },
});

export default Balance;
