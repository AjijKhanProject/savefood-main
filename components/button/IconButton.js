import React from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const IconButton = (props) => {
    return (
        <TouchableOpacity disabled={props.disabled?props.disabled:false} onPress={props.onPress} style={[
            {
            backgroundColor:props.disabled?'rgb(88, 86, 86)':'#DC7633',
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