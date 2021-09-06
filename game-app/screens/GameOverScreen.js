import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, Image } from 'react-native';
import Card from '../components/Card';
import COLORS from '../constants/colors';

const GameOverScreen = (props) => {
  const [isPortrait, setIsPortrait] = useState(true);

  const onPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  }

  const statePortrait = () => setIsPortrait(onPortrait());

  useEffect(() => {
    Dimensions.addEventListener('change', statePortrait);
    statePortrait();

    return () => {
      Dimensions.removeEventListener('change', statePortrait);
    }
  }, []);

  return (
    <View style={isPortrait ? styles.screen : styles.screenld}>
      <Image
        style={isPortrait ? styles.image : styles.imageld}
        source={require("../assets/images/game_over.jpg")}
        resizeMode="contain"
      />
      <Card style={styles.resultContainer}>
        <Text>Attempts: {props.rounds}</Text>
        <Text>Your number was: {props.choice}</Text>
        <View style={{ margin: 10 }}>
          <Button title="start a new game" onPress={props.onRestart} color={COLORS.primary} />
        </View>
      </Card>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenld: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  resultContainer: {
    marginBottom: 30,
    padding: 20,
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    fontSize: 15
  },
  image: {
    width: '80%',
    height: 300,
  },
  imageld: {
    width: '50%',
    height: 300,
  }
});

export default GameOverScreen;