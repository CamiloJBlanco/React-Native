import React, { useState } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function Tasks({data, handleModal}) {

    const [state, setState] = useState({
        backgroundColor: 'white',
        pressed: false,
    });

    const pressHandler = () => {
        if (!state.pressed) {
            setState({ pressed: true, backgroundColor: '#cc5f5f' });
        } else {
            setState({ pressed: false, backgroundColor: 'white' });
        }
    }

    return (
        <TouchableOpacity onPress={() => pressHandler(data.item.id)}>
            <View style={[styles.item, styles.shadow, { backgroundColor: state.backgroundColor }]}>
                <Text>{data.item.value}</Text>
                <Button
                    style={styles.button}
                    title="X"
                    color="#bf2f2f"
                    onPress={() => handleModal(data.item.id)}
                />
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});