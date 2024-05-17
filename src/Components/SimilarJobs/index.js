import {Link, withRouter} from 'react-router-dom'

import {IoIosStar} from 'react-icons/io'
import {IoLocationSharp} from 'react-icons/io5'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const GetSimilarJobs = props => {
  const {content} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = content

  return (
    <li className="similarJobsCard">
      <Link className="similarJobsLink" to={`/jobs/${id}`}>
        <div className="similarJobHeader">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="similarJobImage"
          />
          <div className="similarJobDetails">
            <h2 className="similarJobTitleHeading">{title}</h2>
            <div className="similarJobRatingContainer">
              <IoIosStar className="similarJobStar" />
              <p className="similarJobRatingPara">{rating}</p>
            </div>
          </div>
        </div>

        <div className="similarJobDescriptionContainer">
          <h2 className="similarJobDescriptionHeading">Description</h2>
          <p className="similarJobDescriptionPara">{jobDescription}</p>
        </div>

        <div className="similarJobLocationAndTypeContainer">
          <div className="similarJobLocationContainer">
            <IoLocationSharp className="similarJobLocationIcon" />
            <p className="similarJobLocationPara">{location}</p>
          </div>
          <div className="similarJobJobTypeContainer">
            <BsFillBriefcaseFill className="similarJobJobTypeIcon" />
            <p className="similarJobJobTypePara">{employmentType}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default withRouter(GetSimilarJobs)
