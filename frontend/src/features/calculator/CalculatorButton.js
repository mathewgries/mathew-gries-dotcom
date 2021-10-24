import React from 'react'
import './style.css'

export const CalculatorButton = (props) => {
  const { disabled, id, className, text } = props

  const onClickHandler = (e) => {
    if (!disabled) {
      props.onClickHandler(e)
    }
  }
  return (
    <div
      id={id}
      className={`calc-button ${className}`}
      onClick={(e) => onClickHandler(e)}
    >
      {text}
    </div>
  )
}
