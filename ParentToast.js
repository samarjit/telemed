import React, {Component, useState, useEffect} from 'react';
import Toast from './Toast';
import Dummy from './Dummy';

// export default class ParentComponent extends Component {
export default function () {

  const [toasts, setToasts] = useState({0: 'A', 2: 'B', 3: 'C', 4: 'D'})

  const closeMe = (key) => {
    let newObj = Object.assign({}, toasts);
    delete newObj[key];
    console.log('ParentToast newObj toastIndex', key, newObj)
    setToasts(newObj);
  }
  useEffect(() => {
    setToasts({0: 'A', 2: 'B', 3: 'C', 4: 'D'})
  },[]);
  return (
    <div>
      {Object.keys(toasts).map(toastIndex => 
        <Dummy onSwipeRight={(e) => closeMe(toastIndex)} dataId={toastIndex}>
        {toastIndex} {toasts[toastIndex]}
        </Dummy>
      )}
    </div>
  )
}