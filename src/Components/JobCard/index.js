import {Link, withRouter} from 'react-router-dom'
import {IoMdStar} from 'react-icons/io'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const GetJobCard = props => {
  const {content} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = content

  return (
    <Link to={`/jobs/${id}`} className="jobLink">
      <li className="jobItem">
        <div className="jobCardPart1">
          <div className="jobDetailsLeft">
            <div className="jobHeaderContainer">
              <img
                src={companyLogoUrl}
                alt="company logo"
                className="companyLogoImage"
              />

              <div className="companyInfoContainer">
                <h1 className="jobTitleHeading">{title}</h1>
                <div className="jobRatingHeading">
                  <IoMdStar className="starLogo" />
                  <p className="ratingPara">{rating}</p>
                </div>
              </div>
            </div>

            <div className="jobLocationAndTypeContainer">
              <div className="jobLocationContainer">
                <IoLocationSharp className="locationIcon" />
                <p className="locationPara">{location}</p>
              </div>
              <div className="jobTypeContainer">
                <BsFillBriefcaseFill className="jobTypeIcon" />
                <p className="jobTypePara">{employmentType}</p>
              </div>
            </div>
          </div>
          <p className="packagePerAnnumPara">{packagePerAnnum}</p>
        </div>

        <hr className="jobCardHr" />

        <h2 className="jobCardDescriptionHeading">Description</h2>
        <p className="jobCardDescriptionPara">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default withRouter(GetJobCard)
