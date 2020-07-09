import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/HomePage';
import FavPage from './components/FavPage';
import LoginPage from './components/LoginPage';

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/favs' component={FavPage} />
      <Route path='/login' component={LoginPage} />
    </Switch>
  );
}
