import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const onClickLogo = () => {
    const {history} = props
    history.push('/')
  }

  return (
    <div className="nav_container">
      <Link to="/" className="logo_img">
        <img
          className="logo_img_mob"
          onClick={onClickLogo}
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="path_container">
        <Link to="/" className="non_hyperlink_style">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="non_hyperlink_style">
          <li>Jobs</li>
        </Link>
      </ul>

      <button onClick={onClickLogout} className="logout_button" type="button">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
