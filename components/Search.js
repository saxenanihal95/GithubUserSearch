import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Search extends Component {
  render() {
    const {
      searchString = '',
      setSearchValue = () => {},
      searchUser = () => {},
      onCancel = () => {},
    } = this.props;
    return (
      <View style={styles.containerStyle}>
        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="ios-search"
            size={20}
            color="#000"
          />
          <TextInput
            style={styles.input}
            value={searchString}
            placeholder="Enter user name"
            onChangeText={setSearchValue}
            underlineColorAndroid="transparent"
            onSubmitEditing={searchUser}
          />
        </View>
        {!!searchString && (
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cancelButton: {marginHorizontal: 10},
  cancelButtonText: {color: 'blue'},
  containerStyle: {
    backgroundColor: 'gray',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
  },
});
