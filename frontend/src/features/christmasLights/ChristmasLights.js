import React, { useState } from 'react'
import { ChristmasLight } from './ChristmasLight'
import { redHex, orangeHex, blueHex, greenHex, magentaHex } from './colorLists'
import './style.css'

export const ChristmasLights = () => {
  const [power, setPower] = useState(false)

  const handlePowerClick = () => {
    setPower(!power)
  }

  return (
    <div className="christmas-lights">
      <section className="christmas-lights-section">
        <div>
          <ChristmasLight colorWheel={redHex} mainPower={power} />
        </div>
        <div>
          <ChristmasLight
            colorWheel={orangeHex}
            mainPower={power}
          />
        </div>
        <div>
          <ChristmasLight
            colorWheel={blueHex}
            mainPower={power}
          />
        </div>
        <div>
          <ChristmasLight
            colorWheel={greenHex}
            mainPower={power}
          />
        </div>
        <div>
          <ChristmasLight colorWheel={redHex} mainPower={power} startTime={5} />
        </div>
        <div>
          <ChristmasLight
            colorWheel={magentaHex}
            mainPower={power}
          />
        </div>
        <div>
          <ChristmasLight
            colorWheel={blueHex}
            mainPower={power}
          />
        </div>
      </section>

      <section className="cl-power-switch-wrapper">
        <button onClick={handlePowerClick} className="power-btn">
          {!power ? 'ON' : 'OFF'}
        </button>
      </section>
    </div>
  )
}
