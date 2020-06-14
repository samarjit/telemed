import React, {useState, useRef} from 'react';
import {addNotification, enablePushNotification, checkSubscription, unsubscribeMe} from './notificationReducer';

export default function Notification() {
  const inputRef = useRef(null);
  function send() {
    console.log(inputRef.current.value);
    addNotification({body: inputRef.current.value})
  }
  return (
    <>
    <button type="button" onClick={unsubscribeMe}>Unsubscribe Me</button>
    <button type="button" onClick={enablePushNotification}>Enable Notification</button>
    <button type="button" onClick={checkSubscription}>Get Subscriptions</button>
    <input ref={inputRef} />
    <button type="button" onClick={send}>send me</button>
    
    </>
  )
}