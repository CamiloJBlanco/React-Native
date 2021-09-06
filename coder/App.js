import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import Tasks from './components/Tasks';

export default function App() {

  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState('');
  const [itemList, setItemList] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleChangeText = (text) => {
    setInputText(text);
    setInputError("");
  }

  const handleAddItem = () => {
    if (inputText) {
      setItemList([
        ...itemList,
        {
          id: Math.random().toString(),
          value: inputText,
        },
      ]);
      setInputText('');
      setInputError('');
    } else {
      setInputError('Required');
    }
  }

  const handleConfirmDelete = () => {
    const id = itemSelected.id;
    setItemList(itemList.filter(item => item.id !== id));
    setModalVisible(false);
    setItemSelected({});
  }

  const handleModal = (id) => {
    setItemSelected(itemList.find(item => item.id === id));
    setModalVisible(true);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add an item..."
          style={styles.input}
          onChangeText={handleChangeText}
          value={inputText}
        />
        <Button
          title="ADD"
          color="#3D9970"
          onPress={handleAddItem}
        />
      </View>
      <Text style={styles.inputError}>{inputError}</Text>
      <FlatList
        data={itemList}
        renderItem={(data) => <Tasks data={data} handleModal={handleModal} handleConfirmDelete={handleConfirmDelete} /> }
        keyExtractor={item => item.id}
      />
      <Modal animationType="slide" visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, styles.shadow]}>
            <Text style={styles.modalMessage}>Do you want to delete this Item?</Text>
            <Text style={styles.modalTitle}>{itemSelected.value}</Text>
            <View>
              <Button
                onPress={handleConfirmDelete}
                title="Accept"
              />
            </View>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 30,
    backgroundColor: '#f3f4e3',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 200,
    fontSize: 20,
    marginTop: 10,
  },
  inputError: {
    color: 'red',
  },
  items: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    padding: 30,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMessage: {
    fontSize: 15,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  }
});