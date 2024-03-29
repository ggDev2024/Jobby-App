import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordInput = () => (
    <>
      <div className="login_input_container">
        <label className="login_heading" htmlFor="password">
          PASSWORD
        </label>
        <input
          onChange={this.onChangePassword}
          className="user_input"
          id="password"
          type="password"
          placeholder="Password"
        />
      </div>
    </>
  )

  renderUsernameInput = () => (
    <div className="login_input_container">
      <label className="login_heading" htmlFor="username">
        USERNAME
      </label>
      <input
        onChange={this.onChangeUsername}
        className="user_input"
        id="username"
        type="text"
        placeholder="Username"
      />
    </div>
  )

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  handleSubmit = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const url = 'https://apis.ccbp.in/login'

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="container">
        <form className="form_container" onSubmit={this.handleSubmit}>
          <img
            className="website_logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          {this.renderUsernameInput()}
          {this.renderPasswordInput()}
          <button className="login_button" type="submit">
            Login
          </button>
          {showSubmitError && <p className="error_msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
