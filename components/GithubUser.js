import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';

function GithubRepo(props) {
  return (
    <View style={styles.githubRepoItemContainer}>
      <Text>{props.name}</Text>
    </View>
  );
}

export default class GithubUser extends Component {
  renderSeparator = () => <View style={styles.itemSeperator} />;
  render() {
    const {user: {avatar_url = '', name = ''} = {}, repos} = this.props;
    return (
      <ScrollView>
        <View style={styles.githubRepoUserViewContainer}>
          <Image
            source={{uri: avatar_url}}
            style={styles.githubAvatarStyle}
            resizeMode={'cover'}
          />
          <Text>{name}</Text>
        </View>
        <View style={styles.repositoryTextContainer}>
          <Text>Repositories</Text>
        </View>
        <FlatList
          data={repos}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => <GithubRepo {...item} />}
          ItemSeparatorComponent={this.renderSeparator}
          ListEmptyComponent={<Text>{`${name || 'user'} has no repos.`}</Text>}
        />
      </ScrollView>
    );
  }
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  itemSeperator: {
    backgroundColor: 'black',
    height: 0.5,
  },
  repositoryTextContainer: {
    height: 30,
    backgroundColor: 'gray',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  githubRepoItemContainer: {
    padding: 20,
  },
  githubRepoUserViewContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  githubAvatarStyle: {
    width: width / 2,
    height: 200,
  },
});
