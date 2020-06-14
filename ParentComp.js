import React, {Component, useState} from 'react';
import Toast from './Toast';
import Dummy from './Dummy';

export default class ParentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toasts: {0: 'A', 2: 'B', 3: 'C', 4: 'D'},
      instanceId: 1
    }
    this.closeMe = this.closeMe.bind(this);
  }
  
  closeMe(key){
    let newObj = Object.assign({}, this.state.toasts);
    delete newObj[key];
    console.log('ParentToast toastIndex newObj', key, newObj)
    this.setState({toasts: newObj});
  }

  render() {
    // const [toasts, setToasts] = useState({0: 'A', 2: 'B', 3: 'C', 4: 'D'})
    // const [instanceId, setInstanceId] = useState(1);
    return (
      <div> ParentComp
        {Object.keys(this.state.toasts).map(toastIndex => 
          <Dummy onSwipeRight={(e) => this.closeMe(toastIndex)} dataId={toastIndex}>
          {toastIndex} {this.state.toasts[toastIndex]}
          </Dummy>
        )}
      </div>
    )
  }
}