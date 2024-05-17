import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoIosStar} from 'react-icons/io'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'

import GetSimilarJobs from '../SimilarJobs'
import './index.css'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobDetails: [],
    similarJobs: [],
    pageStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    this.setState({pageStatus: apiStatusConstants.process})
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
    const data = await response.json()

    if (response.ok) {
      const similarJobs = data.similar_jobs
      const updatedSimilarJobs = similarJobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      const jobData = data.job_details

      const jobDetails = {
        companyLogoUrl: jobData.company_logo_url,
        companyWebsiteUrl: jobData.company_website_url,
        employmentType: jobData.employment_type,
        id: jobData.id,
        jobDescription: jobData.job_description,
        skills: jobData.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        lifeAtCompany: {
          description: jobData.life_at_company.description,
          imageUrl: jobData.life_at_company.image_url,
        },
        location: jobData.location,
        packagePerAnnum: jobData.package_per_annum,
        rating: jobData.rating,
        title: jobData.title,
      }

      this.setState({
        similarJobs: [...updatedSimilarJobs],
        jobDetails: {...jobDetails},
        pageStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({pageStatus: apiStatusConstants.failure})
    }
  }

  renderSkills = () => {
    const {jobDetails} = this.state
    const {skills} = jobDetails

    return (
      <ul className="skillsListContainer">
        {skills.map(eachItem => (
          <li className="skillItem" key={eachItem.name}>
            <img
              className="skillImage"
              src={eachItem.imageUrl}
              alt={eachItem.name}
            />
            <p className="skillPara">{eachItem.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      title,
      rating,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
    } = jobDetails

    return (
      <div className="jobDetailsContainer">
        <Header />
        <div className="jobDetailsCard">
          <div className="jobDetailsHeaderContainer">
            <div className="jobHeaderPart1">
              <div className="jobRoleContainer">
                <img
                  src={companyLogoUrl}
                  alt="job details company logo"
                  className="jobDetailsCompanyLogo"
                />
                <div className="jobDetailsRoleContainer">
                  <h2 className="jobDetailsRoleHeading">{title}</h2>
                  <div className="jobDetailsRatingContainer">
                    <IoIosStar className="jobDetailsStar" />
                    <p className="jobDetailsRatingPara">{rating}</p>
                  </div>
                </div>
              </div>

              <div className="jobDetailsJobTypeContainerMain">
                <div className="jobDetailsLocationAndTypeContainer">
                  <div className="jobDetailsLocationContainer">
                    <IoLocationSharp className="jobDetailsLocationIcon" />
                    <p className="jobDetailsLocationPara">{location}</p>
                  </div>
                  <div className="jobDetailsJobTypeContainer">
                    <BsFillBriefcaseFill className="jobDetailsJobTypeIcon" />
                    <p className="jobDetailsJobTypePara">{employmentType}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="jobDetailsSalaryContainer">
              <p className="jobDetailsSalaryPara">{packagePerAnnum}</p>
            </div>
          </div>

          <hr className="jobDetailsHr1" />

          <div className="jobDetailsDescriptionHeadingContainer">
            <h2 className="jobDetailsDescriptionHeading">Description</h2>
            <a className="websiteLink" href={companyWebsiteUrl}>
              <button className="websiteButton" type="button">
                Visit
              </button>
              <FaExternalLinkAlt className="linkIcon" />
            </a>
          </div>
          <p className="jobDetailsDescriptionPara">{jobDescription}</p>
          <div className="skillsContainer">
            <h2 className="skillsHeading">Skills</h2>
            {this.renderSkills()}
          </div>

          <div className="lifeAtCompanyContainer">
            <div className="lifeAtCompanyTextContent">
              <h1 className="lifeAtCompanyHeading">Life at Company</h1>
              <p className="lifeAtCompanyPara">{lifeAtCompany.description}</p>
            </div>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="lifeAtCompanyImage"
            />
          </div>
        </div>

        <div className="similarJobsContainer">
          <h1 className="similarJobsHeading">Similar Jobs</h1>
          <ul className="similarJobsCardsContainer">
            {similarJobs.map(eachItem => (
              <GetSimilarJobs content={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failureViewMain">
      <Header />
      <div className="jobDetailsFailureViewContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="jobDetailsFailureImage"
        />
        <h1 className="jobDetailsFailureHeading">Oops! Something Went Wrong</h1>
        <p className="jobDetailsFailurePara">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          className="jobDetailsRetryButton"
          onClick={this.getJobData}
          type="button"
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div className="loadingViewMain">
      <Header />
      <div className="jobDetailsLoaderContainer" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  render() {
    const {pageStatus} = this.state

    switch (pageStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.process:
        return this.renderLoadingView()

      default:
        return null
    }
  }
}

export default JobDetails
