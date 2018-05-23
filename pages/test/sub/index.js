import React from 'react'
import Link from 'next/link'

export default class extends React.Component {
  static async getInitialProps({ req }) {
    console.log('getInitialProps');
    const userAgent = req ? req.headers['user-agent'] + 'toto' : navigator.userAgent;
    return { userAgent };
  }

  render() {
    return (
      <>
        <Link href="/sub"><a>Sub</a></Link>
        {' '}<Link href="/"><a>index</a></Link>
        {' '}<Link href={{pathname: '/test/posts', query: { id: '3' }}} as="/posts/3"><a>post</a></Link>
        <div>Hello World {this.props.userAgent}</div>
      </>
    )
  }
}
