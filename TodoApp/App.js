
import React from 'react';
import Route from './src';
import { Root } from 'native-base';
import { MenuProvider } from 'react-native-popup-menu';




class App extends React.Component {
  render() {
    return (
      <MenuProvider>
        <Root>
          <Route />
        </Root>
      </MenuProvider>
    )
  }
}



export default App;
