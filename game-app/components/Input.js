import React from 'react';
import { TextInput , StyleSheet } from 'react-native';

const Input = (props) => {
    return (
        <TextInput
            {...props}
            style={{ ...styles.input, ...props.style }}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        width: 20,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        marginVertical: 10,
        marginBottom: 20,
    },
});

export default Input;