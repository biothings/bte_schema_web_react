import React from 'react';
import { Header } from './Header';
import Footer from './Footer';

export function Page(props) {
  return (
    <div className="container flex-wrapper">
      <div>
        <Header banner={props.banner === undefined ? true : props.banner} home={props.home}/>
      </div>
      <div>
        {props.children}
      </div>
      <div style={{marginTop: 'auto'}}>
        <Footer />
      </div>
    </div>
  )
}