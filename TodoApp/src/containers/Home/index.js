import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, AsyncStorage, Image, TextInput } from 'react-native'
import { Colors, Images } from '../../config';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';


class Home extends Component {

    state = {
        value: [],
        search: Boolean,
        menuOption: 'Name',
        stateValue: [],
        val: '',
        editable: true,
        placeholder: 'Search By Name'
    }

    retrieveData = async () => {
        try {
            AsyncStorage.getItem('userData')
                .then((data) => {
                    if (data) {
                        const newData = JSON.parse(data)

                        this.setState({
                            value: newData,
                            stateValue: newData,
                            val: '',
                            menuOption: 'Name',
                            editable: true
                        })

                    }
                })
        } catch (e) {
            alert('Failed to load data.')
        }
    }

    componentDidMount() {
        this.retrieveData()
    }
    // componentWillMount() {
    //     this.props.navigation.addListener('willFocus', () => {
    //         this.retrieveData()
    //     })
    // }
    onChangeText = (val) => {
        const { value } = this.state;
        const stateValue = value.filter((item) => (item.name).slice(0, val.length).toLowerCase() == val.toLowerCase())
        this.setState({
            stateValue,
            val,
            search: Boolean(val)
        })
    }

    onSelect = (val, placeholder) => {
        const { value } = this.state;
        const stateValue = value.filter((item) => item.size == val)

        if (val == 'Search By Name') {
            this.setState({
                editable: true,
                stateValue: value,
                menuOption: val,
                placeholder: val
            })
        }
        else {
            this.setState({
                menuOption: val,
                stateValue,
                editable: false,
                val: '',
                placeholder: placeholder
            })
        }

    }


    // static getDerivedStateFromProps(props, state) {
    //     if (!state.value) {
    //         console.log("working")
    //         return ({ stateValue: state.value })
    //     }
    //     else
    //         return null
    // }

    render() {
        const { val, menuOption, stateValue, editable, placeholder } = this.state
        const { navigation } = this.props
        return (
            <View style={{ flex: 1, }}>

                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', height: 80, }}>
                    <View>
                        <Menu style={{ marginLeft: 20 }}>
                            <MenuTrigger >
                                <Image source={Images.pick} style={{ height: 40, width: 40 }} />
                            </MenuTrigger>
                            <MenuOptions optionsContainerStyle={{ width: 140 }}  >
                                <MenuOption onSelect={this.onSelect.bind(this, 'Search By Name')} text='Search By Name' style={{ backgroundColor: (menuOption == 'Name') ? Colors.Gray : null, width: '100%', alignItems: 'center' }} />
                                <MenuOption onSelect={this.onSelect.bind(this, 'L', "Searched By Size : Large (L)")} text='Large (L)' style={{ backgroundColor: (menuOption == 'L') ? Colors.Gray : null, width: '100%', alignItems: 'center' }} />
                                <MenuOption onSelect={this.onSelect.bind(this, 'M', "Searched By Size : Medium (M)")} text='Medium (M)' style={{ backgroundColor: (menuOption == 'M') ? Colors.Gray : null, width: '100%', alignItems: 'center' }} />
                                <MenuOption onSelect={this.onSelect.bind(this, 'S', "Searched By Size : Small (S)")} text='Short (S)' style={{ backgroundColor: (menuOption == 'S') ? Colors.Gray : null, width: '100%', alignItems: 'center' }} />
                            </MenuOptions>
                        </Menu>
                    </View>
                    <TextInput
                        editable={editable}
                        style={{ height: 40, backgroundColor: Colors.Gray, borderRadius: 20, paddingLeft: 15, width: '55%', }}
                        onChangeText={this.onChangeText}
                        value={val}
                        placeholder={placeholder}
                    />
                    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => { this.props.navigation.navigate("AddPerson", { retrieveData: this.retrieveData }) }}>
                        <Image source={Images.addUser} style={{ height: 40, width: 40 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <FlatList
                        style={{ flex: 1, width: '90%', paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ justifyContent: 'center' }}
                        ListFooterComponent={() => <View style={{ height: 20, width: '100%' }} />}
                        data={stateValue.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase())}
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