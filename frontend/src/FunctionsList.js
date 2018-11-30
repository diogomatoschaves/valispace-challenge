/**
 * Created by diogomatoschaves on 24/11/2018.
 */


import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Button, ButtonGroup, Well, Label } from 'react-bootstrap'
import { editFunctionAsync, addFunctionAsync, deleteFunctionAsync } from './apiCalls'
import InputModal  from './InputModal'


class FunctionsList extends Component {

  static defaultProps = {
    styleOptions: {
      requesting: 'warning',
      pending: 'info',
      completed: 'success',
      failed: 'danger'
    }
  }
  
  state = {
    showModal: null,
    functionToEdit: {}
  }

  handleClose = () => {
    this.setState({ showModal: false, functionToEdit: null })
  }

  openModal = ({ editOrAdd, id }) => {

    const { functions } = this.props

    this.setState({
      showModal: true,
      editOrAdd,
      functionToEdit: editOrAdd === 'Edit' ? functions[id] : {
        id: null,
        name: '',
        operator: '',
        firstParamInt: '',
        firstParamFunc: '',
        secondParamInt: '',
        secondParamFunc: '',
      }
    })
  }

  editFunction = async (args) => {
    
    const { updateFunction, updateMessage } = this.props

    this.handleClose()
    
    const response = await editFunctionAsync(JSON.stringify(args))

    if (response.success) {
      updateFunction(args)
      updateMessage({ message: 'The changes were saved.', bsStyle: 'success'})
    } else {
      updateMessage({ message: 'There was an error processing your request.', bsStyle: 'danger'})
    }
  }
  
  addNewFunction = async (args) => {
    const { addFunction, updateMessage } = this.props

    this.handleClose()

    const response = await addFunctionAsync(JSON.stringify(args))

    if (response.success) {
      const func = response.newFunction
      console.log(func)
      addFunction({ id: String(func.id),
          name: func.name,
          operator: func.operator,
          firstParamInt: func.first_parameter_int,
          firstParamFunc: func.first_parameter_func,
          secondParamInt: func.second_parameter_int,
          secondParamFunc: func.second_parameter_func,
      })
      updateMessage({ message: 'The function was added.', bsStyle: 'success'})
    } else {
      updateMessage({ message: 'There was an error processing your request.', bsStyle: 'danger'})
    }
  }

  deleteFunction = async ({ id }) => {

    const { delFunction, updateMessage } = this.props

    const response = await deleteFunctionAsync({ id })

    if (response.success) {
      delFunction(response.deleted_ids)
      updateMessage({ message: 'The function was deleted.', bsStyle: 'success'})
    } else {
      updateMessage({ message: 'There was an error processing your request.', bsStyle: 'danger'})
    }
  }
  
  render() {

    const { functions, styleOptions, functionNames } = this.props
    const { showModal, editOrAdd, functionToEdit } = this.state

    console.log(functions)

    const functionsArray = functions ? Object.keys(functions).map(key => functions[key]) : []

    return (
      <div className="flex-column" style={{width: '80%', maxWidth: '850px', justifyContent: 'flex-start'}}>
        <div className="flex-row" style={{justifyContent: 'space-between', width: '100%'}}>
          <div
            className="flex-row"
            style={{ width: '77%', justifyContent: 'space-around', fontSize: '1.3em',
            fontWeight: 700, padding: '20px', paddingBottom: 0}}
          >
            <div
              className="flex-row"
              style={{width: '30%', height: '40px', borderBottom: '2px solid rgb(200, 200, 200)'}}
            >
              Name
            </div>
            <div
              className="flex-row"
              style={{width: '30%', height: '40px', borderBottom: '2px solid rgb(200, 200, 200)'}}
            >
              Expression
            </div>
          </div>
          <div style={{width: '20%', textAlign: 'center'}}>
            <Button onClick={() => this.openModal({editOrAdd: 'Add' })} bsStyle="primary"><strong>Add Function</strong></Button>
          </div>
        </div>
        <ListGroup style={{width: '100%'}}>
          {functionsArray.map(func => {

            return (
              <div key={func.id} className="flex-row func-item-wrapper" style={{width: '100%', justifyContent: 'space-between'}}>
                <ListGroupItem
                  bsStyle={styleOptions[func.status]}
                  style={{padding: 0, width: '77%', border: 'none', borderBottom: '1px solid rgb(200, 200, 200)', marginBottom: '2px'}}
                  className="flex-column func-item"
                >
                  <div className="flex-column" style={{width: '100%', padding: '20px'}}>
                    <div className='flex-row' style={{width: '100%', justifyContent: 'space-around'}}>
                      <div style={{width: '30%', textAlign: 'center', fontSize: '1.6em'}} className="message-header">
                        <Label bsStyle="primary" bsSize="large">{func.name}</Label>
                      </div>
                      <div style={{width: '30%', textAlign: 'center'}}>
                        {func.firstParamFunc && <Label bsStyle="primary">{functions[func.firstParamFunc].name}</Label>}
                        {func.firstParamInt && func.firstParamInt}
                        {' '}
                        {func.operator && func.operator}
                        {' '}
                        {func.secondParamFunc && <Label bsStyle="primary">{functions[func.secondParamFunc].name}</Label>}
                        {func.secondParamInt && func.secondParamInt}
                      </div>
                    </div>
                  </div>
                </ListGroupItem>
                <div
                  className="flex-row"
                  style={{width: '20%', textAlign: 'center', alignSelf: 'flex-start',
                  paddingTop: '20px', justifyContent: 'space-around'}}
                >
                  <Button
                    onClick={() => this.openModal({editOrAdd: 'Edit', id: func.id })}
                    bsStyle="info"
                  >
                    <strong>Edit</strong>
                  </Button>
                  <Button
                    bsStyle="danger"
                    onClick={() => this.deleteFunction({ id: func.id })}
                  >
                    <strong>Delete</strong>
                  </Button>
                </div>
              </div>
            )
          })}
        </ListGroup>
        <InputModal
          showModal={showModal}
          functions={functions}
          functionNames={functionNames}
          functionToEdit={functionToEdit}
          editOrAdd={editOrAdd}
          handleClose={this.handleClose}
          handleSubmit={editOrAdd === 'Edit' ? this.editFunction : this.addNewFunction }
        />
      </div>
    )
  }
}

export default FunctionsList

