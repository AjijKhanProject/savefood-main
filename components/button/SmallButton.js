import React from 'react';
import { TouchableOpacity,Text } from 'react-native';

const SmallButton = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onPress()} style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: props.color,
            margin: 1,
            marginHorizontal: 5,
            width: 100,
            height: 25,
            borderRadius: 20
        }}>
            <Text style={{
                fontSize: 14,
                color: 'white'
            }}>{props.name}</Text>
        </TouchableOpacity>
    )
}
export default SmallButton