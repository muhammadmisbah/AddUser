import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native'
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




    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', }}>
                <ScrollView keyboardShouldPersistTaps="handled" style={{ width: '100%', }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '100%', alignItems: 'center', height: height - 25, }}>
                        <View style={{ justifyContent: 'space-around', height: 200, overflow: "hidden" }}>
                            <View style={{ height: 170, width: 170, borderWidth: 1, borderRadius: 170 }}>
                                <TouchableOpacity onPress={() => {
                                    ImagePicker.openPicker({
                                        width: 300,
                                        height: 400,
                                        cropping: true
                                    }).then(image => {
                                        this.setState({
                                            img: { uri: image.path }
                                        })
                                    });
                                }}>
                                    <Image source={(this.state.img) ? this.state.img : Images.DefaultImage} style={{ height: "100%", width: "100%", overflow: "hidden", borderRadius: 200 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 300, justifyContent: 'space-around', width: '85%', alignItems: 'center', }}>

                            <TextInput
                                style={{ height: 50, backgroundColor: Colors.Gray, borderRadius: 5, paddingLeft: 15, width: '100%' }}

                                onChangeText={name => this.setState({ name })}
                                value={this.state.name}
                                placeholder="Name"
                            />
                            <TextInput
                                style={{ height: 50, backgroundColor: Colors.Gray, borderRadius: 5, paddingLeft: 15, width: '100%' }}

                                onChangeText={side => this.setState({ side })}
                                value={this.state.side}
                                placeholder="Side"
                            />
                            <TextInput
                                style={{ height: 50, backgroundColor: Colors.Gray, borderRadius: 5, paddingLeft: 15, width: '100%' }}

                                onChangeText={back => this.setState({ back })}
                                value={this.state.back}
                                placeholder="Back"
                            />
                            <TextInput
                                style={{ height: 50, backgroundColor: Colors.Gray, borderRadius: 5, paddingLeft: 15, width: '100%' }}

                                onChangeText={top => this.setState({ top })}
                                value={this.state.top}
                                placeholder="Top"
                            />
                        </View>
                        <View style={{ height: 60, flexDirection: 'row', width: '70%', justifyContent: 'space-around', alignItems: 'center' }}>
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
                        <View style={{ height: 40, width: 150, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.Gray, borderRadius: 20 }}>
                            <TouchableOpacity activeOpacity={0.5} onPress={this.saveInfo.bind(this)}>
                                <Text>
                                    Add
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View >
        )


    }
}
export default AddPerson;