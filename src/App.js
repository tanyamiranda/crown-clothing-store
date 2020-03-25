import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import CollectionPreviewPage from './pages/collections/collectionspreviewpage.component';
import CollectionFullViewPage from './pages/collections/collectionsfullviewpage.component';
import Header  from './components/header/header.component';
import SignUpSignInPage from './pages/sign-up-sign-in/sign-up-sign-in.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: null,
      redirectToHome: false
    }
  }

  /* 
    The auth.onAuthStateChanged() method does 2 things:
  
    1. It allows us to set a callback function
    once the user has logged in or logged out of the site.
    Here, the function makes the "user" object available 
    and we set our currentUser object to it.
  
    2. It returns the auth's unsubscribe function that we
    then assign to our own function placeholder so we can 
    call it back later when the component unmounts to log 
    out the user.

  */

  unsubscribeFromAuth = null;  //function placeholder for the signout call

  componentDidMount() {

    // onAuthStateChanged returns the associated logout function call 
    // so lets assign it to our function placeholder above
    this.unsubscribeFromAuth = auth.onAuthStateChanged(

      //needs to be async because making a few async calls
      async userAuth => {

        // Did the user login? if so, check for profile in firebase
        if (userAuth) {
          const userRef = createUserProfileDocument(userAuth);

          //set currentUser profile to user
          (await userRef).onSnapshot(snapShot => {
            this.setState(
              {
                redirectToHome: true,
                currentUser: {
                  id: snapShot.id,
                  ...snapShot.data()
                }
              }
              //, () => {console.log("componentDidMount() this.state=", this.state)}
            )
          });       

        }
        else {
          this.setState({currentUser: null, redirectToHome: false}
          //, () => {console.log("componentDidMount() this.state=", this.state)}
          );
        }
        
      } 

    );
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render () {

    return (
      <div>
        <ScrollToTop>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={true} path="/signin" render={(props) => <SignUpSignInPage {...props} currentUser={this.state.currentUser} />}/>
          <Route exact={true} path="/shop/" component={CollectionPreviewPage} />
          <Route exact={true} path='/shop/hats'  render={(props) => <CollectionFullViewPage {...props} collectionName='hats' />}/>
          <Route exact={true} path='/shop/sneakers'  render={(props) => <CollectionFullViewPage {...props} collectionName='sneakers' />}/>
          <Route exact={true} path='/shop/jackets'  render={(props) => <CollectionFullViewPage {...props} collectionName='jackets' />}/>
          <Route exact={true} path='/shop/womens'  render={(props) => <CollectionFullViewPage {...props} collectionName='womens' />}/>
          <Route exact={true} path='/shop/mens'  render={(props) => <CollectionFullViewPage {...props} collectionName='mens' />}/>
        </Switch>
        </ScrollToTop>
      </div>
      );
  }

}

export default App;
