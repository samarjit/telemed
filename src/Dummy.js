import React, {Component, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import useEventListener from './useEventListener';

export default function Swipedetect (props) {

  function handleswipe(swipedir, e){
    console.log('swipe detected:', swipedir);
    props.onSwipeRight(e);
  }
  var innerRef = useRef(null);
  // let el = useRef();
  // const onRef = (el) => {
  //   touchsurface.current = el;
  // }
  // useEventListener(innerRef, 'click', handleswipe)
  useEffect(() => {
    const div = innerRef.current;
    console.log('rerender Dummy', props.dataId);
      $(div).on('click', 'button', handleswipe)
    return () => { 
      $(div).off('click', 'button', handleswipe)
    }
  },[props.onSwipeRight]);

return <div
    className = {props.className}  ref={innerRef} 
    >
    <button  type="button" >Close</button>
    {props.children}
    </div>;
}