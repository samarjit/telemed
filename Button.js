import React,{ Component } from 'react';

export default class Button extends Component{

  constructor(props){
    super(props);
    this.props = props;
  }
  onClick(){
    if(this.props.onClickMe){
      this.props.onClickMe();
    }
  }
  render (){
    return (
      <button onClick={this.onClick}>Blick</button>
    )
  }
}