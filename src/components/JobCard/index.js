import {Link} from 'react-router-dom'

import {RiStarSFill} from 'react-icons/ri'

import {MdLocationOn} from 'react-icons/md'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogo,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link_style">
      <li className="job_card">
        <div className="job_profile_container">
          <img className="company_logo" src={companyLogo} alt="company logo" />
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
              <BsFillBriefcaseFill className="loc_icon" />{' '}
              <p>{employmentType}</p>
            </div>
          </div>
          <h1 className="package">{packagePerAnnum}</h1>
        </div>
        <hr className="line_partition loc_line" />
        <div>
          <p className="dis_heading">Description</p>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
