import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is over</TitleText>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          // source={require("../assets/success.png")}
          source={{ uri: "https://i.ytimg.com/vi/z0pPhTLvzu4/hqdefault.jpg" }}
          resizeMode="cover"
        />
      </View>
      <BodyText>Number of rounds {props.roundsNumber}</BodyText>
      <BodyText>Number was {props.userNumber} </BodyText>
      <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 200,
    borderWidth: 3,
    overflow: "hidden",
    marginVertical: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default GameOverScreen;
