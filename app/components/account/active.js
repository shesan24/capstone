import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

import {useSelector} from 'react-redux';

const Active = ({navigation}) => {
  const {
    userData: {activeTransaction},
  } = useSelector(state => state.userReducer);

  const viewDetails = () => {
    navigation.navigate('Detail');
  };

  const createNewTransaction = () => {
    navigation.navigate('Create');
  };

  return (
    <View>
      <Text style={styles.title}>Active Transaction</Text>
      {activeTransaction ? (
        <View style={styles.container}>
          <Text>Withdrawal Amount</Text>
          <Text style={styles.balance}>
            {activeTransaction.transactionAmount}
          </Text>
          <Text>
            created on{' '}
            <Text style={{color: 'black', fontSize: 15}}>
              {prettyDate(activeTransaction.date)}
            </Text>
          </Text>
          <View style={styles.button}>
            <Button
              title="details"
              color="#2a5182"
              onPress={viewDetails}></Button>
          </View>
        </View>
      ) : (
        <View style={{marginVertical: 5, marginHorizontal: 90}}>
          <View style={styles.button}>
            <Button
              title="Create A Transaction"
              color="#2a5182"
              onPress={createNewTransaction}></Button>
          </View>
        </View>
      )}
    </View>
  );
};

const prettyDate = dateString => {
  let date = dateString.split('.')[0];
  return date;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 30,
    padding: 10,
    borderColor: 'black',
    color: 'black',
    borderColor: '#2a5182',
    borderWidth: 2,
  },
  balance: {
    fontSize: 25,
    color: 'black',
    paddingTop: 5,
  },
  title: {
    marginHorizontal: 35,
    marginTop: 10,
    marginBottom: 5,
  },
  button: {
    height: 40,
    marginTop: 10,
  },
});

export default Active;
