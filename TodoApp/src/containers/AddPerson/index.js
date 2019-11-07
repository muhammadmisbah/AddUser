import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, Dimensions, Modal } from 'react-native'
import { Colors, Images } from '../../config';
import ImagePicker from 'react-native-image-crop-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import { Toast } from 'native-base';


const { height, width } = Dimensions.get("window");

class AddPerson extends Component {

    state = {
        name: '',
        side: '',
        back: '',
        top: '',
        img: '',
        size: '',
        modalVisible: false,
    }

    async saveInfo() {
        let newUser = []
        const id = new Date().getTime()
        const { name, side, back, top, img, size } = this.state
        if (name && side && back && top && img && size) {
            const user = await AsyncStorage.getItem("userData")
            if (user) {
                newUser = JSON.parse(user)
                newUser.push({ id, name, side, back, top, img, size })
            }
            else {
                newUser.push({ id, name, side, back, top, img, size })
            }
            try {
                if (newUser) {
                    await AsyncStorage.setItem('userData', JSON.stringify(newUser))
                        .then((user) => {
                            Toast.show({ text: "User Added", textStyle: { textAlign: "center", }, type: "success" })
                            this.setState({
                                name: '',
                                side: '',
                                back: '',
                                top: '',
                                img: '',
                                size: ''
                            })
                            const retrieveData = this.props.navigation.getParam("retrieveData")
                            if (retrieveData)
                                retrieveData()
                        })

                }


            } catch (error) {
                Toast.show({ text: error.toString(), textStyle: { textAlign: "center" }, type: "danger" })
            }
        }
        else {
            Toast.show({ text: "Fill All Fields", textStyle: { textAlign: "center" }, type: "danger" })
        }
    }

    _openPicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            this.setState({
                img: { uri: image.path },
                modalVisible: false
            })
        });
    }

    _openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            this.setState({
                img: { uri: image.path },
                modalVisible: false
            })
        })
            .catch(error => {
                console.log(error)
            })
    }



    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', }}>
                <ScrollView keyboardShouldPersistTaps="handled" style={{ width: '100%', }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: height - 25, }}>
                        <View style={{ justifyContent: 'space-around', height: 200, overflow: "hidden", }}>
                            <View style={{ height: 170, width: 170, borderWidth: 1, borderRadius: 100, }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ modalVisible: true })
                                    }}>
                                    <Modal
                                        visible={this.state.modalVisible}

                                        animationType={'fade'}
                                        transparent={true}
                                        onRequestClose={() => this.setState({ modalVisible: false })}
                                    >
                                        <View style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        }}>
                                            <View style={{
                                                width: '80%',
                                                height: 160,
                                                alignItems: 'center',
                                                backgroundColor: Colors.Gray,
                                                borderRadius: 15,
                                            }}>

                                                <TouchableOpacity style={{ width: "100%", height: '50%', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0.3, borderBottomColor: '#D3D3D3' }}
                                                    underlayColor={'#F5F5F5'} onPress={this._openCamera}>
                                                    <Text style={{ fontSize: 24, color: '#1E90FF' }}>Take a Picture</Text>
                                                </TouchableOpacity >
                                                <TouchableOpacity style={{ width: "100%", height: '50%', alignItems: 'center', justifyContent: 'center', }} underlayColor={'#F5F5F5'} onPress={this._openPicker}>
                                                    <Text style={{ fontSize: 24, color: '#1E90FF' }}>Choose From Library</Text>
                                                </TouchableOpacity>

                                            </View>
                                            <TouchableOpacity activeOpacity={20} onPress={() => { this.setState({ modalVisible: false }) }} style={{
                                                backgroundColor: Colors.Gray,
                                                width: '40%',
                                                height: 50,
                                                alignItems: 'center',
                                                borderRadius: 15,
                                                marginTop: 10,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Text style={{ fontSize: 20, color: '#DC143C' }}>Cancel</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </Modal>

                                    <Image source={(this.state.img) ? this.state.img : Images.DefaultImage} style={{ height: "100%", width: "100%", overflow: "hidden", borderRadius: 200 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 270, justifyContent: 'space-around', width: '85%', alignItems: 'center', }}>

                            <TextInput
                                style={{ height: 48, backgroundColor: Colors.Gray, borderRadius: 5, paddingLeft: 15, width: '100%', }}

                                onChangeText={name => this.setState({ name })}
                                value={this.state.name}
                                placeholder="Name"
                            />
                            <TextInput
                                style={{ height: 48, backgroundColor: Colors.Gray, borderRadius: 5, paddingLeft: 15, width: '100%' }}

                                onChangeText={side => this.setState({ side })}
                                value={this.state.side}
                                placeholder="Side"
                            />
                            <TextInput
                                style={{ height: 48, backgroundColor: Colors.Gray, borderRadius: 5, paddingLeft: 15, width: '100%' }}

                                onChangeText={back => this.setState({ back })}
                                value={this.state.back}
                                placeholder="Back"
                            />
                            <TextInput
                                style={{ height: 48, backgroundColor: Colors.Gray, borderRadius: 5, paddingLeft: 15, width: '100%' }}

                                onChangeText={top => this.setState({ top })}
                                value={this.state.top}
                                placeholder="Top"
                            />
                        </View>
                        <View style={{}}>
                            <View style={{ height: 150, justifyContent: 'space-around', alignItems: 'center', }}>
                                <View style={{ height: 60, flexDirection: 'row', width: '90%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ size: 'L' }) }} style={{ height: 40, width: 40, borderRadius: 20, borderWidth: 1, borderColor: Colors.Gray, alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ backgroundColor: (this.state.size == "L") ? 'black' : 'white', borderRadius: 15, height: 30, width: 30, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: (this.state.size == "L") ? 'white' : 'black' }}>L</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ size: 'M' }) }} style={{ height: 40, width: 40, borderRadius: 20, borderWidth: 1, borderColor: Colors.Gray, alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ backgroundColor: (this.state.size == "M") ? 'black' : 'white', borderRadius: 15, height: 30, width: 30, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: (this.state.size == "M") ? 'white' : 'black' }}>M</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => { this.setState({ size: 'S' }) }} style={{ height: 40, width: 40, borderRadius: 20, borderWidth: 1, borderColor: Colors.Gray, alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ backgroundColor: (this.state.size == "S") ? 'black' : 'white', borderRadius: 15, height: 30, width: 30, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: (this.state.size == "S") ? 'white' : 'black' }}>S</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={{ height: 40, width: 150, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.Gray, borderRadius: 20 }} activeOpacity={0.5} onPress={this.saveInfo.bind(this)}>
                                    <Text style={{}}>
                                        Add
                            </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View >
        )


    }
}
export default AddPerson;