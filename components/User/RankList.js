import React from 'react';
import {View,Text,ScrollView} from 'react-native'
import RankCart from '../cart/RankCart';
const RankList = () => {
    const [Users,setUsers]=React.useState([])
    
    return (
        <ScrollView>
            {
                Users? (
                    Users.length > 0 ? (
                        Users.map(user =>(
                        <RankCart key={user.Id} data={user}/>
                    ))
                    ):(
                        <Text style={{margin:10, textAlign: 'center' }}>Empty</Text>
                    )
                ):(
                    <Text style={{margin:10, textAlign: 'center' }}>Loading...</Text>
                )
            }
        </ScrollView>
    );
};

export default RankList;