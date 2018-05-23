import React from 'react'
import Link from 'next/link'

export default class extends React.Component {
  static async getInitialProps({ req }) {
    console.log('getInitialProps test');
    const userAgent = req ? req.headers['user-agent'] + 'toto' : navigator.userAgent;
    return { userAgent };
  }

  render() {
    return (
      <>
        <Link href="/sub"><a>Sub</a></Link>
        <Link href="/"><a>index</a></Link>
        <div className="user-agent">Hello World {this.props.userAgent}</div>
      </>
    )
  }
}
