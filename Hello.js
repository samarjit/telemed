import React,{Component} from 'react';
import Button from './Button';

export default class Hello extends Component {

  constructor(props){
    super(props);

  }
  
  render (){
    return (
      <div >
      <Button>Hello</Button>
       {this.props.children}
      </div>
    )
  }
}