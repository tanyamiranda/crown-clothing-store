import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
import {createStructuredSelector} from 'reselect';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {connect} from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import CollectionPreviewPage from './pages/collections/collectionspreviewpage.component';
import CollectionFullViewPage from './pages/collections/collectionsfullviewpage.component';
import Header  from './components/header/header.component';
import SignUpSignInPage from './pages/sign-up-sign-in/sign-up-sign-in.component';
import AccountInfoPage from './pages/account-info/account-info-page.component'
import CheckOutPage from './pages/checkout/checkout.component';

import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors'

class App extends React.Component {


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

    const {setCurrentUser} = this.props;

    // onAuthStateChanged returns the associated logout function call 
    // so lets assign it to our function placeholder above
    this.unsubscribeFromAuth = auth.onAuthStateChanged(

      //needs to be async because making a few async calls
      async userAuth => {

        //console.log("userAuth=",userAuth);

        // Did the user login? if so, check for profile in firebase
        if (userAuth) {
          const userRef = createUserProfileDocument(userAuth);

          //set currentUser profile to user
          (await userRef).onSnapshot(snapShot => {
            
            //console.log("setting current user...");

            setCurrentUser({
                id: snapShot.id,
                ...snapShot.data()
            })

          });       
      
        }
        else {
          setCurrentUser(null);
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
        <Header/>
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={true} path="/shop/" component={CollectionPreviewPage} />
          <Route exact={true} path="/checkout/" component={CheckOutPage} />
          <Route exact={true} path='/shop/hats'  render={(props) => <CollectionFullViewPage {...props} collectionName='hats' />}/>
          <Route exact={true} path='/shop/sneakers'  render={(props) => <CollectionFullViewPage {...props} collectionName='sneakers' />}/>
          <Route exact={true} path='/shop/jackets'  render={(props) => <CollectionFullViewPage {...props} collectionName='jackets' />}/>
          <Route exact={true} path='/shop/womens'  render={(props) => <CollectionFullViewPage {...props} collectionName='womens' />}/>
          <Route exact={true} path='/shop/mens'  render={(props) => <CollectionFullViewPage {...props} collectionName='mens' />}/>

          {
          // If user is on SignUpSignInPage and is logged in, redirect to AccountInfoPage
          }
          <Route exact={true} path="/signin" render = 
            {() => 
              this.props.currentUser ? (
              <Redirect to="/account" />
              ) : (
              <SignUpSignInPage />)
            } 
          />

          {
          // If user is on AccountInfoPage page and has logged out, redirect to SignUpSignInPage
          }
          <Route exact={true} path="/account" render = 
            {() => 
              !this.props.currentUser ? (
              <Redirect to="/signin" />
              ) : (
              <AccountInfoPage />)
            } 
          />

        </Switch>
        </ScrollToTop>
      </div>
      );
  }

}

// This adds the currenUser object to be accessible by the app
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

// This maps the setCurrentUser() reducer call to be used in the app.
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
 
export default connect(mapStateToProps,mapDispatchToProps)(App);
