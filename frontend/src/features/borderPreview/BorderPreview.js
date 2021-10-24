import React from 'react'
import { BorderBox } from './BorderBox'
import { BorderForm } from './BorderForm'
import './style.css'

export const BorderPreview = () => {
  return (
    <div className="border-preview">
      <section className="bp-section">
        <header className="page-header">
          <h1>Border Preview</h1>
        </header>
        <div>
          <BorderBox />
        </div>
      </section>

      <section className="bp-section">
        <BorderForm />
      </section>
    </div>
  )
}
