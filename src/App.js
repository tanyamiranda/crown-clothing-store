import React from 'react';
import './App.css';

import {Switch, Route} from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

import ShopPage from './pages/shop/shop.component';


function App() {

  const HatsPage = () => (
    <div>
      <h1>Hats Page</h1>
    </div>
  )

  return (
    <div>
      
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={true} path="/shop/" component={ShopPage} />
        <Route exact={true} path="/shop/hats" component={HatsPage} />
      </Switch>
      



    </div>
  );
}

export default App;
