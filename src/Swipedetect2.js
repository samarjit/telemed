import React, {Component, useEffect} from 'react';
import PropTypes from 'prop-types';

export default class Swipedetect extends Component {
  // static propTypes = {
  //   nodeName=PropTypes.string,
  //   innerRef,
  //   callback, 
  //   onSwipeRight,
  //   children, 
  //   className, 
  //   style
  // };
  static defaultProps = {
    nodeName: 'div'
  };
  constructor(props) {
    super(props);
    this.props = props;
    this.handleswipe = this.handleswipe.bind(this);
    
  }
  handleswipe(swipedir){
    console.log('swipe detected:', swipedir);
    if (swipedir === 'right' && this.props.onSwipeRight) {
      this.props.onSwipeRight();
    }
    if (this.props.callback) {
      this.props.callback();
    }
  }

  onRef = (el) => {
    this.touchsurface = el;
  }
 
  touchEndOutside() {

  }
  componentDidMount() {
    this.touchsurface;
    var swipedir,
    startX,
    startY,
    dist,
    distX,
    distY,
    threshold = 15, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 1000, // maximum time allowed to travel that distance
    elapsedTime,
    startTime;
    console.log('swipe detect attached')
  // const ref = innerRef ? el => (innerRef(el), callback.ref(el)) : callback.ref
    function touchStart(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    } 
    this.touchsurface.addEventListener('touchstart', touchStart, false)
    function touchMove(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }
    this.touchsurface.addEventListener('touchmove', touchMove, false)
    function touchEnd (e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        console.log(swipedir)
        this.handleswipe(swipedir)
        e.preventDefault()
    }
    touchEnd = touchEnd.bind(this);
    this.touchsurface.addEventListener('touchend', touchEnd, false);
   }
   componentWillUnMount() {
    console.log('Swipedetect unmounting');
    console.log('Swipedetect unmounted', this.touchsurface.dataset);
    this.touchsurface.removeEventListener('touchstart', touchStart, false);
    this.touchsurface.removeEventListener('touchmove', touchMove, false);
    this.touchsurface.removeEventListener('touchend', touchEnd, false);
  }

  render () {
    return React.createElement(this.props.nodeName, 
    {className: this.props.className, ref:this.onRef }, this.props.children);
  }
}
