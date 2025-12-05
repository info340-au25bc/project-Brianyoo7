import React from 'react';
import { Link } from 'react-router';

export default function Hamburger(props) {

    return (
    <div className="hamburger" onClick={props.toggleHamburger}>
      <div className={`burger ${props.isOpen ? 'open-top' : ''}`}></div>
      <div className={`burger ${props.isOpen ? 'open-middle' : ''}`}></div>
      <div className={`burger ${props.isOpen ? 'open-bottom' : ''}`}></div>
    </div>
  );
}