import React from 'react';
import './cancel-button.style.scss';
import ReactDOM from 'react-dom';

class CancelButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      parentId: ''
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  handleCancelClick() {
    const editBoxId = this.state.parentId.toString();
    const addBoxId = editBoxId.replace('edit', 'add');
    document.getElementById(`${editBoxId}`).classList.add('none');
    document.getElementById(`${addBoxId}`).classList.remove('none');
  }

  componentDidMount() {
    this.setState({
      parentId: ReactDOM.findDOMNode(this).parentNode.getAttribute("id")
    });
  }

  render () {
    return (<span className='desc-icon' title='CANCEL' onClick={this.handleCancelClick}>&#10060;</span>)
  }
}

export default CancelButton;