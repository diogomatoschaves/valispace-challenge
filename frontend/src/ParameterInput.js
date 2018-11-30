/**
 * Created by diogomatoschaves on 29/11/2018.
 */

import React, { Component } from 'react'
import { FormControl, Label, Glyphicon } from 'react-bootstrap'



const ParameterInput = ({ paramFunc, paramFuncString, paramIntString, paramInt, functionName,
        handleChange, typeResults, changeState, paramResultsString, onBlur }) => {

    return (
      <div className="flex-row" style={{justifyContent: 'flex-start'}}>
        {paramFunc ? (
          <Label className="flex-row" style={{fontSize: '1.2em', whiteSpace: 'nowrap'}}>
            {functionName}
            <div
              style={{width: '20px', height: '20px', borderRadius: '10px', backgroundColor: 'black', cursor: 'pointer', marginLeft: '5px'}}
              onClick={(e) => changeState(e, {[paramFuncString]: null})}
            >
              <Glyphicon style={{fontSize: '0.8em'}} glyph="remove"/>
            </div>
          </Label>
        ) : (
          <div className="flex-column" style={{position: 'relative'}}>
            <FormControl
              name={paramIntString}
              onChange={handleChange}
              onBlur={(e) => onBlur(e, paramResultsString)}
              value={paramInt}
              type="text"
              placeholder="Function or integer"
            />
            {typeResults.length > 0 && (
              <div
                className="flex-column"
                style={{position: 'absolute', top: '35px', backgroundColor: 'white', width: '100%', cursor: 'pointer',
                alignItems: 'flex-start', border: '1px solid rgb(200, 200, 200)', borderRadius: '4px'}}
              >
                {typeResults.map((func) => {
                  return (
                    <div
                      key={func.id}
                      style={{minHeight: '20px', padding: '10px', borderBottom: '1px solid rgb(200, 200, 200)', width: '100%'}}
                      onClick={(e) => changeState(e, {[paramFuncString]: String(func.id), [paramIntString]: null})}
                    >
                      <Label>{func.name}</Label>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    )
}

export default ParameterInput