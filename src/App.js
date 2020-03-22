import React from 'react';
import './App.css';

import {Switch, Route} from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

import CollectionPreviewPage from './pages/collections/collectionspreviewpage.component';
import CollectionFullViewPage from './pages/collections/collectionsfullviewpage.component';
import Header  from './components/header/header.component';
import SignUpSignInPage from './pages/sign-up-sign-in/sign-up-sign-in.component';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  render () {
    return (
      <div>
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
