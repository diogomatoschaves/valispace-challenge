import React, { Component, Fragment } from 'react';
import './App.css';
import { Label , Button, ListGroupItem } from 'react-bootstrap'
import Form from './Form'
import FunctionsList from './FunctionsList'
import { Route, Switch, Link } from 'react-router-dom'
import { fetchFunctions } from './apiCalls'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      functions: {},
      showMessage: false,
      message: ''
    }
  }
  
  async componentDidMount() {
    const response = await fetchFunctions()

    if (response.functions && response.functions instanceof Array) {
      response.functions.forEach(func => {
        this.addFunction({ id: String(func.id), name: func.name, expression: func.expression })
      })
    }
  }

  addFunction = ({ id, name, expression }) => {
    this.setState((state) => {
      return {
        functions: {
          ...state.functions,
          [id]: {
            id,
            name,
            expression
          }
        }
      }
    })
  }
  
  updateFunction = ({ id, name, expression }) => {

    this.setState(state => {
      return {
        functions: Object.keys(state.functions).reduce((newState, funcId) => {
          return funcId === id ? {
            ...newState,
            [id]: {
              id,
              name,
              expression
            }
          } : {
            ...newState,
            [funcId]: state.functions[funcId]
          }
        }, {}),
      }
    })
  }

  delFunction = ({ id }) => {
    this.setState(state => {
      return {
        functions: Object.keys(state.functions).reduce((newState, funcId) => {
          return funcId === id ? newState : {
            ...newState,
            [funcId]: state.functions[funcId]
          }
        }, {}),
      }
    })
  }
  
  updateMessage = ({ message, bsStyle }) => {
    this.setState({
      showMessage: true,
      message,
      bsStyle
    })
    setTimeout(() => {
      this.setState({showMessage: false})
    }, 3000)
  }

  render() {

    const { functions, bsStyle, showMessage, message } = this.state

    return (
        <Route path="/" render={({ location }) => (
          <div className="app flex-column" style={{justifyContent: location.pathname == '/admin' && 'flex-start'}} >
            <Label className="title">Expresspace</Label>
            <Switch>
              <Route path="/" exact render={() => (
                <Form />
              )}/>
              <Route path="/admin" exact render={() => (
                <FunctionsList 
                  functions={functions} 
                  updateFunction={this.updateFunction} 
                  addFunction={this.addFunction}
                  updateMessage={this.updateMessage}
                  delFunction={this.delFunction}
                />
              )}/>

              <div className='flex-column' style={{fontSize: '2.0em'}}>
                <strong>404: Page not found...</strong>
                <Link to="/">
                  <Button style={{marginTop: '30px'}} bsSize="large" bsStyle="primary">Go to Main Page</Button>
                </Link>
              </div>
            </Switch>
            <ListGroupItem
              className='message-to-user flex-column'
              bsSize="large"
              bsStyle={bsStyle}
              style={{top: showMessage ? '60px' : '-200px'}}
            >
              {message}
            </ListGroupItem>
          </div>
        )}/>
    );
  }
}

export default App;
