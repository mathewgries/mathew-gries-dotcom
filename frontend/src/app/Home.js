import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export const Home = (props) => {
  return (
    <div className="page-container home">
			<section>
			<header>
				<h1>Mathew Gries DOTCOM</h1>
			</header>
			</section>
			<section>
				<div className="welcome-paragraph"> 
					<p>Welcome to mathewgries.com. This site was built to showcase various projects and for learning web design.
						This page is still in the early stages of layout design, so it might look a bit rough around the edges at
						the moment.
					</p>
				</div>
			</section>
    </div>
  )
}
