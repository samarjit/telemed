import React, {useRef, useEffect, useState} from 'react';
import M from 'materialize-css';
import $ from 'jquery';
import './Sidemenu.scss';

export default class Sidemenu extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this._addDragTarget = this._addDragTarget.bind(this);
  } 
  componentDidMount() {
    M.Sidenav.init(this.sidebar);
    // this._addDragTarget();
  }
  _addDragTarget() {
    $(this.sidebar)
  }
  componentWillUpdate() {
    return false;
  }

  render () {
  return (
  <div >
  <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
   <nav>  Nav </nav>
  <ul id="slide-out" className="sidenav" ref={(el) => this.sidebar = el}>
    <li>
      <div className="user-view">
        <div className="background">
         
        </div>
        <a href="#user"><i className="fa fa-user-circle"></i></a>
        <a href="#name"><span className="white-text name">John Doe</span></a>
        <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
      </div>
    </li>
    <li>
      <a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a>
    </li>
    <li><a href="#!">Second Link</a></li>
    <li><div className="divider"></div></li>
    <li><a className="subheader">Subheader</a></li>
    <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
  </ul>
  
  </div>
  );
  }
}
