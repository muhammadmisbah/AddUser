import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Image } from 'react-native'
import { Colors } from '../../config';
import ImagePicker from 'react-native-image-crop-picker';




class PersonDetail extends Component {

    state = {

    }

    render() {
        const { navigation } = this.props
        const item = this.props.navigation.getParam('item')
        const { height } = Dimensions.get("window")
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <ScrollView style={{ width: '100%', height: height - 25, }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: height - 25 }}>

                        <View style={{ justifyContent: 'space-around', height: 200, overflow: "hidden", }}>
                            <View style={{ height: 170, width: 170, borderWidth: 1, borderRadius: 170 }}>
                                {/* <TouchableOpacity onPress={() => {
                                ImagePicker.openPicker({
                                    width: 300,
                                    height: 400,
                                    cropping: true
                                }).then(image => {
                                    AsyncStorage.getItem("userData").then(JSON.parse)
                                        .then(
                                            async data => {
                                                var newData = data.map((newItem) =>
                                                    (newItem.id == item.id) ? { ...newItem, img: { uri: image.path } } : newItem)
                                                await AsyncStorage.setItem("userData", JSON.stringify(newData))
                                            }
                                        )
                                    this.setState({
                                        img: { uri: image.path }
                                    })
                                });
                            }
                            }> */}
                                <Image source={(this.state.img) ? this.state.img : item.img} style={{ height: "100%", width: "100%", overflow: "hidden", borderRadius: 200 }} />
                                {/* </TouchableOpacity> */}
                            </View>
                        </View>
                        <View style={{ height: 80, justifyContent: 'space-between', width: '70%', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 25 }}>Name</Text><Text style={{ fontSize: 25 }}>{item.name}</Text>
                        </View>
                        <View style={{ height: 80, justifyContent: 'space-between', width: '70%', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 25 }}>Side</Text><Text style={{ fontSize: 25 }}>{item.side}</Text>
                        </View>
                        <View style={{ height: 80, justifyContent: 'space-between', width: '70%', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 25 }}>Back</Text><Text style={{ fontSize: 25 }}>{item.back}</Text>
                        </View>
                        <View style={{ height: 80, justifyContent: 'space-between', width: '70%', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 25 }}>Top</Text><Text style={{ fontSize: 25 }}>{item.top}</Text>
                        </View>
                        <View style={{ height: 80, justifyContent: 'space-between', width: '70%', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 25 }}>Size</Text><Text style={{ fontSize: 25 }}>{item.size}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default PersonDetail;