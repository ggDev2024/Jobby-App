import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {RiStarSFill} from 'react-icons/ri'

import {MdLocationOn, MdOpenInNew} from 'react-icons/md'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import Header from '../Header'

import SkillsCard from '../SkillsCard'

import SimilarJobCard from '../SimilarJobCard'

import './index.css'

class JobItemDetails extends Component {
  state = {jobData: {}, similarJobData: '', apiStatus: ''}

  componentDidMount() {
    this.getJobItemDetailsList()
  }

  getJobItemDetailsList = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedJobDetails = this.getUpdatedJobDetails(data.job_details)
      const updatedSimilarJobs = data.similar_jobs.map(eachSimilarJob =>
        this.getUpdatedSimilarJobs(eachSimilarJob),
      )

      console.log(data)
      console.log(updatedJobDetails)
      console.log(updatedSimilarJobs)

      this.setState({
        jobData: updatedJobDetails,
        similarJobData: updatedSimilarJobs,
        apiStatus: 'success',
      })
    } else {
      this.setState({apiStatus: 'failures'})
    }
  }

  getUpdatedJobDetails = jobDetails => ({
    id: jobDetails.id,
    title: jobDetails.title,
    companyLogoUrl: jobDetails.company_logo_url,
    companyWebUrl: jobDetails.company_website_url,
    employType: jobDetails.employment_type,
    jobDescription: jobDetails.job_description,
    skills: jobDetails.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
    lifeAtCompany: {
      description: jobDetails.life_at_company.description,
      imageUrlLac: jobDetails.life_at_company.image_url,
    },
    location: jobDetails.location,
    packagePerAnnum: jobDetails.package_per_annum,
    rating: jobDetails.rating,
  })

  getUpdatedSimilarJobs = data => ({
    companyLogoUrlSJ: data.company_logo_url,
    employTypeSJ: data.employment_type,
    idSJ: data.id,
    jobDescriptionSJ: data.job_description,
    locationJB: data.location,
    ratingJB: data.rating,
    titleJB: data.title,
  })

  renderFailureView = () => (
    <div className="failure_container">
      <img
        className="failure_view_img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        onClick={this.getJobItemDetailsList}
        className="btn_failure"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container job_item_load" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetails = () => {
    const {jobData, similarJobData} = this.state
    const {
      title,
      companyLogoUrl,
      companyWebUrl,
      employType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
    } = jobData
    const {description, imageUrlLac} = lifeAtCompany

    return (
      <div>
        <div className="job_card">
          <div className="job_profile_container">
            <img
              className="company_logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="job_position_container">
              <h1 className="job_position">{title}</h1>
              <div className="rating_container">
                <RiStarSFill className="star_style" /> <p>{rating}</p>
              </div>
            </div>
          </div>

          <div className="location_container">
            <div className="location_section">
              <div className="rating_container_loc rating_margin">
                <MdLocationOn className="loc_icon" /> <p>{location}</p>
              </div>
              <div className="rating_container_loc">
                <BsFillBriefcaseFill className="loc_icon" /> <p>{employType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="line_partition loc_line" />
          <div>
            <div className="description_heading_container">
              <h1 className="dis_heading jb_head">Description</h1>
              <div className="open_in_new">
                <a href={companyWebUrl} className="visit_heading">
                  Visit
                </a>{' '}
                <MdOpenInNew />
              </div>
            </div>
            <p className="description jb_description">{jobDescription}</p>
            <h1 className="skills_heading">Skills</h1>
            <ul className="skills_container">
              {skills.map(eachTechSkill => (
                <SkillsCard
                  key={eachTechSkill.name}
                  skillsDetails={eachTechSkill}
                />
              ))}
            </ul>
            <h1 className="lac_heading">Life at Company</h1>
            <div className="lac_container">
              <p className="lac_description">{description}</p>
              <img
                className="lac_image"
                src={imageUrlLac}
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="similar_job_heading">Similar Jobs</h1>
          <ul className="similar_job_container">
            {similarJobData.map(eachSB => (
              <SimilarJobCard similarJobDetails={eachSB} key={eachSB.idSJ} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    let jobContent
    switch (apiStatus) {
      case 'success':
        jobContent = this.renderJobItemDetails()
        break
      case 'failures':
        jobContent = this.renderFailureView()
        break
      default:
        jobContent = this.renderLoadingView()
    }

    return (
      <div>
        <Header />
        <div className="jb_details_container">{jobContent}</div>
      </div>
    )
  }
}

export default JobItemDetails
