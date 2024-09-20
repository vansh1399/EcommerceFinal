import { View, StyleSheet, TouchableOpacity, Text, FlatList, TextInput, PermissionsAndroid } from 'react-native'
import React, { useRef, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../redux/slice/auth.Slice';
import { useFormik } from 'formik';
import { object, string } from 'yup';

const items = [('')];

export default function Profile_Edit() {

    const refRBSheet = useRef([]);
    const [Image, setImage] = useState('');
    // const refVBSheet = useRef([]);

    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    // console.log('auth1', auth);

    let imageSchema = object({
        name: string().matches(/^[a-zA-Z ]{2,30}$/).required('please enter valid name'),
        email: string().matches( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required('please enter email name'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
        },
        validationSchema: imageSchema,
        onSubmit: values => {
            console.log('valuesvalues', values);
            dispatch(uploadImage({ ...values, path: Image.path, uid: auth.auth.uid }))
        },
    });

    const { handleChange, handleBlur, handleSubmit, values, errors, touched } = formik


    const handleCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log('camera', image.path);
            setImage(image.path)
        });
    }

    const handleGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log('gallery', image.path);

        });
    }

    const renderItem = ({ item, index, refRBSheet }) => {
        return (
            <View>
                <RBSheet ref={ref => (refRBSheet.current[index] = ref)}>
                    <View style={styles.bottomSheetContainer}>
                        <View style={styles.bottommini}>

                            <View style={styles.bottomcover}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                                        <TouchableOpacity onPress={() => refRBSheet.current[0]?.close()}><Fontisto name="close-a" size={15} color="#A9AEB1" /></TouchableOpacity>
                                    </View>
                                    <View style={{ marginLeft: 80 }}>
                                        <Text style={styles.bottomSheetText}>Profile photo</Text>
                                    </View>
                                </View>

                                <View style={styles.bottomiconhead}>
                                    <View>
                                        <TouchableOpacity style={styles.imagecircle2} onPress={() => handleCamera()}>
                                            <Feather name="camera" size={24} color="#DB3022" />
                                            <View style={{ marginTop: 10 }}><Text>Camera</Text></View>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={styles.imagecircle2} onPress={() => handleGallery()}>
                                            <MaterialCommunityIcons name="image-outline" size={24} color="#DB3022" />
                                            <View style={{ marginTop: 10 }}><Text>Gallery</Text></View>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={styles.imagecircle2}>
                                            <Fontisto name="smiling" size={24} color="#DB3022" />
                                            <View style={{ marginTop: 10 }}><Text>Avatar</Text></View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </RBSheet>
            </View>
            //  {item + 1}
        );
    };

    // const ErenderItem = ({ item, index, refVBSheet }) => {
    //     return (
    //         <View>
    //             <RBSheet ref={ref => (refVBSheet.current[index] = ref)}>
    //                 <View style={styles.bottomSheetContainer}>
    //                     <View style={styles.bottommini}>
    //                         <View>
    //                             <Text style={{ color: 'black' }}>Enter Your name</Text>
    //                             <View style={{ flexDirection: 'row', marginTop: 30, }}>
    //                                 <View style={styles.inputStyle}>
    //                                     <TextInput>
    //                                     </TextInput>
    //                                 </View>
    //                                 <View style={{ marginLeft: 15, marginTop: 8 }}>
    //                                     <TouchableOpacity><Fontisto name="smiling" size={24} color="gray" /></TouchableOpacity>
    //                                 </View>
    //                             </View>

    //                             <View style={{ flexDirection: 'row', marginLeft: 190, marginTop: 30 }}>
    //                                 <TouchableOpacity style={{ marginRight: 30 }}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
    //                                 <TouchableOpacity><Text style={styles.cancelText}>Save</Text></TouchableOpacity>
    //                             </View>

    //                         </View>
    //                     </View>
    //                 </View>
    //             </RBSheet>
    //         </View>
    //         // {/* //  {item + 1} */}
    //     );
    // };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={styles.profileView}>

                <TouchableOpacity style={styles.profilecircle} onPress={() => refRBSheet.current[0]?.open()}>
                    <FontAwesome name="user" size={100} color="#A9AEB1" />
                </TouchableOpacity>

                <View style={styles.cameracircle}>
                    <TouchableOpacity onPress={() => refRBSheet.current[0]?.open()}>
                        <Feather name="camera" size={23} color="white" />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.ProfilebodyHead}>

                <TouchableOpacity>
                    <View style={styles.Profilebody}>

                        <View style={{ width: '10%', justifyContent: 'center' }}>
                            <TouchableOpacity>
                                <FontAwesome name="user" size={23} color="gray" />
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '85%' }}>
                            <TextInput
                                value={auth.auth?.name}
                                placeholder='name'
                                onChangeText={formik.handleChange('name')}
                                onBlur={formik.handleBlur('name')}
                            >
                            </TextInput>
                            {errors.name && touched.name ? <Text style={{color:'red',marginRight:100}}>{errors.name}</Text>:null}
                        </View>
                      
                        {/* <View style={{ width: '10%' }}>
                            <TouchableOpacity onPress={() => refVBSheet.current[0]?.open()}>
                                {/* <MaterialIcons name="edit" size={23} color="#DB3022" /> */}
                        {/* </TouchableOpacity>
                        </View> */}

                    </View>
                </TouchableOpacity>
                <View style={{ width: '90%', borderWidth: 0.1, marginLeft: 48, backgroundColor: 'gray' }}></View>

                <TouchableOpacity>
                    <View style={styles.Profilebody}>

                        <View style={{ width: '10%', justifyContent: 'center' }}>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name="gmail" size={26} color="gray" />
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '85%' }}>
                            <TextInput
                                value={auth.auth?.email}
                                placeholder='Email'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                            >
                            </TextInput>
                            {errors.email && touched.email ? <Text style={{color:'red'}}>{errors.email}</Text>:null}
                        </View>

                        {/* <View style={{ width: '10%' }}><TouchableOpacity><MaterialIcons name="edit" size={23} color="#DB3022" /></TouchableOpacity></View> */}

                    </View>
                </TouchableOpacity>
                <View style={{ width: '90%', borderWidth: 0.1, marginLeft: 48, backgroundColor: 'gray' }}></View>
                <View style={{ width: '90%', borderWidth: 0.1, marginLeft: 48, backgroundColor: 'gray' }}></View>

                <TouchableOpacity>
                    <View style={styles.Profilebody}>

                        <View style={{ width: '10%', justifyContent: 'center' }}>
                            <TouchableOpacity>
                                <MaterialIcons name="phone" size={23} color="gray" />
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: '85%' }}>
                            <TextInput
                                value={auth.auth?.phone}
                                placeholder='Phone'
                            >
                            </TextInput>
                        </View>

                        {/* <View style={{ width: '10%' }}><TouchableOpacity><MaterialIcons name="edit" size={23} color="#DB3022" /></TouchableOpacity></View> */}

                    </View>
                </TouchableOpacity>
                <View style={{ width: '90%', borderWidth: 0.1, marginLeft: 48, backgroundColor: 'gray' }}></View>
                <View style={{ width: '90%', borderWidth: 0.1, marginLeft: 48, backgroundColor: 'gray' }}></View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.Submit} onPress={handleSubmit}>
                        <Text style={styles.SubmitText}>Submit</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ flex: 1 }} >
                    <FlatList
                        data={items}
                        renderItem={(props) => renderItem({ ...props, refRBSheet })}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                {/* <View style={{ flex: 1 }} >
                    <FlatList
                        data={items}
                        renderItem={(props) => ErenderItem({ ...props, refVBSheet })}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View> */}

            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    profileView: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        position: 'relative',
    },
    profilecircle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 0,
        backgroundColor: '#DDDFE0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ProfilebodyHead: {
        flex: 0,
        marginTop: 20
        // justifyContent:'center',
        // alignItems:'center'
    },
    Profilebody: {
        width: '90%',
        flexDirection: 'row',
        margin: 15
    },
    cameracircle: {
        width: 49,
        height: 49,
        position: 'absolute',
        borderRadius: 50,
        top: 106,
        left: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DB3022',
        elevation: 4
    },
    imagecircle2: {
        width: 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Submit: {
        width: '50%',
        height: 50,
        backgroundColor: '#DB3022',
        borderRadius: 50,
        justifyContent: 'center',
        marginTop: 60
    },
    SubmitText: {
        textAlign: 'center',
        fontFamily: 'Metropolis-Medium',
        color: '#FFFFFF',
        fontSize: 18,
    },
    bottomiconhead: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 28,
        marginTop: 55,
    },
    bottomTextView: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 16
    },
    bottommini: {
        rowGap: 10,
        marginTop: 5,
    },
    bottomSheetContainer: {
        margin: 20
    },
    bottomSheetText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#000',
        marginTop: 5
    },
    bottomcover: {
        width: '100%',
        height: 200,
    },
    inputStyle: {
        width: '80%',
        height: 40,
        borderWidth: 0.8,
        borderRadius: 5,
    },
    cancelText: {
        color: '#DB3022'
    }
})