import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import Layout from '../layout';
import NotFound from './pages/NotFound';
import MoviePage from './pages/Movie';
import MovieDetailPage from './pages/MovieDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route
            exact
            path="/movies/:title"
            render={props => <MoviePage {...props} />}
          />
          <Route
            path="/movies/:title/:id"
            render={props => <MovieDetailPage {...props} />}
          />
          <Route path="/profile" render={props => <ProfilePage {...props} />} />
          <Route path="/not-found" render={props => <NotFound {...props} />} />
          <Route exact path="/" render={props => <HomePage {...props} />} />
          <Redirect exact from="/movies" to="/home" />
          <Redirect to="/not-found" />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
