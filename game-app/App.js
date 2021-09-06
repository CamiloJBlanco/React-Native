import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [loaded] = useFonts({
    'roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  if (!loaded) return <AppLoading />

  const handlerStartGame = selectedNumber => {
    setUserNumber(selectedNumber);
  }

  const handlerGameOver = rounds => {
    setGuessRounds(rounds);
  }

  const handlerRestart = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  let content = <StartGameScreen onStartGame={handlerStartGame} />
  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userOption={userNumber} onGameOver={handlerGameOver} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen rounds={guessRounds} choice={userNumber} onRestart={handlerRestart} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Guest the number" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});