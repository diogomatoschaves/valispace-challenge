/**
 * Created by diogomatoschaves on 24/11/2018.
 */

import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Button, ListGroupItem, DropdownButton, MenuItem } from 'react-bootstrap'
import { } from './apiCalls'


class Form extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      result: ''
    }
    // this.buttonSubmit = this.buttonSubmit.bind(this)
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  }
  
  render() {

    const { text, result, message } = this.state

    return (
      <div className="flex-column" style={{width: '80%', maxWidth: '850px', justifyContent: 'space-around'}}>
        <div className="flex-row" style={{width: '100%', justifyContent: 'space-between', marginTop: '15px'}}>
          <FormGroup style={{width: '45%'}}>
            <FormControl
              id="input-textarea"
              value={text}
              onChange={this.handleChange}
              componentClass="textarea"
              placeholder="Insert your operation here"
              style={{height: '100px'}}
            />
          </FormGroup>
          <FormGroup style={{width: '45%'}}>
            <FormControl
              id="input-textarea"
              value={result}
              onChange={this.handleChange}
              componentClass="textarea"
              placeholder="Result"
              style={{height: '100px'}}
              disabled={true}
            />
          </FormGroup>
        </div>
        <div className="flex-row" style={{width: '20%', alignSelf: 'flex-start', marginLeft: '10px', marginTop: '20px'}}>
          <Button type="button" id="send-request" disabled={!text} bsStyle="primary" bsSize="large" onClick={this.buttonSubmit}>
            Perform Calculation
          </Button>
        </div>
      </div>
    )
  }
}

export default Form
