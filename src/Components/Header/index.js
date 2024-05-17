import {Link, withRouter} from 'react-router-dom'

import {IoMdHome} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navContainer">
      <div className="headerContent">
        <div className="headerButtonsContainerMobile">
          <Link to="/" className="mobileLogoLink">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="mobileHeaderLogo"
              alt="website logo"
            />
          </Link>
          <ul className="mobileButtons">
            <li>
              <Link to="/" className="mobileHomeLink">
                {/* eslint-disable-next-line */}
                <button type="button" className="mobileHomeButton">
                  <IoMdHome />
                </button>
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="mobileJobLink">
                {/* eslint-disable-next-line */}
                <button type="button" className="mobileJobButton">
                  <BsBriefcaseFill />
                </button>
              </Link>
            </li>
            <li>
              {/* eslint-disable-next-line */}
              <button
                className="mobileLogoutButton"
                type="button"
                onClick={onClickLogout}
              >
                <FiLogOut />
              </button>
            </li>
          </ul>
        </div>

        <div className="desktopButtons">
          <Link to="/" className="desktopLogoLink">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="desktopHeaderLogo"
              alt="website logo"
            />
          </Link>
          <div className="menuButtons">
            <Link className="desktopHomeLink" to="/">
              <button className="desktopHomeButton" type="button">
                Home
              </button>
            </Link>

            <Link className="desktopJobLink" to="/jobs">
              <button className="desktopJobButton" type="button">
                Jobs
              </button>
            </Link>
          </div>

          <button
            className="desktopLogoutButton"
            type="button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
