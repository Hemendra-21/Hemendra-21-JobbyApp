import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onClickHeaderLogout = () => {
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
            className="header-logo"
          />
        </Link>

        <ul className="header-sections-container-lg">
          <li className="header-section-name-lg">
            <Link to="/" className="header-section-nav-link">
              Home
            </Link>
          </li>

          <li className="header-section-name-lg">
            <Link to="/jobs" className="header-section-nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="header-logoutBtn"
          onClick={onClickHeaderLogout}
        >
          Logout
        </button>

        <ul className="header-sections-container-sm">
          <li className="header-section-logo-sm">
            <Link to="/" className="header-section-nav-link">
              <AiFillHome />
            </Link>
          </li>

          <li className="header-section-logo-sm">
            <Link to="/jobs" className="header-section-nav-link">
              <BsBriefcaseFill />
            </Link>
          </li>

          <li
            className="header-section-logoutBtn-sm"
            onClick={onClickHeaderLogout}
          >
            <FiLogOut />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
