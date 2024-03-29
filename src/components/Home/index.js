import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="home_container">
    <Header />
    <div className="home_content">
      <div className="home_description">
        <h1 className="home_heading">Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="btn_find_jobs" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
