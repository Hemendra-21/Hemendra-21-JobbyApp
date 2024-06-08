import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {wdxjwn} = props

  const onclickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <div className="nav-content-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website-logo"
            className="home-nav-logo"
          />
        </Link>

        <ul className="home-nav-sections-container">
          <Link to="/" className="nav-link">
            <li className="section-name">Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li className="section-name">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-button" onClick={onclickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
