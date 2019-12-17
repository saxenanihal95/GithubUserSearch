/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';
import Header from './components/Header';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Search from './components/Search';

class App extends Component {
  constructor() {
    super();
    this.state = {searchString: '', loading: false};
  }

  getGitHubUser = async () => {
    this.setState({loading: true});
    const {searchString} = this.state;
    try {
      const userRes = await fetch(
        `https://api.github.com/users/${searchString}`,
      );
      const githubUser = await userRes.json();
      const repoRes = await fetch(
        `https://api.github.com/users/${searchString}/repos`,
      );
      const githubUserRepos = await repoRes.json();
      this.setState({githubUser, githubUserRepos});
    } catch (e) {
      this.setState({loading: false});
      console.log(e);
    }
  };
  render() {
    const {searchString} = this.state;
    return (
      <>
        <StatusBar backgroundColor="blue" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header title="Github User" />
            <Search
              setSearchValue={searchString => this.setState({searchString})}
              searchString={searchString}
              searchUser={this.getGitHubUser}
            />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});

export default App;
