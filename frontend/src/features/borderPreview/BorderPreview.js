import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateRadius } from './borderPreviewSlice'
import './style.css'

const FormInput = (props) => {
  const { label, text, name, value, inputChange } = props

  const handleOnChange = ({ target }) => {
    inputChange(target)
  }

  return (
    <section className="input-group">
      <label>{label}</label>
      <div>
        <input
          type={text}
          name={name}
          value={value}
          onChange={(e) => handleOnChange(e)}
        />
        <span>%</span>
      </div>
    </section>
  )
}

const StylePreview = ({ styles }) => {
  let renderCSSFormat = 'style {\n'
  for (let style in styles) {
    renderCSSFormat += `\t${styles[style].str}: ${styles[style].value}%;\n`
  }
  renderCSSFormat += '}'

  return (
    <div>
      <pre>{renderCSSFormat}</pre>
    </div>
  )
}

export const BorderPreview = () => {
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

  const renderBorderBox = () => {
    const formattedStyles = {}

    for (let style in styles) {
      formattedStyles[style] = styles[style].value + '%'
    }

    return (
      <div style={formattedStyles} className="border-box">
        <div className="style-preview">
          <StylePreview styles={styles} />
        </div>
      </div>
    )
  }

  const renderForm = () => {
    return (
      <section className="form-container">
        <form>
          <div>
            <FormInput
              label={'Top-Left'}
              type={'text'}
              name={'borderTopLeftRadius'}
              value={styles.borderTopLeftRadius.value}
              inputChange={handleInputChange}
            />
          </div>
          <div>
            <FormInput
              label={'Top-Right'}
              type={'text'}
              name={'borderTopRightRadius'}
              value={styles.borderTopRightRadius.value}
              inputChange={handleInputChange}
            />
          </div>
          <div>
            <FormInput
              label={'Bottom-Left'}
              type={'text'}
              name={'borderBottomLeftRadius'}
              value={styles.borderBottomLeftRadius.value}
              inputChange={handleInputChange}
            />
          </div>
          <div>
            <FormInput
              label={'Bottom-Right'}
              type={'text'}
              name={'borderBottomRightRadius'}
              value={styles.borderBottomRightRadius.value}
              inputChange={handleInputChange}
            />
          </div>
        </form>
      </section>
    )
  }

  return (
    <section className="page-container border-preview">
      <header>
        <h1>Border Preview</h1>
      </header>
      <div className='page-content'>
        {renderBorderBox()}
        {renderForm()}
      </div>
    </section>
  )
}
