import App, { Container } from 'next/app';
import React from 'react';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import { actions } from '../store/api';

class MyApp extends App {
  static async getInitialProps(props) {

    const { ctx: { reduxStore, req } } = props;

    const isServer = !!req;
    if(isServer && req.cookies.token) {
      await reduxStore.dispatch(actions.getMe({
        _token: req.cookies.token,
        _isServer: isServer
      }));
    }

    const appProps = await super.getInitialProps(props);
    return appProps;
  }

  render () {
    const {Component, pageProps, reduxStore} = this.props
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp);
