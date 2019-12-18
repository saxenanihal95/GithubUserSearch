import React, {Component} from 'react';
import {View, Image, Text, Dimensions, FlatList} from 'react-native';

function GithubRepo(props) {
  return (
    <View style={{}}>
      <Text>{props.name}</Text>
    </View>
  );
}

export default class GithubUser extends Component {
  render() {
    const {user: {avatar_url = '', name = ''} = {}, repos} = this.props;
    const {width} = Dimensions.get('window');
    // console.log(this.props.user, repos);
    return (
      <View>
        <Image
          source={{uri: avatar_url}}
          style={{width, height: 300}}
          resizeMode={'cover'}
        />
        <Text>{name}</Text>
        <FlatList
          data={repos}
          keyExtractor={item => item.id}
          renderItem={({item}) => <GithubRepo {...item} />}
        />
      </View>
    );
  }
}
