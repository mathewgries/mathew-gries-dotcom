import React from 'react'
import { BorderBox } from './BorderBox'
import { BorderForm } from './BorderForm'
import './style.css'

export const BorderPreview = () => {
  return (
    <div className="page-container border-preview">
      <section className="page-section">
        <header className="page-header">
          <h1>Border Preview</h1>
        </header>
        <div>
          <BorderBox />
        </div>
      </section>

      <section className="page-section">
        <BorderForm />
      </section>
    </div>
  )
}
