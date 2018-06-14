import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import * as layoutCSS from '../../styles/layouts/account';
import ConnexionForm from '../forms/ConnexionForm';
import MemberHeader from '../headers/MemberHeader';
import BaseLayout from './BaseLayout';
import { redirect } from '../../lib/route';

export default class extends BaseLayout {

  static async getInitialProps({ reduxStore: { getState }, res, asPath }) {
    const { userApp, profileApp } = getState();
    const props = { isAuthorized: true };

    if(!userApp) {
      props.isAuthorized = false;
      redirect(res, '/');
    } else if(
      asPath != '/member/settings'
      && (!profileApp
        || !profileApp.headline
        || !profileApp.content
        || !profileApp.pseudo
      )
    ) {
      redirect(res, '/member/settings');
    }

    return props;
  }


  renderHeader() {
    return <MemberHeader/>;
  }


  renderMeta() {
    return (<React.Fragment>
      {Object.values(layoutCSS).map((cssItem, i) => {
        return (<React.Fragment key={i}>
          <style jsx global>{ cssItem }</style>
        </React.Fragment>)
      })}
    </React.Fragment>);
  }

}
