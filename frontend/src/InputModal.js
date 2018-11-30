/**
 * Created by diogomatoschaves on 28/11/2018.
 */
import React, { Component, Fragment } from 'react'
import { Modal, Button, Form, FormGroup, FormControl, ControlLabel, Label, Glyphicon } from 'react-bootstrap'
import { typeAhead } from './apiCalls'
import ParameterInput from './ParameterInput'

class InputModal extends Component {

  state = {
    name: '',
    id: '',
    firstParamIntResults: [],
    secondParamIntResults: [],
    inputNoValid: false,
    originalName: ''
  }

  componentDidUpdate(prevProps, prevState) {

    const { functionToEdit } = this.props

    if (prevProps.functionToEdit !== functionToEdit && functionToEdit && Object.keys(functionToEdit).length !== 0) {
      this.setState({
        ...functionToEdit,
        firstParamIntResults: [],
        secondParamIntResults: [],
        originalName: functionToEdit.name,
        inputNotValid: false
      })
    }
  }

  checkSubmit = () => {

    const { handleSubmit, functionNames, editOrAdd, functionToEdit } = this.props
    const { id, name, operator, firstParamFunc, firstParamInt, secondParamFunc, secondParamInt } = this.state

    const pattern = /[\w_-]+/g

    const nameCheck = (editOrAdd === 'Add' ? !functionNames.includes(name) :
            !functionNames.filter(name => name !== functionToEdit.name).includes(name))
        && name.match(pattern) && name.match(pattern)[0] === name
    const firstParamCheck = firstParamFunc || Number(firstParamInt)
    const secondParamCheck = secondParamFunc || Number(secondParamInt)
    const operatorCheck = ['+', '-', '*', '/'].includes(operator)

    if (nameCheck && firstParamCheck && secondParamCheck && operatorCheck) {
      handleSubmit({ id, name, operator, firstParamFunc, firstParamInt, secondParamFunc, secondParamInt })
    } else {
      this.setState({ inputNotValid: true })
    }
  }

  handleChange = async (e) => {

    e.persist()
    
    this.setState({ [e.target.name]: e.target.value })

    if (e.target.value && !['name', 'operator'].includes(e.target.name)) {

      const response = await typeAhead(e.target.value)

      if (response.success && response.results.length > 0) {
        this.setState(state => {
          return {
            firstParamIntResults: [],
            secondParamIntResults: [],
            [`${e.target.name}Results`]: response.results.filter(func => {
              return ![state.id, state.firstParamFunc, state.secondParamFunc].includes(String(func.id))
            }),
          }
        })
      }
    } else {
      this.setState({[`${e.target.name}Results`]: []})
    }
  }

  changeState = (e, args) => {
    e.stopPropagation()
    this.setState(args)
  }
  
  onBlur = (e, param) => {
    setTimeout(() => {
      this.setState({[param]: []})
    }, 300)
  }

  render() {

    const { handleClose, showModal, editOrAdd, functions } = this.props
    const { name, operator, firstParamInt, firstParamFunc, secondParamInt, originalName,
        secondParamFunc, firstParamIntResults, secondParamIntResults, inputNotValid } = this.state

    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`${editOrAdd} Function `}<span style={{color: '#5bc0de'}}>{editOrAdd === 'Edit' && originalName}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex-column">
          {inputNotValid && <span style={{color: 'red'}}>Check your inputs!</span>}
          <Form horizontal style={{width: '90%'}}>
            <FormGroup className="flex-row">
              <div style={{ width: '90%'}}>
                <ControlLabel>Name</ControlLabel>
                <FormControl name="name" onChange={this.handleChange} value={name} type="text" placeholder="Name" />
              </div>
            </FormGroup>
            <FormGroup className="flex-row" style={{justifyContent: 'space-between'}}>
              <div style={{width: '30%'}}>
                <ControlLabel>1<sup>st</sup> Parameter</ControlLabel>
                <ParameterInput
                  paramFunc={firstParamFunc}
                  paramInt={firstParamInt}
                  functionName={firstParamFunc && functions[firstParamFunc].name}
                  handleChange={this.handleChange}
                  changeState={this.changeState}
                  onBlur={this.onBlur}
                  typeResults={firstParamIntResults}
                  paramFuncString="firstParamFunc"
                  paramIntString="firstParamInt"
                  paramResultsString="firstParamIntResults"
                />
              </div>
              <div style={{width: '20%'}}>
                <ControlLabel>Operator</ControlLabel>
                <FormControl name="operator" onChange={this.handleChange} value={operator} type="text" placeholder="Operator" />
              </div>
              <div style={{width: '30%'}}>
                <ControlLabel>2<sup>nd</sup> Parameter</ControlLabel>
                <ParameterInput
                  paramFunc={secondParamFunc}
                  paramInt={secondParamInt}
                  functionName={secondParamFunc && functions[secondParamFunc].name}
                  handleChange={this.handleChange}
                  changeState={this.changeState}
                  onBlur={this.onBlur}
                  typeResults={secondParamIntResults}
                  paramFuncString="secondParamFunc"
                  paramIntString="secondParamInt"
                  paramResultsString="secondParamIntResults"
                />
              </div>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button
            disabled={!name || (!firstParamInt && !firstParamFunc) || (!secondParamInt && !secondParamFunc)}
            bsStyle="primary"
            onClick={() => this.checkSubmit()}
          >
            {editOrAdd === 'Edit' ? 'Save Changes' : 'Add Function'}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default InputModal
