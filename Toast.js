import React, {useState} from 'react';
import $ from 'jquery';
import _ from 'lodash';
import {toastStore, hideToast} from './toastReducer';
import Swipedetect from './Swipedetect'; 
// import Swipedetect from 'react-easy-swipe';
import {Swipeable} from 'react-swipeable';
import './Toast.css';
import ev from './event';

const sample = `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <img src="..." class="rounded mr-2" alt="..."/>
      <strong class="mr-auto">Bootstrap</strong>
      <small>11 mins ago</small>
      <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body">
     <%=t.toastBody%>
    </div>
  </div>`

export default class Toast extends React.Component {
  constructor(props){
    this.instanceCount = 0;
    super(props);
    this.state = {toasts: {}}; // {toasts: {0: 'hello'}, slideoutClassNumber: -1};
    this.onMessage = this.onMessage.bind(this);
    this.closeToast = this.closeToast.bind(this);
    this.swipeCb = this.swipeCb.bind(this);
    this.onMessageEvtHandler = this.onMessageEvtHandler.bind(this);
  }

  onMessage() {
  //  this.setState({toasts:toastStore.getState()});
  }
  onMessageEvtHandler (toastEvt) {
    this.instanceCount += 1;
    let newOb = this.state.toasts;
    newOb[this.instanceCount] = toastEvt+this.instanceCount;
    this.setState({toasts: newOb});
  }

  componentDidMount() {
    console.log('rendering Toast')
  // let todoref = React.useRef();
  // const [toasts, setToasts] = useState([]);
  // let state = [];
    // toastStore.subscribe(this.onMessage);
    ev.on('ADD_TOAST', this.onMessageEvtHandler);
  }

  closeToast(key, e) {
    console.log('swipe detected', key, e);
    this.setState({slideoutClassNumber: key});
    // $(`.toast[data-id=${key}]`).parents('.swiper').addClass('slideout');
    setTimeout(() => {
      let newOb = this.state.toasts;
      delete newOb[key];
      console.log('newOb',key, newOb);
      if (Object.keys(newOb).length === 0) {
        this.instanceCount = 0;
      }
      this.setState({toasts: newOb, slideoutClassNumber: -1});
    }, 200);
  }
  swipeCb(key, e) {
    this.closeToast(key, e);
// hideToast();
  }
  render () {

  return (<>
  <div ref={el => this.todoref = el} style={{position: 'fixed',top: '1px', right: '1px'}}>

    {Object.keys(this.state.toasts).map((toast) => 
      <Swipedetect onSwipeRight={(e)=>this.swipeCb(toast,e)} className={`swiper ${this.state.slideoutClassNumber === toast?'slideout': ''}`}  dataId={toast}>
       <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" style={{opacity: 1}} key={toast} data-id={toast}>
        <div class="toast-header">
          <strong class="mr-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={(e) => this.closeToast(toast)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">
        {this.state.toasts[toast]}
        </div>
       </div>
      </Swipedetect>
    )}
    
  </div>
  </>)
  }
}