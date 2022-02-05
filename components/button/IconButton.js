import React from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const IconButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[
            {
            backgroundColor:'#DC7633',
            minWidth:120,
            minHeight:40,
            borderRadius:20,
            margin:10,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal:15
        },
        props.style
        ]}>
            <Icon name={props.icon} size={25} color='#ffff'/>
            <Text style={{
                fontSize:16,
                fontWeight: '300',
                margin:5,
                color:'#FFF'
            }}>{props.label}</Text>
        </TouchableOpacity>
    );
};

export default IconButton;