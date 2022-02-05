import React from 'react';
import { View, Text, ScrollView } from 'react-native'
import Cart from './../cart/Cart'
import model from './../Styles/model';
import AnimatedLoader from 'react-native-animated-loader'

const UserHome = (props) => {
    const [data, setData] = React.useState([]);

    

    return (
        <ScrollView>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {
                    data ? (
                        data.length > 0 ? (
                            data.map(data=>(
                                <Cart key={data.Id} data={data} />
                            ))
                        ) : (
                            <Text style={{marginTop:100}}>No Data Available</Text>
                        )
                    ) : (
                        <AnimatedLoader
                            visible={true}
                            overlayColor="rgba(255, 255, 255, 0.459)"
                            source={require("./../Files/88967-food-delivery-service.json")}
                            animationStyle={model.loader}
                            speed={1}
                        >
                            <Text style={{ color: "black" }}>Loading...</Text>
                        </AnimatedLoader>
                    )
                }
            </View>
        </ScrollView>
    );
};

export default UserHome;