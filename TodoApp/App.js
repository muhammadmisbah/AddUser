
import React from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native'
import Route from './src';
import { Root } from 'native-base';
import { MenuProvider } from 'react-native-popup-menu';




class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {Platform.OS === "ios" ?
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <MenuProvider>
              <Root>
                <Route />
              </Root>
            </MenuProvider>
          </KeyboardAvoidingView>
          :
          <MenuProvider>
            <Root>
              <Route />
            </Root>
          </MenuProvider>
        }
      </SafeAreaView>
    )
  }
}



export default App;
