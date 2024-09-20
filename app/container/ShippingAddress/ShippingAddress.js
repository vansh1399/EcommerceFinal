import { View, Text, TouchableOpacity, ScrollView, StatusBar, StyleSheet, FlatList, Animated } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, moderateScale } from '../../Metrics';
// import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from 'react-redux';
import { addshippingByget, deleteShipping, shippingAddByget } from '../../redux/slice/ShippingAddress.Slice';
import RadioGroup, { RadioButton } from 'react-native-radio-buttons-group';

const useaddresses = [
    {
        id: 1,
        name: 'Jane Doe',
        Addresses: '3 Newbridge Court',
        area: 'Chino Hills, CA 91709,',
        state: 'United States',

    },
    {
        id: 2,
        name: 'Jane Doe',
        Addresses: '3 Newbridge Court',
        area: 'Chino Hills, CA 91709,',
        state: 'United States',
    },
    {
        id: 3,
        name: 'Jane Doe',
        Addresses: '3 Newbridge Court',
        area: 'Chino Hills, CA 91709,',
        state: 'United States',
    },
];

export default function ShippingAddresses({ route, navigation }) {
    // const progress = useRef(new Animated.Value(0.5)).current; //useSharedValue(0)
    // const scale = useRef(new Animated.Value(1)).current;
    const [selectedId, setSelectedId] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        // Animated.loop(
        //     Animated.parallel([
        //         Animated.sequence([
        //             Animated.spring(progress,{toValue:1,useNativeDriver:true}),
        //             Animated.spring(progress,{toValue:0.5,useNativeDriver:true}),
        //         ]),
        //         Animated.sequence([
        //             Animated.spring(scale,{toValue:2,useNativeDriver:true}),
        //             Animated.spring(scale,{toValue:1,useNativeDriver:true}),
        //         ]),
        //     ]),
        //     {iterations:3}
        // ).start();

        // dispatch(shippingAddByget());
        dispatch(addshippingByget('ankit'));
    }, [])
    const addshipingDATA = useSelector(state => state.Shippingaddress);
    // console.log('adshipdatatatataoo', addshipingDATA?.shippingAddress[0]?.address);

    const addData = addshipingDATA?.shippingAddress?.[0]?.address
    console.log('addatata', addData);

    const handleDelete = (data) => {
        console.log('data1', data);
        dispatch(deleteShipping(data))
    }

    const handleEdit = (data) => {
        console.log('dAta', data);
        navigation.navigate("Addshipping Adress", data);

    }
    const radioButtons = useMemo(() => {
        if (addData) {
            const rData = addData?.map((v, i) => {
                return {
                    id: i,
                    label: (
                        <View style={styles.olldeta}>
                            <Text style={styles.addtext1}>{v.Full_name}</Text>
                            <Text style={styles.addtext}>{v.Adrress}</Text>
                            <Text style={styles.addtext}>{v.City}</Text>
                            <Text style={styles.addtext}>{v.Region}</Text>
                            <Text style={styles.addtext}>{v.Zip_Code}</Text>
                            <Text style={styles.addtext}>{v.Country}</Text>

                            <TouchableOpacity style={styles.UseShipping}>
                                <View>

                                    {/* <RadioGroup
                                    radioButtons={radioButtons}
                                    onPress={setSelectedId}
                                    selectedId={selectedId}
                                /> */}
                                </View>
                                {/* <BouncyCheckbox
                                size={25}
                                fillColor="black"
                                unFillColor="#FFFFFF"
                                text={v.name}
                                iconStyle={{ borderColor: "red" }}
                                innerIconStyle={{ borderWidth: 2 }}
                            /> */}
                                <Text style={styles.checkicontext}>Use as the shipping address</Text>
                            </TouchableOpacity>
                            <View style={styles.ViewEdit}>
                                <TouchableOpacity onPress={() => handleEdit(v)}><Text style={styles.ViewEdittextt}>Edit</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(v)}><Text style={styles.ViewEdittext}>Delete</Text></TouchableOpacity>
                            </View>
                        </View>
                    ),
                    value: v.uid
                }

            })
            return rData;
        }
        return [];

    }, [addData]);



    // `
    //                   Full name : ${v.Full_name} ,
    //                    Address : ${v.Adrress} , 
    //                    City : ${v.City} ,
    //                     Country : ${v.Country} ,
    //                     State : ${v.Region} , 
    //                     Zip code : ${v.Zip_Code}`

    // const ShippingAddresses = ({ v }) => (

    // );

    return (
        <ScrollView style={styles.container}>
            <StatusBar animated={true} backgroundColor={'transparent'} />
            {/* 
            <View style={styles.Ordertext}>
                <TouchableOpacity><FontAwesome name="angle-left" size={35} color="black" /></TouchableOpacity>
                <View style={styles.viewshipping}>
                    <Text style={styles.Ordertext2}>Shipping Addresses</Text>
                </View>
            </View> */}

            {/* <FlatList
                data={addData}
                renderItem={({ item }) => <ShippingAddresses v={item} />}
                keyExtractor={item => item.id}
            /> */}
            <RadioGroup
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
                labelStyle={styles.lableStyle}
            />
            <View>

            </View>

            <View style={styles.btnView}>
                <TouchableOpacity style={styles.btnplaceorder} onPress={() => navigation.navigate("success")}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontFamily: 'Metropolis-Medium' }}>Place Order</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{backgroundColor:'black',borderRadius:50}}>
                    <Animated.View style={[styles.square,
                    {
                        borderRadius: progress.interpolate({
                            inputRange: [0.5, 1],
                            outputRange: [SIZE / 4, SIZE / 2],
                        }),
                        opacity: progress,
                        transform: [
                            { scale },
                            {
                                rotate: progress.interpolate(
                                    {
                                        inputRange: [0.5, 20],
                                        outputRange: ['360deg', '180deg'],
                                    }
                                ),
                            },
                        ],
                    },
                    ]}
                    ><Text style={styles.done}>Place Order</Text></Animated.View>

                </TouchableOpacity> */}
                <TouchableOpacity style={styles.addButton} onPress={() => { navigation.navigate("Addshipping Adress") }}>
                    <MaterialCommunityIcons name="plus-circle" size={35} color="black" />
                </TouchableOpacity>
            </View>
            <View>

            </View>


        </ScrollView>
    );
}

// const SIZE = 100.0;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: horizontalScale(19),
        paddingTop: horizontalScale(13),
    },
    // square: {
    //     width: 135.0,
    //     height: 50.0,
    //     // backgroundColor: 'rgba(0,0,256,0.5)',
    //     backgroundColor:'#000000'
    // },

    // done: {
    //     color: 'white',
    //     fontFamily: 'Metropolis-Medium',
    //     fontSize: 17,
    //     textAlign: 'center',
    //     marginTop: 14,
    // },
    Ordertext: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: horizontalScale(10),
    },
    Ordertext2: {
        color: 'black',
        fontFamily: 'Metropolis-Bold',
        fontSize: moderateScale(18),
        paddingTop: horizontalScale(8),
    },
    viewshipping: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    olldeta: {
        width: '95%',
        padding: 15,
        // height: 135,
        marginTop: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: horizontalScale(5),
        marginLeft: 5,
        elevation: 2,
        position: 'relative'
    },
    addtext: {
        color: 'black',
        paddingBottom: 4,
    },
    addtext1: {
        color: 'black',
        paddingBottom: 4,
        fontSize: 16
    },
    UseShipping: {
        flexDirection: 'row',
        columnGap: 9,
        paddingTop: 15
    },
    checkicontext: {
        color: 'black',
        paddingTop: 4,
    },
    ViewEdit: {
        flexDirection: 'row',
        position: 'absolute',
        // padding: 10,
        marginTop: 11,
        right: 10,
    },
    ViewEdittext: {
        width: 64,
        height: 30,
        padding: 10,
        borderRadius: 5,
        // backgroundColor: 'black',
        textAlign: 'center',
        color: 'red',
        paddingTop: 4,
    },
    ViewEdittextt: {
        width: 64,
        height: 30,
        padding: 10,
        textAlign: 'center',
        borderRadius: 5,
        color: '#059862',
        paddingTop: 4,
    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        // columnGap:120,
        columnGap: 0,
        marginLeft: 60
    },
    btnplaceorder: {
        width: "45%",
        height: 40,
        backgroundColor: '#DB3022',
        borderRadius: 5,
        justifyContent: 'center',
        marginRight: 140
    },
    flyingContainer: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    icon: {
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    likesCount: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    lableStyle: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#000000',
        lineHeight: 20,
        fontFamily: 'Metropolis-Medium',
        fontSize: 13,
        // paddingRight:70,
        // padding:5,
        color: 'white'
    },

});