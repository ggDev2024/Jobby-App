import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
    checked: false,
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
    checked: false,
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
    checked: false,
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
    checked: false,
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class FilterGroup extends Component {
  state = {
    profile: {},
    profileApiStatus: '',
    checkboxInputs: [],
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const displayProfileDetails = {
        name: profileDetails.name,
        profileImage: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }

      console.log(response.ok)

      this.setState({
        profile: displayProfileDetails,
        profileApiStatus: 'success',
      })
    } else {
      this.setState({profileApiStatus: 'failure'})
      console.log('server not ok')
    }
  }

  handleCheckedRadio = event => {
    const {id} = event.target
    const {getRadioInput} = this.props

    getRadioInput(id)
  }

  renderEmploymentType = () => {
    const {checkboxInputs} = this.state
    const {getEmploymentType} = this.props

    getEmploymentType(checkboxInputs)
  }

  handleCheckedType = event => {
    const {id} = event.target
    const {checkboxInputs} = this.state
    const inputNotInList = checkboxInputs.filter(eachItem => eachItem === id)

    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInputs: [...prevState.checkboxInputs, id],
        }),
        this.renderEmploymentType,
      )
    } else {
      const filteredCheckedInputs = checkboxInputs.filter(
        eachItem => eachItem !== id,
      )
      this.setState({checkboxInputs: filteredCheckedInputs})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="profile_failure_container">
      <button
        onClick={this.getProfileDetails}
        className="btn_retry"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = profile => (
    <div className="profile_container">
      <img src={profile.profileImage} alt="profile" />
      <h1 className="profile_heading">{profile.name}</h1>
      <p className="profile_description">{profile.shortBio}</p>
    </div>
  )

  render() {
    const {profile, profileApiStatus} = this.state

    let filterContent
    switch (profileApiStatus) {
      case 'success':
        filterContent = this.renderSuccessView(profile)
        break
      case 'failure':
        filterContent = this.renderFailureView()
        break
      default:
        filterContent = this.renderLoadingView()
        break
    }

    return (
      <li className="filter_container">
        {filterContent}
        <hr className="line_partition" />
        <h1 className="f_options_heading">Type of Employment</h1>

        <ul>
          {employmentTypesList.map(eachType => (
            <li
              className="filter_options_container"
              key={eachType.employmentTypeId}
            >
              <input
                id={eachType.employmentTypeId}
                type="checkbox"
                onChange={this.handleCheckedType}
              />
              <label htmlFor={eachType.employmentTypeId}>
                {eachType.label}
              </label>
            </li>
          ))}
        </ul>

        <hr className="line_partition" />

        <h1 className="f_options_heading">Salary Range</h1>
        <ul>
          {salaryRangesList.map(eachRange => (
            <li
              key={eachRange.salaryRangeId}
              className="filter_options_container2"
            >
              <input
                id={eachRange.salaryRangeId}
                name="options"
                onChange={this.handleCheckedRadio}
                type="radio"
              />
              <label htmlFor={eachRange.salaryRangeId}>{eachRange.label}</label>
            </li>
          ))}
        </ul>
      </li>
    )
  }
}

export default FilterGroup
