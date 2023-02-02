import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Configs from './pages/Configuracao';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/configs" component={ Configs } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ ranking } />

    </Switch>
  );
}
