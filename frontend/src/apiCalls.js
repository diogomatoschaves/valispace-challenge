/**
 * Created by diogomatoschaves on 26/11/2018.
 */

export const fetchFunctions = async () => {

  const headers = new Headers()
  
  const url = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEVELOPMENT 
    : process.env.REACT_APP_API_URL_PRODUCTION}/fetch_functions`;

  const response = await fetch(url, {
    method: 'get',
    headers,
  })
  
  if(response.status >= 400) {
    throw(new Error('Error fetching functions'))
  } else {
    return await response.json()
  }
}

export const addFunctionAsync = async (body) => {
  
  const headers = new Headers()
    
  const url = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEVELOPMENT 
    : process.env.REACT_APP_API_URL_PRODUCTION}/new_function`;
     
  const response = await fetch(url, {
    method: 'post',
    headers,
    body
  })
      
  if (response.status >= 400) {
    throw(new Error('Error sending request'))
  } else {
    return await response.json()
  }
}

export const editFunctionAsync = async (body) => {
  
  const headers = new Headers()
    
  const url = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEVELOPMENT 
    : process.env.REACT_APP_API_URL_PRODUCTION}/edit_function`;
     
  const response = await fetch(url, {
    method: 'post',
    headers,
    body
  })
      
  if (response.status >= 400) {
    throw(new Error('Error editing function'))
  } else {
    return await response.json()
  }
}

export const deleteFunctionAsync = async ({ id }) => {

  const headers = new Headers()

  const url = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEVELOPMENT 
    : process.env.REACT_APP_API_URL_PRODUCTION}/delete_function?id=${id}`;

  const response = await fetch(url, {
    method: 'get',
    headers,
  })
  
  if (response.status >= 400) {
    throw(new Error('Error deleting function'))
  } else {
    return await response.json()
  }
    
}

export const performNewCalculation = async (body) => {
  
  const headers = new Headers()
    
  const url = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEVELOPMENT 
    : process.env.REACT_APP_API_URL_PRODUCTION}/new_calculation`;
     
  const response = await fetch(url, {
    method: 'post',
    headers,
    body
  })
      
  if (response.status >= 400) {
    throw(new Error('Error sending request'))
  } else {
    return await response.json()
  }
}



