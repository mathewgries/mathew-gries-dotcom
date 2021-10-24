import React from 'react'
import { numberFromId } from './helper'
import runOperations from '../../helpers/runOperations'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateQueuedOperation,
  updateLastAction,
  updateActiveId,
  updateFirstValue,
  updateSecondValue,
  updateDisplayValue,
  resetAll,
} from './calculatorSlice'
import { CalculatorButton } from './CalculatorButton'
import './style.css'

export const CalculatorPage = () => {
  const dispatch = useDispatch()
  const actionsList = {
    number: 'number',
    operator: 'operator',
    equals: 'equals',
  }
  const lastAction = useSelector((state) => state.calculator.lastAction)
  const activeId = useSelector((state) => state.calculator.activeId)
  const firstValue = useSelector((state) => state.calculator.firstValue)
  const secondValue = useSelector((state) => state.calculator.secondValue)
  const displayValue = useSelector((state) => state.calculator.displayValue)
  const queuedOperation = useSelector(
    (state) => state.calculator.queuedOperation
  )

  const disableNumbers = displayValue.length === 8

  //==========================================================================//

  const onClickHandler = ({ target }) => {
    const { id, classList } = target
    const btn = classList.value.substring('calc-button'.length + 1)

    if (btn === 'number') handleNumberClick(numberFromId(id))
    if (btn === 'sign') handleSignClick(id)
    if (btn === 'all-clear') handleAllClearClick()
    if (btn === 'clear') handleClearClick()
    if (btn === 'decimal') handleDecimalClick()

    if (btn === 'operator') {
      if (id === 'equal') {
        handleEqualsClick()
      } else {
        handleOperatorClick(id)
      }
    }
  }

  //==========================================================================//

  const handleNumberClick = (number) => {
    let nextValue

    if (displayValue === '0') {
      if (number === '0') {
        return
      }
      nextValue = number
    } else if (lastAction === actionsList.equals) {
      nextValue = number
      dispatch(resetAll())
    } else if (lastAction === actionsList.operator) {
      nextValue = number
      dispatch(updateFirstValue(displayValue))
    } else {
      if (
        displayValue.includes('.') &&
        displayValue.length - displayValue.indexOf('.') - 1 === 3
      ) {
        return
      }
      nextValue = `${displayValue}${number}`
    }

    if (lastAction !== actionsList.number) {
      dispatch(updateLastAction(actionsList.number))
    }

    if (activeId) {
      handleActiveId()
    }
    dispatch(updateDisplayValue(nextValue))
  }

  //==========================================================================//

  const handleOperatorClick = (operator) => {
    if (lastAction) {
      if (lastAction === actionsList.operator) {
        if (queuedOperation === operator) {
          return
        } else {
          handleActiveId(operator)
          dispatch(updateQueuedOperation(operator))
          return
        }
      }

      if (lastAction === actionsList.equals) {
        dispatch(updateFirstValue(displayValue))
      }

      if (lastAction === actionsList.number) {
        if (!queuedOperation) {
          dispatch(updateFirstValue(displayValue))
        } else {
          const result = runOperations(
            queuedOperation,
            firstValue,
            displayValue
          )
          dispatch(updateDisplayValue(result))
        }
      }

      if (queuedOperation !== operator) {
        dispatch(updateQueuedOperation(operator))
      }
      handleActiveId(operator)
      dispatch(updateLastAction(actionsList.operator))
    }
  }

  //==========================================================================//

  const handleEqualsClick = () => {
    let result

    if (lastAction && queuedOperation) {
      if (lastAction !== actionsList.equals) {
        dispatch(updateSecondValue(displayValue))
        result = runOperations(queuedOperation, firstValue, displayValue)
      } else {
        result = runOperations(queuedOperation, displayValue, secondValue)
      }

      if (lastAction !== actionsList.equals) {
        dispatch(updateLastAction(actionsList.equals))
      }

      if (activeId) {
        handleActiveId()
      }
      dispatch(updateDisplayValue(result))
    }
  }

  //==========================================================================//

  const handleSignClick = (sign) => {
    let result
    if (displayValue.indexOf('-') > -1) {
      result = displayValue.substring(1)
    } else {
      result = `-${displayValue}`
    }
    dispatch(updateDisplayValue(result))
  }

  //==========================================================================//

  const handleDecimalClick = () => {
    let result
    if (lastAction === actionsList.equals) {
      result = '0.'
      dispatch(resetAll())
    } else if (lastAction === actionsList.operator) {
      result = '0.'
    } else if (!displayValue.includes('.')) {
      result = `${displayValue}.`
    }

    if (result) {
      dispatch(updateDisplayValue(result))
      if (lastAction !== actionsList.number) {
        dispatch(updateLastAction(actionsList.number))
      }

      if (activeId) {
        handleActiveId()
      }
    }
  }

  //==========================================================================//

  const handleClearClick = () => {
    if (lastAction === actionsList.number) {
      dispatch(updateDisplayValue('0'))
    }
  }

  //==========================================================================//

  const handleAllClearClick = () => {
    if (lastAction || displayValue !== '0') {
      handleActiveId()
      dispatch(resetAll())
    }
  }

  //==========================================================================//

  const handleActiveId = (id) => {
    if (activeId) {
      document.getElementById(activeId).classList.remove('active')
    }
    if (id) {
      document.getElementById(id).classList.add('active')
      dispatch(updateActiveId(id))
    } else if (activeId && !id) {
      dispatch(updateActiveId(null))
    }
  }
  //==========================================================================//

  return (
    <div className="calculator">
      <section className="page-header">
        <header>
          <h1>Calculator</h1>
        </header>
      </section>

      <section className="calc-wrapper">
        <section className="calc-display-field-wrapper">
          <input value={displayValue} className="calc-display-field" readOnly />
        </section>

        <section className="calc-button-row">
          <div className="calc-button-wrapper">
            <CalculatorButton
              text={'AC'}
              id={'all-clear'}
              className={'all-clear'}
              onClickHandler={onClickHandler}
              isActive
            />
          </div>
          <div className="calc-button-wrapper">
            <CalculatorButton
              text={'C'}
              id={'clear'}
              className={'clear'}
              onClickHandler={onClickHandler}
            />
          </div>
          <div className="calc-button-wrapper">
            <CalculatorButton
              text={'+/-'}
              id={'sign'}
              className={'sign'}
              onClickHandler={onClickHandler}
            />
          </div>
          <div className="calc-button-wrapper">
            <CalculatorButton
              text={'\u00F7'}
              id={'divide'}
              className={'operator'}
              onClickHandler={onClickHandler}
            />
          </div>
        </section>

        <section className="calc-button-row">
          <div className="calc-button-wrapper">
            <CalculatorButton
              text={'7'}
              id={'seven'}
              className={'number'}
              disabled={disableNumbers}
              onClickHandler={onClickHandler}
            />
          </div>
          <div className="calc-button-wrapper">
            <CalculatorButton
              text={'8'}
              id={'eight'}
              className={'number'}
              disabled={disableNumbers}
              onClickHandler={onClickHandler}
            />
          </div>
          <div className="calc-button-wrapper">
            <CalculatorButton
              text={'9'}
              id={'nine'}
              className={'number'}
              disabled={disableNumbers}
              onClickHandler={onClickHandler}
            />
          </div>
          <div className="calc-button-wrapper">
            <CalculatorButton
              text={'x'}
              id={'multiply'}
              className={'operator'}
              onClickHandler={onClickHandler}
            />
          </div>
        </section>

        <section className="calc-button-row">
          <div className="calc-button-wrapper">
            <CalculatorButton
              text={'4'}
              id={'four'}
              className={'number'}
              disabled={disableNumbers}
              onClickHandler={onClickHandler}
            />
          </div>
          <div className="calc-button-wrapper">
            <CalculatorButton
              text={'5'}
              id={'five'}
              className={'number'}
              disabled={disableNumbers}
              onClickHandler={onClickHandler}
            />
          </div>
          <div className="calc-button-wrapper">
            <CalculatorButton
              text={'6'}
              id={'six'}
              className={'number'}
              disabled={disableNumbers}
              onClickHandler={onClickHandler}
            />
          </div>
          <div className="calc-button-wrapper">
            <CalculatorButton
              text={'-'}
              id={'subtract'}
              className={'operator'}
              onClickHandler={onClickHandler}
            />
          </div>
        </section>

        <section className="calc-button-row">
          <div className="calc-button-wrapper">
            <CalculatorButton
              text={'1'}
              id={'one'}
              className={'number'}
              disabled={disableNumbers}
              onClickHandler={onClickHandler}
            />
          </div>
          <div className="calc-button-wrapper">
            <CalculatorButton
              text={'2'}
              id={'two'}
              className={'number'}
              disabled={disableNumbers}
              onClickHandler={onClickHandler}
            />
          </div>
          <div className="calc-button-wrapper">
            <CalculatorButton
              text={'3'}
              id={'three'}
              className={'number'}
              disabled={disableNumbers}
              onClickHandler={onClickHandler}
            />
          </div>
          <div className="calc-button-wrapper">
            <CalculatorButton
              text={'+'}
              id={'add'}
              className={'operator'}
              onClickHandler={onClickHandler}
            />
          </div>
        </section>

        <section className="calc-button-row">
          <div className="calc-button-wrapper zero-btn-wrapper">
            <CalculatorButton
              text={'0'}
              id={'zero'}
              className={'number'}
              disabled={disableNumbers}
              onClickHandler={onClickHandler}
            />
          </div>
          <div className="calc-button-wrapper">
            <CalculatorButton
              text={'.'}
              id={'decimal'}
              className={'decimal'}
              disabled={disableNumbers}
              onClickHandler={onClickHandler}
            />
          </div>
          <div className="calc-button-wrapper">
            <CalculatorButton
              text={'='}
              id={'equal'}
              className={'operator'}
              onClickHandler={onClickHandler}
            />
          </div>
        </section>
      </section>
    </div>
  )
}
