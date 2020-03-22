import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';


import './App.css';

import HomePage from './pages/homepage/homepage.component';
import CollectionPreviewPage from './pages/collections/collectionspreviewpage.component';
import CollectionFullViewPage from './pages/collections/collectionsfullviewpage.component';
import Header  from './components/header/header.component';
import SignUpSignInPage from './pages/sign-up-sign-in/sign-up-sign-in.component';
import {auth} from './firebase/firebase.utils';



class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  componentDidMount() {

    // This methond in the auth object allows us to set a callback
    // function once the user has logged in or logged out of the site.
    // Here, the "user" object is made available by the auth object, 
    // and we set our currentUser to it, even if it's null.
    auth.onAuthStateChanged(
      user =>  {this.setState({currentUser: user})}
    );
  }

  render () {
    return (
      
      <div>
        <ScrollToTop/>
        <Header/>
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={true} path="/signin" component={SignUpSignInPage} />
          <Route exact={true} path="/shop/" component={CollectionPreviewPage} />
          <Route exact={true} path='/shop/hats'  render={(props) => <CollectionFullViewPage {...props} collectionName='hats' />}/>
          <Route exact={true} path='/shop/sneakers'  render={(props) => <CollectionFullViewPage {...props} collectionName='sneakers' />}/>
          <Route exact={true} path='/shop/jackets'  render={(props) => <CollectionFullViewPage {...props} collectionName='jackets' />}/>
          <Route exact={true} path='/shop/womens'  render={(props) => <CollectionFullViewPage {...props} collectionName='womens' />}/>
          <Route exact={true} path='/shop/mens'  render={(props) => <CollectionFullViewPage {...props} collectionName='mens' />}/>
        </Switch>
      </div>
      );
  }

}

export default App;
