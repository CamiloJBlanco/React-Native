import React, { useState } from 'react';
import {View, Text, Button, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Platform, Keyboard, StyleSheet} from 'react-native'; import Card from '../components/Card';
import Input from '../components/Input';
import COLORS from '../constants/colors';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = (props) => {

  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('');


  const handlerInputValue = (text) => {
    setEnteredValue(text.replace(/[^0-9]/g, ''));
  }

  const handlerResetInput = () => {
    setEnteredValue("");
    setConfirmed(false);
  }

  const handlerConfirmInput = () => {
    const chosenNumber = parseInt(enteredValue);
    if (chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99) return;

    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
  }

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card>
        <Text style={{
          fontSize: 15,
          fontWeight: 'bold'
        }}>Chosen number</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title="Start playing" onPress={() => props.onStartGame(selectedNumber)} color={COLORS.primary} />
      </Card>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      keyboardVerticalOffset={30}
      style={styles.container}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
          <View style={styles.screen}>
            <Text style={styles.title}>Start playing!</Text>
            <Card style={styles.inputContainer}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold'
              }}>Choose a number</Text>
              <Text style={{
                fontSize: 14
              }}>(from 1 to 99)</Text>
              <Input
                bluronSubmit
                autoCapitalization="none"
                autoCorrect={false}
                keyboardType="numeric"
                maxLength={2}
                value={enteredValue}
                onChangeText={handlerInputValue}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button title="Delete" onPress={handlerResetInput} color={COLORS.accent} />
                </View>
                <View style={styles.button}>
                  <Button title="Confirm" onPress={handlerConfirmInput} color={COLORS.primary} />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback >
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'roboto-bold',
  },
  inputContainer: {
    width: '80%',
    maxWidth: '95%',
    minWidth: 300,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    width: '45%',
  }
});

export default StartGameScreen;