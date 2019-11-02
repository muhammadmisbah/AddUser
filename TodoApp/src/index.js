//Navigations here
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';



import {
    Home,
    AddPerson,
    PersonDetail
} from './containers';




const AppNavigator = createStackNavigator(
    {
        Home: { screen: Home },
        AddPerson: { screen: AddPerson },

    },
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }

)

const RootStack = createAppContainer(createStackNavigator({

    Home: { screen: Home },
    AddPerson: { screen: AddPerson },
    PersonDetail: { screen: PersonDetail }

},
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    })
)


export default RootStack