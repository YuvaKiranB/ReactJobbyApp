import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="homeContainer">
        <div className="homeContent">
          <div className="descriptionContainer">
            <h1 className="homeHeading">Find The Job That Fits Your Life</h1>
            <p className="homePara">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>

            <Link className="findJobsLink" to="/jobs">
              <button type="button" className="findJobsButton">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
