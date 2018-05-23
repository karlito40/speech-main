import React, { Component } from 'react'
import Test from '../../components/Test'

export default class extends Component {
  static getInitialProps ({ query: { id } }) {
    return { postId: id }
  }

  render () {
    return (
      <div>
        <h1>My blog post #{this.props.postId}</h1>
        <Test/>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    );
  }
}
