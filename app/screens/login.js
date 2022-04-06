import React, {useEffect, useState} from 'react';
import {StyleSheet, Button, View, Text, Image, TextInput} from 'react-native';

import {useDispatch} from 'react-redux';
import {setToken} from '../redux/actions.js';

import {mocklogin} from '../api/mock.js';

const Login = ({navigation}) => {
  const dispatch = useDispatch();

  // Local States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clearLocalStates = () => {
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  const login = async () => {
    let res = await mocklogin(email, password);

    if (res.status == 200 && res.authToken) {
      dispatch(setToken(res.authToken));
      navigation.navigate('Account');
      clearLocalStates();
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  useEffect(() => {
    clearLocalStates();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} />
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
        placeholder="email"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
        placeholder="password"
      />
      <View style={styles.button}>
        <Button title="Login" color="#2a5182" onPress={login} />
      </View>
      {errorMessage ? (
        <Text style={{color: 'red'}}>{errorMessage}</Text>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
  },
  button: {
    height: 40,
    width: 300,
    margin: 10,
  },
});

export default Login;
