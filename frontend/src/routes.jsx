import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Home from './pages/Home';
import Seller from './pages/Seller';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Product from './pages/Product';
import Demo from './pages/Demo';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { getUser } from './helpers/authHelper';

const headerlessPages = ['Login'];

export default class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeader: true,
      user: {}
    };

    this.routeChange = this.routeChange.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  initialize() {
    var user = getUser();
    this.setState({ user });
  }

  login() {
    this.initialize();
  }

  routeChange(page) {
    if (headerlessPages.includes(page)) this.setState({ isHeader: false });
    else if (!this.state.isHeader) this.setState({ isHeader: true });
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header user={this.state.user} isHeader={this.state.isHeader} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Home routeChange={this.routeChange} {...props} />
                )}
              />
              <Route
                path='/demo'
                render={props => (
                  <Demo routeChange={this.routeChange} {...props} />
                )}
              />
              <Route
                path='/register/:type'
                render={props => (
                  <Register routeChange={this.routeChange} {...props} />
                )}
              />
              <Route
                exact
                path='/register'
                render={() => <Redirect to='/register/customer' />}
              />
              <Route
                path='/login'
                render={props =>
                  !!this.state.user ? (
                    <Redirect to='/' />
                  ) : (
                    <Login
                      routeChange={this.routeChange}
                      login={this.login}
                      {...props}
                    />
                  )
                }
              />
              <Route
                path='/seller'
                render={props => (
                  <Seller routeChange={this.routeChange} {...props} />
                )}
              />
              <Route
                exact
                path='/products'
                render={props => (
                  <Products routeChange={this.routeChange} {...props} />
                )}
              />
              <Route
                path='/product/:id'
                render={props => (
                  <Product routeChange={this.routeChange} {...props} />
                )}
              />
              <Redirect from='/*' to='/' />
            </Switch>
            <Footer isFooter={this.state.isHeader} />
          </div>
        </Router>
      </div>
    );
  }
}
