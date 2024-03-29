import {RiStarSFill} from 'react-icons/ri'

import {MdLocationOn} from 'react-icons/md'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobCard = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrlSJ,
    employTypeSJ,
    jobDescriptionSJ,
    locationJB,
    ratingJB,
    titleJB,
  } = similarJobDetails

  return (
    <li className="job_card similar_job_card">
      <div className="job_profile_container">
        <img
          className="company_logo"
          src={companyLogoUrlSJ}
          alt="similar job company logo"
        />
        <div className="job_position_container">
          <h1 className="job_position">{titleJB}</h1>
          <div className="rating_container">
            <RiStarSFill className="star_style" /> <p>{ratingJB}</p>
          </div>
        </div>
      </div>

      <div>
        <p className="dis_heading">Description</p>
        <p className="description sj_description">{jobDescriptionSJ}</p>
      </div>

      <div className="location_container">
        <div className="location_section similar_job_location_section">
          <div className="rating_container_loc sj_space">
            <MdLocationOn className="loc_icon" /> <p>{locationJB}</p>
          </div>
          <div className="rating_container_loc">
            <BsFillBriefcaseFill className="loc_icon" /> <p>{employTypeSJ}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
