import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = (props) => {
  const { path, text } = props
  return (
    <div className='project-list-item-container'>
      <Link to={`/${path}`} className="project-list-item">
        {text}
      </Link>
    </div>
  )
}

export const Projects = (props) => {
  return (
    <div className="page-container projects">
			<header>
				<h1>Projects</h1>
			</header>
      <div className="project-list">
        <ListItem path={'bin2dec'} text={'Binary to Decimal'} />
        <ListItem path={'border-preview'} text={'Border Preview'} />
        <ListItem path={'calculator'} text={'Calculator'} />
      </div>
    </div>
  )
}
