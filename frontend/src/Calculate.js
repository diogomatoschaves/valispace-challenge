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
      result: '',
      operation: ''
    }
  }

  handleChange = (e) => {
    this.setState({ operation: e.target.value });
  }

  buttonSubmit = async () => {

    const { operation } = this.state
    const { functions, operators, updateMessage } = this.props

    const terms = operation.split(' ')

    const sanitizedTerms = terms.filter(term => term).map((term, i) => {
      return i % 2 === 0 ? Number(term) ? Number(term) : Object.keys(functions).filter(func => functions[func].name === term)
          .map(func => functions[func])[0] : operators.includes(term) ? term : null
    })

    const pass = !sanitizedTerms.some((el) => {
      return [null, undefined, false].includes(el)
    }) && !(sanitizedTerms.length % 2 === 0)

    console.log(terms)
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

  addInputValue = (funcName) => {
    this.setState(state => {
      return {
        operation: `${state.operation} ${funcName}`.trim()
      }
    })
  }
  
  render() {

    const { operation, result } = this.state
    const { functions, operators } = this.props

    return (
      <div className="flex-column" style={{width: '80%', maxWidth: '850px', justifyContent: 'space-around'}}>
        <ControlLabel style={{alignSelf: 'flex-start'}}>Available Functions:</ControlLabel>
        <div className="flex-row" style={{width: '100%', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
          {Object.keys(functions).map(func => {
            return (
              <Label key={func} bsStyle="primary" onClick={() => this.addInputValue(functions[func].name)} style={{marginRight: '6px', marginTop: '6px', fontSize: '1.3em', cursor: 'pointer'}}>
                {functions[func].name}
              </Label>
            )
          })}
        </div>
        <ControlLabel style={{alignSelf: 'flex-start', marginTop: '10px'}}>Operators:</ControlLabel>
        <div className="flex-row" style={{width: '100%', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
          {operators.map(operator => {
            return (
              <Label key={operator} bsStyle="success" onClick={() => this.addInputValue(operator)} style={{marginRight: '6px', marginTop: '6px', fontSize: '1.3em', cursor: 'pointer'}}>
                {operator}
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
