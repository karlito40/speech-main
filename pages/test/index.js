import Link from 'next/link';
import SiteCSS from '../../styles/site';
import Test from '../../components/Test';
import React from 'react';

export default () => {
  return (
    <React.Fragment>
      <Link href="/sub"><a>Sub</a></Link>
      <Link href="/"><a>index</a></Link>
      <div className="hello">Welcome to next.js!!</div>
      <h1>Lalal</h1>
      <div className="fi flaticon-big-star"></div>
      <hr/>
      <Test/>
      <style jsx global>{SiteCSS}</style>
    </React.Fragment>
  )
}
