/**
 * Created by diogomatoschaves on 28/11/2018.
 */
import React, { Component } from 'react'
import { Modal, Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

class InputModal extends Component {

  state = {
    name: '',
    expression: '',
    id: ''
  }

  componentDidUpdate(prevProps, prevState) {

    const { functionToEdit } = this.props

    if (prevProps.functionToEdit !== functionToEdit && functionToEdit && Object.keys(functionToEdit).length !== 0) {
      this.setState({
        id: functionToEdit.id,
        name: functionToEdit.name,
        expression: functionToEdit.expression
      })
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {

    const { handleClose, handleSubmit, showModal, editOrAdd } = this.props
    const { id, name, expression } = this.state

    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`${editOrAdd} Function `}<span style={{color: '#5bc0de'}}>{editOrAdd === 'Edit' && name}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex-column">
          <Form horizontal style={{width: '90%'}}>
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <FormControl name="name" onChange={this.handleChange} value={name} type="text" placeholder="Name" />
            </FormGroup>
            <FormGroup >
              <ControlLabel>Expression</ControlLabel>
              <FormControl name="expression" onChange={this.handleChange} value={expression} type="text" placeholder="Expression" />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button disabled={!name || !expression} bsStyle="primary" onClick={() => handleSubmit({ id, name, expression })}>{editOrAdd === 'Edit' ? 'Save Changes' : 'Add Function'}</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default InputModal
