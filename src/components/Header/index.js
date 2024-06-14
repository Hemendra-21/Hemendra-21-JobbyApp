import {Link, withRouter} from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="nav-content-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="home-nav-logo"
          />
        </Link>

        <ul className="home-nav-sections-container">
          <li className="section-name">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="section-name">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
          <li className="logout-button-small-media">
            <button
              type="button"
              data-testid="logoutButton"
              onClick={onClickLogout}
            >
              .<FiLogOut />
            </button>
          </li>
        </ul>

        <button
          type="button"
          className="logout-button-large-media"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
