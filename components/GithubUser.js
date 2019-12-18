import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';

function GithubRepo(props) {
  return (
    <View style={{padding: 20}}>
      <Text>{props.name}</Text>
    </View>
  );
}

export default class GithubUser extends Component {
  renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'black',
        height: 0.5,
      }}
    />
  );
  render() {
    const {user: {avatar_url = '', name = ''} = {}, repos} = this.props;
    const {width} = Dimensions.get('window');
    // console.log(this.props.user, repos);
    return (
      <ScrollView>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Image
            source={{uri: avatar_url}}
            style={{width: width / 2, height: 200}}
            resizeMode={'cover'}
          />
          <Text>{name}</Text>
        </View>
        <View
          style={{
            height: 30,
            backgroundColor: 'gray',
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}>
          <Text>Repositories</Text>
        </View>
        <FlatList
          data={repos}
          keyExtractor={item => item.id}
          renderItem={({item}) => <GithubRepo {...item} />}
          ItemSeparatorComponent={this.renderSeparator}
          ListEmptyComponent={<Text>{`${name} has no repos.`}</Text>}
        />
      </ScrollView>
    );
  }
}
