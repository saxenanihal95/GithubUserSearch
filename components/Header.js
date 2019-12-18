import React, {Component} from 'react';

import {View, Text} from 'react-native';

export default class Header extends Component {
  render() {
    const {title = ''} = this.props;
    return (
      <View
        style={{
          height: 50,
          backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 18}}>{title}</Text>
      </View>
    );
  }
}
