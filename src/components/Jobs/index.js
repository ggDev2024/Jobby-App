import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import {MdClear} from 'react-icons/md'

import Cookies from 'js-cookie'

import Header from '../Header'

import FilterGroup from '../FilterGroup'

import JobCard from '../JobCard'

import './index.css'

class Jobs extends Component {
  state = {
    userSearchInput: '',
    jobDetailsList: [],
    jobApiStatus: '',
    showSearchClear: false,
    employeeList: [],
    radioInput: '',
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    const {userSearchInput, employeeList, radioInput} = this.state

    this.setState({jobApiStatus: ''})

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${employeeList.join()}&minimum_package=${radioInput}&search=${userSearchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const displayJobsDetails = data.jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogo: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        jobDetailsList: displayJobsDetails,
        jobApiStatus: 'success',
      })
      console.log(displayJobsDetails)
    } else {
      this.setState({jobApiStatus: 'failure'})
    }
  }

  getEmploymentType = employTypeList =>
    this.setState({employeeList: employTypeList}, this.getJobsDetails)

  getRadioInput = radioInputSelected =>
    this.setState({radioInput: radioInputSelected}, this.getJobsDetails)

  handleSearch = event => {
    const searchLength = event.target.value.length

    if (searchLength > 1) {
      this.setState({showSearchClear: true})
    }
    this.setState({userSearchInput: event.target.value})
  }

  handleClearSearchInput = () => {
    this.setState(
      {userSearchInput: '', showSearchClear: false},
      this.getJobsDetails,
    )
  }

  handleSearchInput = () => {
    this.getJobsDetails()
  }

  renderLoadingView = () => (
    <div className="loader-container job_load" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = jobDetailsList => {
    const showJobList = jobDetailsList.length > 1
    return showJobList ? (
      jobDetailsList.map(eachJob => (
        <JobCard jobDetails={eachJob} key={eachJob.id} />
      ))
    ) : (
      <div className="no_jobs_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  renderFailureView = () => {
    const onClickFailure = () => this.getJobsDetails()

    return (
      <div className="failure_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button onClick={onClickFailure} className="btn_failure" type="button">
          Retry
        </button>
      </div>
    )
  }

  render() {
    const {
      jobDetailsList,
      jobApiStatus,
      showSearchClear,
      userSearchInput,
    } = this.state

    let jobContent
    switch (jobApiStatus) {
      case 'success':
        jobContent = this.renderSuccessView(jobDetailsList)
        break
      case 'failure':
        jobContent = this.renderFailureView()
        break
      default:
        jobContent = this.renderLoadingView()
        break
    }

    return (
      <div className="job_container">
        <Header />
        <div className="jobs_display">
          <FilterGroup
            getEmploymentType={this.getEmploymentType}
            getRadioInput={this.getRadioInput}
          />
          <div className="jobs_content">
            <div className="search_input_container">
              <input
                className="input_search"
                placeholder="Search"
                type="search"
                onChange={this.handleSearch}
                value={userSearchInput}
              />

              {showSearchClear && (
                <button
                  className="clear_search_button"
                  type="button"
                  onClick={this.handleClearSearchInput}
                  aria-label="Clear"
                >
                  <MdClear className="input_search_logo clear_btn" />
                </button>
              )}

              <button
                className="job_search_button"
                type="button"
                onClick={this.handleSearchInput}
                aria-label="Search"
                data-testid="searchButton"
              >
                <BsSearch className="input_search_logo" />
              </button>
            </div>

            <ul>{jobContent}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
