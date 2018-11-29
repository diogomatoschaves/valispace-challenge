/**
 * Created by diogomatoschaves on 24/11/2018.
 */


import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Button, ButtonGroup, Well } from 'react-bootstrap'
import { editFunctionAsync, addFunctionAsync, deleteFunctionAsync } from './apiCalls'
import InputModal  from './InputModal'


class TranslationsList extends Component {

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
    this.setState({ showModal: false })
  }

  openModal = ({ editOrAdd, id }) => {

    const { functions } = this.props

    this.setState({
      showModal: true,
      editOrAdd,
      functionToEdit: editOrAdd === 'Edit' ? functions[id] : {id: null, name: '', expression: ''}
    })
  }

  editFunction = async ({ id, name, expression }) => {
    
    const { updateFunction, updateMessage } = this.props

    this.handleClose()
    
    const response = await editFunctionAsync(JSON.stringify({ id, name, expression }))

    if (response.success) {
      updateFunction({ id, name, expression })
      updateMessage({ message: 'The changes were saved.', bsStyle: 'success'})
    } else {
      updateMessage({ message: 'There was an error processing your request.', bsStyle: 'danger'})
    }
  }
  
  addNewFunction = async ({ name, expression }) => {
    const { addFunction, updateMessage } = this.props

    this.handleClose()

    const response = await addFunctionAsync(JSON.stringify({ name, expression }))

    if (response.success) {
      addFunction({ id: response.newFunction.id, name, expression })
      updateMessage({ message: 'The function was added.', bsStyle: 'success'})
    } else {
      updateMessage({ message: 'There was an error processing your request.', bsStyle: 'danger'})
    }
  }

  deleteFunction = async ({ id }) => {

    const { delFunction, updateMessage } = this.props

    const response = await deleteFunctionAsync({ id })

    if (response.success) {
      delFunction({ id })
      updateMessage({ message: 'The function was deleted.', bsStyle: 'success'})
    } else {
      updateMessage({ message: 'There was an error processing your request.', bsStyle: 'danger'})
    }
  }

  getFormattedDate = (timeStamp) => {

    let difference = Date.now() - timeStamp;
    const daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24;

    const hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60;

    const minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60;

    const secondsDifference = Math.floor(difference/1000);

    return daysDifference >= 1 ? `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago` :
        hoursDifference >= 1 ? `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago` :
            minutesDifference >= 1 ? `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago` :
                `${secondsDifference} ${secondsDifference === 1 ? 'second' : 'seconds'} ago`

  };
  
  render() {

    const { functions, styleOptions } = this.props
    const { showModal, editOrAdd, functionToEdit } = this.state

    const functionsArray = functions ? Object.keys(functions).map(key => functions[key]) : []
    
    return (
      <div className="flex-column" style={{width: '80%', maxWidth: '850px', justifyContent: 'flex-start'}}>
        <div className="flex-row" style={{justifyContent: 'space-between', width: '100%'}}>
          <div
            className="flex-row"
            style={{ width: '77%', justifyContent: 'space-around', fontSize: '1.3em',
            fontWeight: 700, padding: '20px'}}
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
                  style={{padding: 0, width: '77%', }}
                  className="flex-column func-item"
                >
                  <div className="flex-column" style={{width: '100%', padding: '20px'}}>
                    <div className='flex-row' style={{width: '100%', justifyContent: 'space-around'}}>
                      <div style={{width: '30%', textAlign: 'center'}} className="message-header">{func.name}</div>
                      <div style={{width: '30%', textAlign: 'center'}}>{func.expression}</div>
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
          functionToEdit={functionToEdit}
          editOrAdd={editOrAdd}
          handleClose={this.handleClose}
          handleSubmit={editOrAdd === 'Edit' ? this.editFunction : this.addNewFunction }
        />
      </div>
    )
  }
}

export default TranslationsList

