import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateRadius } from './borderPreviewSlice'
import './style.css'

const FormInput = (props) => {
  const { label, name, value, inputChange } = props

  const handleOnChange = ({ target }) => {
    inputChange(target)
  }

  return (
    <section className="bp-form-group">
      <div className="bp-form-group-label">
        <label>{label}</label>
      </div>
      <div className="bp-form-group-input">
        <input
          className="bp-input"
          type="text"
          name={name}
          value={value}
          onChange={(e) => handleOnChange(e)}
        />
        <span className="bp-percent-sign">%</span>
      </div>
    </section>
  )
}

export const BorderForm = () => {
  const dispatch = useDispatch()
  const styles = useSelector((state) => state.borderPreview)

  const handleInputChange = ({ name, value }) => {
    if (value.length > 1 && value.charAt(0) === '0') {
      value = value.substring(1)
    }

    if (value === '') {
      value = '0'
    }

    dispatch(updateRadius({ name, value }))
  }

  return (
    <section className="bp-form-container">
      <div className='bp-input-wrapper'>
        <FormInput
          label={'Top-Left'}
          name={'borderTopLeftRadius'}
          value={styles.borderTopLeftRadius.value}
          inputChange={handleInputChange}
        />
      </div>
      <div className='bp-input-wrapper'>
        <FormInput
          label={'Top-Right'}
          name={'borderTopRightRadius'}
          value={styles.borderTopRightRadius.value}
          inputChange={handleInputChange}
        />
      </div>
      <div className='bp-input-wrapper'>
        <FormInput
          label={'Bottom-Left'}
          name={'borderBottomLeftRadius'}
          value={styles.borderBottomLeftRadius.value}
          inputChange={handleInputChange}
        />
      </div>
      <div className='bp-input-wrapper'>
        <FormInput
          label={'Bottom-Right'}
          name={'borderBottomRightRadius'}
          value={styles.borderBottomRightRadius.value}
          inputChange={handleInputChange}
        />
      </div>
    </section>
  )
}
