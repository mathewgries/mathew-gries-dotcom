import React, { useState, useEffect } from 'react'
import './style.css'

export const ChristmasLight = (props) => {
  const [power, setPower] = useState(props.mainPower)
  const [isActive, setIsActive] = useState(true)
  const [style, setStyle] = useState({
    id: 0,
    backgroundColor: props.colorWheel[0],
    boxShadow: 'none',
  })

  const { mainPower, colorWheel } = props

  useEffect(() => {
    if (power) {
      const nextId = isActive ? style.id + 1 : style.id - 1
      const arrLen = colorWheel.length

      if ((isActive && nextId < arrLen) || (!isActive && nextId >= 0)) {
        setTimeout(() => {
          setStyle({
            id: nextId,
            backgroundColor: colorWheel[nextId],
						boxShadow: `1px ${nextId+1}px ${nextId*2}px ${colorWheel[nextId]}`
          })
        }, 200)
      } else {
        setTimeout(() => {
          setIsActive(!isActive)
        }, 100 * getRandomInt(5))
      }
    } else if (!power && style.id !== 0) {
      setStyle({
        id: 0,
        backgroundColor: colorWheel[0],
        boxShadow: 'none',
      })
    }
  }, [power, style, isActive, colorWheel])

  if (power !== mainPower) {
    if (mainPower) {
      setTimeout(() => {
        setPower(!power)
      }, 500 * getRandomInt(9))
    } else {
      setPower(!power)
    }
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  return (
    <div className="christmas-light-container">
      <div className="light-top"></div>
      <div className="light-seperator"></div>
      <div
        className="light-bulb"
        style={{
          backgroundColor: style.backgroundColor,
          boxShadow: style.boxShadow,
        }}
      ></div>
    </div>
  )
}
