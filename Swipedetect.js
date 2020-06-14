import React, {Component, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

export default function Swipedetect ({
    nodeName='div',
    innerRef,
    callback, 
    onSwipeRight,
    children, 
    className, 
    style
  }) {

  function handleswipe(swipedir, e){
    console.log('swipe detected:', swipedir);
    if (swipedir === 'right' && onSwipeRight) {
      onSwipeRight(e);
    }
    if (callback) {
      callback(e);
    }
  }
  var touchsurface = useRef(null);
  // let el = useRef();
  // const onRef = (el) => {
  //   touchsurface.current = el;
  // }

  useEffect(() => {
    
    var swipedir,
    startX,
    startY,
    dist,
    distX,
    distY,
    threshold = 10, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 1000, // maximum time allowed to travel that distance
    elapsedTime,
    startTime;
    console.log('swipe detect attached',  touchsurface)
  // const ref = innerRef ? el => (innerRef(el), callback.ref(el)) : callback.ref
    function touchStart(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime =  e.timeStamp || new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    } 
    touchsurface.current.addEventListener('touchstart', touchStart, false)
    function touchMove(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }
    touchsurface.current.addEventListener('touchmove', touchMove, false);

    function touchEnd (e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = (e.timeStamp || new Date().getTime()) - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir, e)
        e.preventDefault()
    }
    // touchEnd = touchEnd.bind(this);
    touchsurface.current.addEventListener('touchend', touchEnd, false);
      return () => {
        console.log('Swipedetect unmounting');
        console.log('Swipedetect unmounted', touchsurface.current);
        touchsurface.current.removeEventListener('touchstart', touchStart, false);
        touchsurface.current.removeEventListener('touchmove', touchMove, false);
        touchsurface.current.removeEventListener('touchend', touchEnd, false);
      }
    }, [onSwipeRight])
  //  componentWillUnMount() {
  //   console.log('Swipedetect unmounting');
  //   console.log('Swipedetect unmounted', touchsurface.current.dataset);
  //   touchsurface.current.removeEventListener('touchstart', touchStart, false);
  //   touchsurface.current.removeEventListener('touchmove', touchMove, false);
  //   touchsurface.current.removeEventListener('touchend', touchEnd, false);
  // }
 
    // return React.createElement(nodeName, 
    // {className: className, ref: touchsurface}, children);
  return <div
    className = {className}  ref={touchsurface}
    >{children}
    </div>;
}
