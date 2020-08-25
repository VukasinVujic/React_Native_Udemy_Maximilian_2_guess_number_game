import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";
import TitleText from "../components/TitleText";

const StartGameScreen = (props) => {
  const [enterValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  // here useEffect will run on every rerender
  //we use this so we would have only one event listener
  // every time useEffect runs it add and later on remove evenet listern, so that way we always have
  //only one
  useEffect(() => {
    // every time user rotate the phone this methods trigers and get new width
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };
    Dimensions.addEventListener("change", updateLayout);
    //with return, you clean up, like componenWillUnmount does
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const numberInputHandler = (inputTex) => {
    setEnteredValue(inputTex.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHanlder = () => {
    const chosenNumber = parseInt(enterValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number",
        "Number has to be a number between 1 and 99.",
        [{ text: "OK", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(parseInt(enterValue));
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <TitleText>You selected</TitleText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton
          onPress={() => {
            props.onStarGame(selectedNumber);
          }}
        >
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    // TouchableWithoutFeedback for iOS only
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <Text style={styles.title}>The Game Screen</Text>
            <Card style={styles.inputContainer}>
              <BodyText>Select a number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalization="non"
                autoCorrect={false}
                // number-pad for iOS only
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enterValue}
              />

              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color={Colors.accent}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHanlder}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  inputContainer: {
    width: "80%",
    // maxWidth: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },

  // button: {
  //   width: Dimensions.get("window").width / 4,
  // },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
