import React, { Component, Fragment } from 'react';
import './App.css';
import { Label , Button, ListGroupItem } from 'react-bootstrap'
import Calculate from './Calculate'
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
        this.addFunction({
          id: String(func.id),
          name: func.name,
          operator: func.operator,
          firstParamInt: func.first_parameter_int,
          firstParamFunc: func.first_parameter_func_id,
          secondParamInt: func.second_parameter_int,
          secondParamFunc: func.second_parameter_func_id,
        })
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {

    const { functions } = this.state

    if (prevState.functions !== functions) {
      this.setState((state) => {
        return {
          ...state,
          functionNames: Object.keys(state.functions).map(key => state.functions[key].name)
        }
      })
    }
  }

  addFunction = ({ id, name, operator, firstParamInt, firstParamFunc, secondParamInt, secondParamFunc }) => {
    this.setState((state) => {
      return {
        functions: {
          ...state.functions,
          [id]: {
            id,
            name,
            operator,
            firstParamInt,
            firstParamFunc,
            secondParamInt,
            secondParamFunc
          }
        }
      }
    })
  }
  
  updateFunction = ({ id, name, operator, firstParamInt, firstParamFunc, secondParamInt, secondParamFunc }) => {
    this.setState(state => {
      return {
        functions: Object.keys(state.functions).reduce((newState, funcId) => {
          return funcId === id ? {
            ...newState,
            [id]: {
              id,
              name,
              operator,
              firstParamInt,
              firstParamFunc,
              secondParamInt,
              secondParamFunc
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

    const { functions, functionNames, bsStyle, showMessage, message } = this.state

    return (
        <Route path="/" render={({ location }) => (
          <div className="app flex-column" style={{justifyContent: location.pathname === '/admin' && 'flex-start'}} >
            <div className="title flex-row" style={{justifyContent: 'space-between'}}>
              <div style={{marginLeft: '10px', fontSize: '1.2em', color: 'white', fontWeight: '800'}}>ExpresSpace</div>
              <div
                className="flex-row"
                style={{marginRight: '20px', width: '15%', justifyContent: 'space-between',
                color: 'white', textDecoration: 'underline', fontWeight: '700'}}
              >
                <Link to='/admin' style={{ cursor: 'pointer'}}>Admin</Link>
                <Link to='/' style={{ cursor: 'pointer'}}>Calculate</Link>
              </div>
            </div>
            <Switch>
              <Route path="/" exact render={() => (
                <Calculate 
                  functions={functions}
                  updateMessage={this.updateMessage}
                />
              )}/>
              <Route path="/admin" exact render={() => (
                <FunctionsList 
                  functions={functions} 
                  functionNames={functionNames}
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
