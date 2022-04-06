import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Menu, IconButton } from "react-native-paper";

import { useDispatch } from "react-redux";
import { setToken, setUserData } from "../../redux/actions";

const Navbar = ({ navigation }) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const logout = () => {
    dispatch(setToken(null));
    dispatch(setUserData(null));
    closeMenu();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        resizeMode="stretch"
        source={require("../../assets/logo.png")}
      />
      <Text></Text>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon="account"
            color="#2a5182"
            size={30}
            onPress={openMenu}
          />
        }
      >
        <Menu.Item onPress={logout} title="Logout" />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    height: 40,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
  },
  imageStyle: {
    height: 40,
    width: 110,
  },
});

export default Navbar;
