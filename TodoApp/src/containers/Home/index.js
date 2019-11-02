import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { Colors, Images } from '../../config';


class Home extends Component {

    state = {
        value: []
    }

    retrieveData = async () => {
        try {
            AsyncStorage.getItem('userData')
                .then((data) => {
                    if (data) {
                        const newData = JSON.parse(data)
                        this.setState({
                            value: newData
                        })
                    }
                })
        } catch (e) {
            alert('Failed to load data.')
        }
    }

    componentDidMount() {
        this.retrieveData()

        this.props.navigation.addListener('willFocus', () => {
            this.retrieveData()
        })
    }

    render() {
        const { value } = this.state
        const { navigation } = this.props
        return (
            <View style={{ flex: 1, }}>
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                    <TouchableOpacity style={{ margin: 20 }} onPress={() => { this.props.navigation.navigate("AddPerson") }}>
                        <Image source={Images.addUser} style={{ height: 40, width: 40 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <FlatList
                        style={{ flex: 1, width: '90%', paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ justifyContent: 'center' }}
                        ListFooterComponent={() => <View style={{ height: 20, width: '100%' }} />}
                        data={value}
                        renderItem={({ item }) => <View style={{
                            height: 80, marginTop: 20, width: '100%', borderBottomColor: Colors.Gray, borderBottomWidth: 1, justifyContent: 'center'

                        }}>

                            <TouchableOpacity onPress={() => { navigation.navigate("PersonDetail", { item }) }} style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                <Image source={item.img} style={{ height: 70, width: 70, borderRadius: 70 }} />
                                <Text style={{ fontSize: 23, color: 'black', textAlign: 'center', paddingLeft: 50 }}>{item.name}</Text>
                            </TouchableOpacity>
                        </View>}
                    />
                </View>
            </View >
        )


    }
}
export default Home;