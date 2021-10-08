import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <div className="main-links">
        <div className="nav-brand">
          <Link to="/">MG-DOTCOM</Link>
        </div>
        <div className="nav-links">
          <Link to="/projects">Projects</Link>
        </div>
      </div>
    </nav>
  )
}
