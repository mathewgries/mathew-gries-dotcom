import React from 'react'
import { ProjectsList } from './ProjectsList'
import villa_capri from '../images/villa_capri.jpeg'
import center_city_christmas from '../images/center_city_christmas.jpeg'
import './style.css'

export const Home = () => {
  return (
    <div className="page-container home">
      <section className="page-section home-intro">
        <header className="page-header">
          <h1>Mathew Gries...com</h1>
        </header>

        <div>
          <p>
            Welcome to my personal website! This is my playground to learn web
            design and development. This site is built using{' '}
            <u>
              <a href="https://beta.reactjs.org/">
                ReactJs
              </a>
            </u>{' '}
            for front end design, and{' '}
            <u>
              <a href="https://redux.js.org/">Redux</a>
            </u>{' '}
            for state management.
          </p>
        </div>

        <div>
          <p>
            I was born in the northern suburbs of Philadelphia, Pennsylvania in
            1982. I currenty reside in West Philadelphia, in a section known as
            University City.
          </p>
        </div>

        <div>
          <p>
            My career in tech started in my early 30's. I first worked for an
            EMR (Electronic Medical Records) company, NextGen Healthcare, as an
            Application Support Specialist. I moved on to a Development Support
            role for Temenos where I would debug and update application code for
            a collections app. My next position was back to Application Support
            for a company called FreedomPay, which is also what brought me to
            live in the city limits of Philadelphia. At this time, I currently
            work for a company called Lightbeam Health, where I work as a Claims
            Interface Specialist.
          </p>
        </div>

        <div>
          <p>
            My hobbies include, obviously, web deisign and development,
            snowboarding (it's been a while), playing, writing, and recording
            music, playing video games, and watching my shows
          </p>
        </div>
      </section>

      <section>
        <ProjectsList />
      </section>

      <section className="page-section home-images">
        <div className="home-img-container">
          <img src={villa_capri} className="home-img" alt="villa_capri" />
        </div>
        <div className="home-img-container">
          <img src={center_city_christmas} className="home-img" alt="christmas_down_town"/>
        </div>
      </section>
    </div>
  )
}
