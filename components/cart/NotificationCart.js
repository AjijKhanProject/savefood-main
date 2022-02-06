import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Avatar } from 'react-native-paper'
import SmallButton from './../button/SmallButton'
import DropShadow from 'react-native-drop-shadow'
import model from './../Styles/model';

const NotificationCart = (props) => {
    const [Admin, setAdmin] = React.useState(false);
    const data=props.data
    const [Time, setTime]= React.useState(null);
    const [Date, setDate]= React.useState(null);

    React.useEffect(() => {
        if (props.data) {
            const date = props.data.NewDate.toDate();
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            if (date.getHours() > 12) {
                const time = date.getHours() - 12 + ':' + date.getMinutes() + ' PM'
                setTime(time)
            } else {
                const time = date.getHours() + ':' + date.getMinutes() + ' AM'
                setTime(time)
            }

            setDate(date.getDay() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear())

        }
    },[])
    return (
        <DropShadow style={model.shadow}>
            <View style={model.cartView}>
                <Avatar.Image style={{
                    margin: 5,
                }} size={60} source={{ uri: data? data.User.Photo:'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'}} />
                <View style={{
                    flex: 3,
                    justifyContent: 'center',
                    padding: 5
                }}>
                    <Text style={{ fontWeight: 'bold' }}>{data? data.User.Name:'.'}</Text>
                    <Text>{props.data.Message}</Text>
                    {
                    Admin ? (
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <SmallButton name='Accept' color='green' onPress={() => Alert.alert('ok')} />
                            <SmallButton name='Reject' color='red' onPress={() => Alert.alert('ok')} />
                        </View>
                    ):(
                        <View></View>
                    )
                }
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text>{Time}</Text>
                    <Text>{Date}</Text>
                </View>
                
            </View>
        </DropShadow>
    );
};

export default NotificationCart;