/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import Header from './components/Header';

import Search from './components/Search';
import GithubUser from './components/GithubUser';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchString: '',
      loading: false,
      userNotFound: false,
      githubUser: {},
      githubUserRepos: {},
    };
  }

  initState = () =>
    this.setState({
      searchString: '',
      loading: false,
      userNotFound: false,
      githubUser: {},
      githubUserRepos: {},
    });

  getGitHubUser = async () => {
    this.setState({loading: true, userNotFound: false, githubUser: {}});
    const {searchString} = this.state;
    if (!searchString) {
      return this.initState();
    }
    try {
      const userRes = await fetch(
        `https://api.github.com/users/${searchString}`,
      );
      const githubUser = await userRes.json();
      const repoRes = await fetch(
        `https://api.github.com/users/${searchString}/repos`,
      );
      const githubUserRepos = await repoRes.json();
      if (githubUser.message === 'Not Found') {
        this.setState({userNotFound: true});
      } else {
        this.setState({githubUser, githubUserRepos, loading: false});
      }
    } catch (e) {
      this.initState();
      console.log(e);
    }
  };

  render() {
    const {
      searchString,
      loading,
      userNotFound,
      githubUser,
      githubUserRepos,
    } = this.state;
    let render = null;

    if (loading) {
      render = (
        <View style={styles.fullHeightConainer}>
          <ActivityIndicator />
        </View>
      );
    }
    if (userNotFound) {
      render = (
        <View style={styles.fullHeightConainer}>
          <Text>User Not Founnd</Text>
        </View>
      );
    }

    if (Object.keys(githubUser).length) {
      render = <GithubUser user={githubUser} repos={githubUserRepos} />;
    }

    return (
      <>
        <StatusBar backgroundColor="blue" />
        <SafeAreaView style={styles.safeAreaView}>
          <Header title="Github User" />
          <Search
            setSearchValue={searchString => this.setState({searchString})}
            searchString={searchString}
            searchUser={this.getGitHubUser}
            onCancel={this.initState}
          />
          <View style={styles.githubUserViewContainer}>{render}</View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  githubUserViewContainer: {
    flex: 1,
  },
  fullHeightConainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
