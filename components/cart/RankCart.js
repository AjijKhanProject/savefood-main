import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-paper'
import DropShadow from 'react-native-drop-shadow';
import model from './../Styles/model'
const RankCart = (props) => {
    return (
        <DropShadow style={model.shadow}>
            <View style={[model.cartView, { alignItems: 'center' }]}>
                <Avatar.Image style={{
                    margin: 5,
                }} size={60} source={{ uri: props.data.Photo}} />
                <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    margin: 5,
                    flex: 3
                }}>{props.data.Name}</Text>
                <View style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 15,
                    width: 80,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                    flex: 1 
                }}>
                    <Text style={{
                        fontSize: 22,
                        margin: 1,
                        fontWeight: 'bold',
                    }}>{props.data.Point}</Text>
                    <Text style={{
                        margin: 1
                    }}>Points</Text>
                </View>
            </View>
        </DropShadow>
    );
};

export default RankCart;