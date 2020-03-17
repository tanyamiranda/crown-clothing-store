import React from 'react';
import './App.css';

import {Switch, Route} from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

import CollectionPreviewPage from './pages/collections/collectionspreviewpage.component.jsx';
import CollectionFullViewPage from './pages/collections/collectionsfullviewpage.component.jsx';

function App() {

  const HatsPage = () => (
    <div>
      <CollectionFullViewPage key={1}  collectionName={"hats"} />
    </div>
  )

  const SneakerPage = () => (
    <div>
      <CollectionFullViewPage key={1}  collectionName={"sneakers"} />
    </div>
  )

  const JacketsPage = () => (
    <div>
      <CollectionFullViewPage key={1}  collectionName={"jackets"} />
    </div>
  )

  const WomensPage = () => (
    <div>
      <CollectionFullViewPage key={1}  collectionName={"womens"} />
    </div>
  )

  const MensPage = () => (
    <div>
      <CollectionFullViewPage key={1}  collectionName={"mens"} />
    </div>
  )


  return (
    <div>
      
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={true} path="/shop/" component={CollectionPreviewPage} />
        <Route exact={true} path="/shop/hats" component={HatsPage} />
        <Route exact={true} path="/shop/sneakers" component={SneakerPage} />
        <Route exact={true} path="/shop/jackets" component={JacketsPage} />
        <Route exact={true} path="/shop/womens" component={WomensPage} />
        <Route exact={true} path="/shop/mens" component={MensPage} />
      </Switch>
      



    </div>
  );
}

export default App;
