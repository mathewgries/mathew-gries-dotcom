import React from 'react'
import { useSelector } from 'react-redux'
import './style.css'

const CssLine = ({ name, value }) => {
  return <div>{`${name}: ${value};`}</div>
}

const VisualCSS = (props) => {
  const { styles } = props

  return (
    <section className='bp-visualize-css'>
      <div>{`style {`}</div>
      <div className='bp-css-values'>
        {Object.keys(styles).map((key) => (
          <CssLine key={key} name={key} value={styles[key]} />
        ))}
      </div>
      <div>{`}`}</div>
    </section>
  )
}

export const BorderBox = () => {
  const styles = useSelector((state) => state.borderPreview)
  const formattedStyles = {}

  for (let style in styles) {
    formattedStyles[style] = styles[style].value + '%'
  }

  return (
    <div style={formattedStyles} className="bp-box">
      <VisualCSS styles={formattedStyles} />
    </div>
  )
}
