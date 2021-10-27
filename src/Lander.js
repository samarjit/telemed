import React, { useRef, useEffect, useState } from 'react';
import { login, logout } from './reducer/loginReducer';
import httpClient from './util/http-client';

import M from 'materialize-css';
// import $ from 'jquery';
import './DoctorHome.scss';

export default function () {
  const sidebar = useRef();
  const dragTarget = useRef();
  const sidenavOverlay = useRef();

  // const signPassRef = useRef();
  // const retypePassRef = useRef();

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginOrSignup, setLoginOrSignup] = useState('');
  let _width = 300;
  let _time = 0;
  let _xPos = 0;
  let deltaX = 0;
  let _startingXpos = 0;
  let percentOpen = 0;
  let isDragging = false;

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

    // if(isOpenMenu ) {
    //   $(sidenavOverlay.current).css({opacity:1,display: 'block'})
    //   // $('#slide-out').addClass('menu-open')
    //   sidebar.current.style.transform = 'translateX(0%)'
    // } else {
    //   // $('#slide-out').removeClass('menu-open')
    //   sidebar.current.style.transform = 'translateX(-105%)'
    //   $(sidenavOverlay.current).css({opacity:0,display: 'none'})
    // }
  }, [isOpenMenu]);

  useEffect(() => {
    setTimeout(() => {
      console.log('init')
      M.updateTextFields();
    }, 100);
    // M.Sidenav.init(sidebar.current);
    // dragTarget.current = document.createElement('div');
    // dragTarget.current.classList.add("drag-target");
    // $('body').append(dragTarget.current);
    // // dragTarget.current.on('touchmove', _onDrag)
    // // dragTarget.current.on('touchstop', _onDragStop)


    return () => {

    }
  }, []);

  function passwordCheck() {
    const password = document.querySelector('.password').value;
    const repassword = document.querySelector('#retypepasswd').value;
    if (password !== repassword) {
      document.querySelector('.error_retypepasswd').innerHTML = 'passwords do not match';
    } else {
      document.querySelector('.error_retypepasswd').innerHTML = '';
    }
  }

  function menuClicked(e) {
    // console.log(e.target)
    closeMenu();
  }

  function doLogin() {
    const username = document.querySelector('.loginEmail').value;
    const password = document.querySelector('.password').value;
    console.log('posting user', username, password)
    httpClient.post('/auth/login', { username, password })
      .then((res) => {
        console.log('res', res)
        login(res.data.profile);
        // getReduxStore().dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.profile });
        // history.push('/home');
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          this.setState({ error: err.response.data.reason });
        }
      });

  }
  function doSignup() {
    const username = document.querySelector('.loginEmail').value;
    const password = document.querySelector('.password').value;
    const repassword = document.querySelector('#retypepasswd').value;
    if (password === repassword) {
      httpClient.post('/auth/register', {
        username, password,
      }).then((data) => {
        console.log('signup res', data);
        login();
      }).catch((err) => {
        if (err.response && err.response.data) {
          this.setState({ error: err.response.data.reason });
        }
      });
    }
    console.log(username, password)
  }
  return (
    <div>
      <div className="grey lighten-2 col banner justify-content-center align-items-center">
        <picture>
          800x600
      </picture>
      </div>
      <div className="card-panel1 p-3 m-10">
        Medical information is available abundantly, but deciding right one still needs experience. Consult a specialist just for a second opinion. It so easy with telemed.
      <div className="d-flex arrow-trail">
          <div className="d-flex   arrow">
            <div ><i className="fa fa-user-md"></i> <small>find doctor</small></div>
            <div className="d-flex align-items-center"><i class="fas fa-angle-right"></i></div>
          </div>
          <div className="d-flex arrow">
            <div  ><i class="fas fa-file-prescription"></i> <small>Share details</small></div>
            <div className="d-flex align-items-center"><i class="fas fa-angle-right"></i></div>
          </div>
          <div className="d-flex arrow">
            <div  ><i class="fas fa-notes-medical"></i> <small>Schedule chat</small></div>
            <div className="d-flex align-items-center"><i class="fas fa-angle-right"></i></div>
          </div>
          <div className="d-flex arrow">
            <div><i class="fas fa-comment-medical"></i> <small>Chat</small></div>
          </div>
        </div>
        <div className="chooseLoginOrSignup d-flex mt-10">
          <button type="button" className={`mt-5 flex-fill rounded-0 btn-flat ${loginOrSignup === 'signup' && 'active'}`} onClick={() => setLoginOrSignup('signup')}>SignUp</button>
          <button type="button" className={`mt-5 flex-fill rounded-0 btn-flat ${loginOrSignup === 'login' && 'active'}`} onClick={() => setLoginOrSignup('login')}>Login</button>
        </div>
        {loginOrSignup === 'signup' &&
          <article>
            <div className="h4 mt-2">Sign up</div>
            <div className=" ">
              <div class="input-field col s6">
                <label className=" " for="userid" >User Id</label>
                <input type="email" name="userid" id="userid" className="loginEmail" />
              </div>
              <div class="input-field col s6">
                <label for="fullName" className=" " >Full Name</label>
                <input type="text" name="Full Name" id="fullName" className="fullName" />
              </div>
              <div class="input-field col s6">
                <label for="passwd">Password</label>
                <input type="password" id="passwd" className="password" onKeyUp={() => passwordCheck()} />
              </div>

              <div class="input-field col">
                <label for="retypepasswd">Retype Password</label>
                <input type="password" id="retypepasswd" onKeyUp={() => passwordCheck()} />
                <span className="error error_retypepasswd" ></span>
              </div>

              <button type="button" className="btn" onClick={() => doSignup()}>Sign Up</button>
            </div>
          </article>
        }
        {loginOrSignup === 'login' &&
          <article>
            <div className="h4 mt-2">Login</div>
            <div class="row ">
              <div class="col s12">
                <div class="input-field col">
                  <label for="email_inline">Email</label>
                  <input id="email_inline" type="email" className="loginEmail validate" />
                </div>
                <div class="input-field col">
                  <label for="passwd2">Password</label>
                  <input id="passwd2" type="password" className="password validate" />

                </div>
                <button type="button" className="btn" onClick={() => doLogin()}>Login</button>
              </div>
            </div>
          </article>
        }
      </div>
    </div>
  );
}
