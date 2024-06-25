import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header/index'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Header />
      <div className="home-page-container">
        <div className="homePage-content">
          <h1 className="homePage-heading">
            Find The Job That <br />
            Fits Your Life
          </h1>
          <p className="homePage-description">
            Millions of people are searching for jobs,salary
            <br />
            information,company reviews.Find the job that fits your
            <br /> abilities and potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="find-jobs-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
