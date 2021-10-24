import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = (props) => {
  const { path, title, text, url } = props
  return (
    <div className="project-list-item">
      <Link to={`/${path}`}>
        <div>
          <h3>{title}</h3>
        </div>
        <div>
          <p>{text}</p>
        </div>
        <div>
          <p>{url}</p>
        </div>
      </Link>
    </div>
  )
}

export const ProjectsList = () => {
  return (
    <div className="page-container projects">
      <section className="page-section">
        <header className="page-header">
          <h1>
            <u>My Projects</u>
          </h1>
        </header>
        <div className="projects-list">
          <div className="project-list-item-container">
            <ListItem
              path={'bin2dec'}
              title={'Binary to Decimal'}
              text={'Enter binary values and cover them to decimal values'}
              url={'https://www.mathewgries.com/bin2dec'}
            />
          </div>
          <div className="project-list-item-container">
            <ListItem
              path={'border-preview'}
              title={'Border Preview'}
              text={'Shows the effects of border-radius css in real time'}
              url={'https://www.mathewgries.com/border-preview'}
            />
          </div>
          <div className="project-list-item-container">
            <ListItem
              path={'calculator'}
              title={'Calculator'}
              text={'A calculator designed after the iPhone calculator'}
              url={'https://www.mathewgries.com/calculator'}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
