import React, { useRef, useEffect, useState } from 'react';
import M from 'materialize-css';
import $ from 'jquery';
import './Sidemenu.scss';
import { login, logout } from './reducer/loginReducer';

export default function () {
  const sidebar = useRef();
  const dragTarget = useRef();
  const sidenavOverlay = useRef();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [open, setOpen] = useState(false);
  let _width = 300;
  let _time = 0;
  let _xPos = 0;
  let deltaX = 0;
  let _startingXpos = 0;
  let percentOpen = 0;
  function _onDragStart(e) {
    console.log('dragTarget drag start')
    let clientX = e.targetTouches[0].clientX;
    _xPos = _startingXpos = clientX;
    _time = e.timeStamp;
    $(sidenavOverlay.current).css({ opacity: 1, display: 'block' })
  }
  function _onDrag(e) {
    let clientX = e.targetTouches[0].clientX;
    // deltaX = Math.abs(_xPos - clientX);
    _xPos = clientX;
    // velocityX = deltaX / (e.timeStamp - _time);
    _time = e.timeStamp;
    let totalDeltaX = _xPos - _startingXpos;
    let transformX = totalDeltaX;
    let transformPrefix = 'translateX(-100%)';
    percentOpen = Math.min(1, totalDeltaX / _width);
    console.log(transformX)
    sidebar.current.style.transform = `${transformPrefix} translateX(${transformX}px)`;
  }
  function _onDragStop(e) {
    console.log('_ondragstop', percentOpen)
    if (percentOpen > .2) {
      setIsOpenMenu(true)
      // sidebar.current.style.transform = null;
      $(sidenavOverlay.current).css({ opacity: 1, display: 'block' })
      // $('#slide-out').addClass('menu-open')
      sidebar.current.style.transform = 'translateX(0%)'
    } else {
      setIsOpenMenu(false)
      // sidebar.current.style.transform = null;
      // $('#slide-out').removeClass('menu-open')
      sidebar.current.style.transform = 'translateX(-105%)'
      $(sidenavOverlay.current).css({ opacity: 0, display: 'none' })
    }

  }
  function onCloseDragStart(e) {
    let clientX = e.targetTouches[0].clientX;
    _xPos = _startingXpos = clientX;
    _time = e.timeStamp;
  }
  function onCloseDragMove(e) {
    let clientX = e.targetTouches[0].clientX;
    // deltaX = Math.abs(_xPos - clientX);
    _xPos = clientX;
    let totalDeltaX = _xPos - _startingXpos;
    let transformX = totalDeltaX;
    let transformPrefix = 'translateX(100%)';
    percentOpen = 1 - Math.min(1, Math.abs(totalDeltaX) / _width);
    // console.log(transformX)
    sidebar.current.style.transform = `translateX(${transformX}px)`;
  }
  function onCloseDragStop(e) {
    console.log('_onClosedragstop', percentOpen)
    if (percentOpen > .8) {
      setIsOpenMenu(true)
      // sidebar.current.style.transform = null;
      $(sidenavOverlay.current).css({ opacity: 1, display: 'block' })
      // $('#slide-out').addClass('menu-open')
      sidebar.current.style.transform = 'translateX(0%)'
    } else {
      setIsOpenMenu(false)
      // sidebar.current.style.transform = null;
      // $('#slide-out').removeClass('menu-open')
      sidebar.current.style.transform = 'translateX(-105%)'
      $(sidenavOverlay.current).css({ opacity: 0, display: 'none' })
    }
  }
  function onOverlayClick() {
    closeMenu();
  }
  function closeMenu() {
    setIsOpenMenu(false);
  }
  function openCloseMenu() {

  }
  function toggleMenu() {
    setIsOpenMenu(!isOpenMenu);
  }

  useEffect(() => {
    if (isOpenMenu) {
      $(sidenavOverlay.current).css({ opacity: 1, display: 'block' })
      // $('#slide-out').addClass('menu-open')
      sidebar.current.style.transform = 'translateX(0%)'
    } else {
      // $('#slide-out').removeClass('menu-open')
      sidebar.current.style.transform = 'translateX(-105%)'
      $(sidenavOverlay.current).css({ opacity: 0, display: 'none' })
    }
  }, [isOpenMenu]);

  useEffect(() => {
    // M.Sidenav.init(sidebar.current);
    dragTarget.current.addEventListener('touchstart', _onDragStart);
    dragTarget.current.addEventListener('touchmove', _onDrag);
    dragTarget.current.addEventListener('touchend', _onDragStop);

    sidenavOverlay.current.addEventListener('click', onOverlayClick);
    sidenavOverlay.current.addEventListener('touchstart', onCloseDragStart);
    sidenavOverlay.current.addEventListener('touchmove', onCloseDragMove);
    sidenavOverlay.current.addEventListener('touchend', onCloseDragStop);
    sidebar.current.addEventListener('touchstart', onCloseDragStart);
    sidebar.current.addEventListener('touchmove', onCloseDragMove);
    sidebar.current.addEventListener('touchend', onCloseDragStop);
    () => {
      dragTarget.current.removeEventListener('touchstart', _onDragStart);
      dragTarget.current.removeEventListener('touchmove', _onDrag);
      dragTarget.current.removeEventListener('touchend', _onDragStop);
      sidenavOverlay.current.removeEventListener('click', onOverlayClick);
      sidenavOverlay.current.removeEventListener('touchstart', onCloseDragStart);
      sidenavOverlay.current.removeEventListener('touchmove', onCloseDragMove);
      sidenavOverlay.current.removeEventListener('touchend', onCloseDragStop);
      sidebar.current.removeEventListener('touchstart', onCloseDragStart);
      sidebar.current.removeEventListener('touchmove', onCloseDragMove);
      sidebar.current.removeEventListener('touchend', onCloseDragStop);
    }
  }, []);

  function menuClicked(e) {
    // console.log(e.target)
    closeMenu();
  }

  return (
    <div>
      <div className='drag-target' ref={dragTarget}></div>
      <div className='sidenav-overlay' ref={sidenavOverlay}></div>

      <nav id="topNav"><button type="button" data-target="slide-out" className="sidenav-trigger" onClick={() => toggleMenu()}><i className="material-icons" >menu</i></button>  Nav </nav>
      <ul id="slide-out" className="sidenav menu-open" ref={(el) => sidebar.current = el} onClick={(e) => menuClicked(e)}>
        <li>
          <div className="user-view">
            <div className="background">

            </div>
            <a href="#user"><i className="fa fa-user-circle"></i></a>
            <a href="#name"><span className="white-text name">Samarjit </span></a>
            <a href="#email"><span className="white-text email">ss@gmail.com</span></a>
          </div>
        </li>
        <li><a href="#/doctorhome"><i className="material-icons">home</i>DoctorHome</a></li>
        <li><a href="#/patienthome"><i className="material-icons">home</i> PatientHome</a></li>
        <li><a href="#/chat/1"><i class="material-icons">forum</i> Chat</a></li>
        <li><a href="#/appointment"><i class="material-icons">perm_contact_calendar</i>appointment</a></li>
        <li><div className="divider"></div></li>
        <li onClick={(e) => logout()}><a href="#/lander"><i className="material-icons">logout</i>Logout</a></li>
        <li><a className="subheader" >Hidden Stuff</a></li>
        <li><a className="waves-effect" href="#/toast"><i class="material-icons">notifications</i>Toast</a></li>
        <li><a href="#/notification"><i class="material-icons">notifications</i>Notification</a></li>
        <li><a href="#/lander"><i class="fa fa-notes-medical"></i>Lander</a></li>
      </ul>

    </div>
  );
}
