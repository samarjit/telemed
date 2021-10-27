import React, { useState, useRef, useEffect } from 'react';
import './assets/spinner.css';

export default function () {
  return <div className="d-flex typingind">
    typing
    <div className="">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
}