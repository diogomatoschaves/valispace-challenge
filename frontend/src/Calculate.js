/**
 * Created by diogomatoschaves on 24/11/2018.
 */

import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Button, Label } from 'react-bootstrap'
import { performNewCalculation } from './apiCalls'


class Calculate extends Component {

  static defaultProps = {
    operators: ['+', '-', '/', '*']
  }
  
  constructor(props) {
    super(props)
    this.state = {
      result: ''
    }
    // this.buttonSubmit = this.buttonSubmit.bind(this)
  }

  handleChange = (e) => {
    this.setState({ operation: e.target.value });
  }

  buttonSubmit = async () => {

    const { operation } = this.state
    const { functions, operators, updateMessage } = this.props

    const terms = operation.split(' ')

    const sanitizedTerms = terms.map((term, i) => {
      return i % 2 === 0 ? Number(term) ? Number(term) : Object.keys(functions).filter(func => functions[func].name === term)
          .map(func => functions[func])[0] : operators.includes(term) ? term : null
    })

    const pass = !sanitizedTerms.some((el) => {
      return [null, undefined, false].includes(el)
    }) && !(sanitizedTerms.length % 2 === 0)

    console.log(sanitizedTerms)
    console.log(pass)

    if (pass) {
      const response = await performNewCalculation(JSON.stringify({ terms: sanitizedTerms}))

      if (response.success) {
        this.setState({ result: response.result })
      } else {
        updateMessage({ message: 'There was an error processing your request.', bsStyle: 'danger'})
      }

    } else {
      updateMessage({ message: 'There\'s an error on the operation terms. Correct it and submit again!', bsStyle: 'danger'})
    }

  }
  
  render() {

    const { operation, result } = this.state
    const { functions } = this.props

    return (
      <div className="flex-column" style={{width: '80%', maxWidth: '850px', justifyContent: 'space-around'}}>
        <div className="flex-row" style={{width: '100%', justifyContent: 'space-between'}}>
          <ControlLabel>Available Functions:</ControlLabel>
        </div>
        <div className="flex-row" style={{width: '100%', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
          {Object.keys(functions).map(func => {
            return (
              <Label style={{marginRight: '6px', marginTop: '6px', fontSize: '1.3em', cursor: 'pointer'}}>
                {functions[func].name}
              </Label>
            )
          })}
        </div>
        <div className="flex-row" style={{width: '100%', justifyContent: 'space-between', marginTop: '15px'}}>
          <FormGroup style={{width: '45%'}}>
            <ControlLabel>Operation:</ControlLabel>
            <FormControl
              id="input-textarea"
              value={operation}
              onChange={this.handleChange}
              componentClass="textarea"
              placeholder="Insert your operation here"
              style={{height: '100px'}}
            />
          </FormGroup>
          <FormGroup style={{width: '45%'}}>
            <ControlLabel>Result:</ControlLabel>
            <FormControl
              id="input-textarea"
              value={result}
              onChange={this.handleChange}
              componentClass="textarea"
              placeholder="Result"
              style={{height: '100px', backgroundColor: 'white', cursor: 'auto'}}
              disabled={true}
            />
          </FormGroup>
        </div>
        <div className="flex-row" style={{width: '20%', alignSelf: 'flex-start', marginTop: '20px'}}>
          <Button type="button" id="send-request" disabled={!operation} bsStyle="primary" bsSize="large" onClick={this.buttonSubmit}>
            Calculate
          </Button>
        </div>
      </div>
    )
  }
}

export default Calculate
