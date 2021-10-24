import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateBinValue,
  updateDecValue,
  selectBinValue,
  selectDecValue,
} from './converterSlice'
import './style.css'

export const ConverterPage = () => {
  const dispatch = useDispatch()
  const binValue = useSelector(selectBinValue)
  const decValue = useSelector(selectDecValue)

  let maxLength = binValue.length === 8

  const handleInputUpdate = (e) => {
    const { value } = e.target
    const { inputType } = e.nativeEvent

    if (!maxLength || inputType === 'deleteContentBackward') {
      for (let i = 0; i < value.length; i++) {
        const num = value.charAt(i)
        if (num !== '0' && num !== '1') {
          alert('Enter 1 or 0')
          return
        }
      }
      dispatch(updateBinValue(value))
    }
  }

  const caluclateDecimalvalue = (binValue, pos) => {
    const bin = parseFloat(binValue)
    return bin * Math.pow(2, pos)
  }

  const getAnswer = (binValue) => {
    let result = 0
    for (let i = 0; i < binValue.length; i++) {
      const pos = binValue.length - i - 1
      result += caluclateDecimalvalue(binValue.charAt(i), pos)
    }
    dispatch(updateDecValue(result))
  }

  const clearFields = (e) => {
    e.preventDefault()
    dispatch(updateBinValue(''))
    dispatch(updateDecValue(0))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getAnswer(binValue)
  }

  return (
    <div className="page-container converter">
      <section className="page-section">
        <header className="page-header">
          <h1>Convert Binary To Decimal</h1>
        </header>

        <div>
          <p>
            Enter any series of 1s and 0s, up to 8 digits, and click the Convert
            button to display the decimal value.
          </p>
        </div>
        <div>
          <p className="binary-link">
            <a href="https://en.wikipedia.org/wiki/Binary_number">
              Click here to learn more about binary
            </a>
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="converter-form-container">
          <form onSubmit={handleSubmit}>
            <div className="converter-form-group">
              <input
                className="binary-input converter-input"
                autoFocus={true}
                type="text"
                value={binValue}
                onChange={handleInputUpdate}
              />
            </div>
            <div className="converter-form-group">
              Results:{' '}
              <input
                className="converter-input"
                type="text"
                value={decValue}
                readOnly
              />
            </div>
            <div className="converter-button-container">
              <button className="converter-button" type="submit">
                Convert
              </button>
              <button
                className="converter-button"
                type="input"
                onClick={clearFields}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
