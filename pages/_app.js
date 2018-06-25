import App, { Container } from 'next/app';
import React from 'react';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import { actions } from '../store/api';
import { PageTransition } from 'next-page-transitions';
import Router from 'next/router';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const TIMEOUT = 250;

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
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <Provider store={reduxStore}>
          <PageTransition timeout={TIMEOUT} classNames="page page-transition">
            <Component {...pageProps} />
          </PageTransition>
        </Provider>

        <style jsx global>{`
          .page-transition-enter :global(.body-app.active-enter-transition) {
            transform: translateY(30px);
            opacity: 0;
          }

          .page-transition-enter-active :global(.body-app.active-enter-transition) {
            transform: translateY(0px);
            opacity: 1;
            transition: transform ${TIMEOUT}ms, opacity ${TIMEOUT/2}ms;
          }

          .page-transition-exit :global(.body-app.active-exit-transition) {
            opacity: 1;
          }

          .page-transition-exit-active :global(.body-app.active-exit-transition) {
            opacity: 0;
            transition: opacity ${TIMEOUT}ms;
          }
        `}</style>
      </Container>
    )
  }
}

export default withReduxStore(MyApp);
