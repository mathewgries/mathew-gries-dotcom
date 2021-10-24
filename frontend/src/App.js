import React from 'react'
import Routes from './Routes'
import { Footer } from './app/Footer'

import { TopNav } from './app/TopNav'

function App() {
  return (
    <div className="app-container">
      <nav className="nav-container">
        <TopNav />
      </nav>
      <section className="content-wrap">
        <Routes />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
