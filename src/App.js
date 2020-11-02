import React, { Component } from 'react';
import { navigate, Router } from '@reach/router';
import firebase from './Firebase';

import 'bootstrap/dist/css/bootstrap.css';

import Home from './Home';
// import Welcome from './Welcome';
import Navigation from './Navigation';
// import Navigation2 from './Navigation2';
import Login from './Login';
import WineList from './WineList';
import Favorites from './Favorites';
import Register from './Registration';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userName: null,
      displayName: null,
      userID: null,
      howMuchWine: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((FBUser) => {
      if (FBUser) {
        this.setState({
          userName: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid,
        });
        const wineRef = firebase.database().ref('wine/');
        wineRef.on('value', (snapshot) => {
          let wines = snapshot.val();
          let wineList = [];

          for (let wine in wines) {
            wineList.push({
              wineID: wine,
              wineColor: wines[wine].color,
              wineCountry: wines[wine].country,
              wineProducer: wines[wine].producer,
              wineVarietal: wines[wine].varietal,
              wineVintage: wines[wine].vintage,
            });
          }
          this.setState({
            wineList: wineList,
            howMuchWine: wineList.length,
          });
        });
      } else {
        this.setState({ userName: null });
      }
    });
  }

  registerUser = (userName) => {
    firebase.auth().onAuthStateChanged((FBUser) => {
      FBUser.updateProfile({
        displayName: userName,
      }).then(() => {
        this.setState({
          userName: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid,
        });
        navigate('/winelist');
      });
    });
  };

  logOutUser = (e) => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      userName: null,
    });
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate('/login');
      });
  };

  addWine = (wineInfo) => {
    console.log(wineInfo);
    const ref = firebase.database().ref(`wine/`);
    ref.push(wineInfo);
  };

  render() {
    // console.log(this.state.howMuchWine);
    return (
      <div>
        <Navigation
          userName={this.state.userName}
          logOutUser={this.logOutUser}
          wineCount={this.state.howMuchWine}
        />
        {/* <SearchWine filterWine={this.state.wineList} /> */}
        {/* {this.state.userName && (
          <Welcome
            userName={this.state.displayName}
            logOutUser={this.logOutUser}
          />
        )} */}
        <Router>
          <Home path="/" userName={this.state.userName} />
          <Login path="/login" />
          <WineList
            path="/winelist"
            wines={this.state.wineList}
            addWine={this.addWine}
            userID={this.state.userID}
            filterWine={this.state.wineList}
            userName={this.state.userName}
          />
          <Favorites path="/favorites" />
          <Register path="/register" registerUser={this.registerUser} />
        </Router>
      </div>
    );
  }
}

export default App;
