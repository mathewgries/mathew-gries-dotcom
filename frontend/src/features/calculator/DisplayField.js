import React from 'react'
import './style.css'

export const DisplayField = (props) => {
  return (
    <div className="display-container">
      <input value={props.value} className="display-field" readOnly />
    </div>
  )
}
