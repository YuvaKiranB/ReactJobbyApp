import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import FiltersGroup from '../FiltersGroup'
import GetJobCard from '../JobCard'
import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
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

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    profileData: [],
    jobsApiStatus: apiStatusConstants.initial,
    profileApiStatus: apiStatusConstants.initial,
    activeJobType: '',
    activeSalaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      jobsApiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {activeJobType, activeSalaryRange, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeJobType}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        jobsApiStatus: apiStatusConstants.failure,
      })
    }
  }

  getProfile = async () => {
    this.setState({
      profileApiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileData: updatedData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        profileApiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeEmploymentType = activeJobType => {
    this.setState({activeJobType}, this.getJobs)
  }

  changeSalaryRange = activeSalaryRange => {
    this.setState({activeSalaryRange}, this.getJobs)
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  updateSearchInput = () => this.getJobs()

  updateSearchInput2 = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  renderJobsFailureView = () => (
    <div className="jobsFailureViewContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobsFailureImage"
      />
      <h1 className="jobsFailureHeading">Oops! Something Went Wrong</h1>
      <p className="jobsFailurePara">
        We cannot seem to find the page you are looking for
      </p>
      <button className="jobsRetryButton" onClick={this.getJobs} type="button">
        Retry
      </button>
    </div>
  )

  renderProfileFailureView = () => (
    <div className="profileFailureContainer">
      <button
        className="profileRetryButton"
        type="button"
        onClick={this.getProfile}
      >
        Retry
      </button>
    </div>
  )

  renderProfileCard = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    console.log(profileData)

    return (
      <div className="profileCard">
        <img className="profileImage" src={profileImageUrl} alt="profile" />
        <h2 className="profileNameHeading">{name}</h2>
        <p className="shortBioPara">{shortBio}</p>
      </div>
    )
  }

  renderJobsListView = () => {
    const {jobsList} = this.state
    const showJobsList = jobsList.length > 0

    return showJobsList ? (
      <div className="JobsContainer">
        <ul className="jobsList">
          {jobsList.map(job => (
            <GetJobCard content={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="noJobsContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="noJobsImage"
          alt="no jobs"
        />
        <h1 className="noJobsHeading">No Jobs Found</h1>
        <p className="noJobsPara">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loaderContainer" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderSearchBar = () => {
    const {searchInput} = this.state

    return (
      <div className="searchBarContainer">
        <input
          type="search"
          placeholder="Search"
          className="searchBar"
          value={searchInput}
          onChange={this.changeSearchInput}
          onKeyDown={this.updateSearchInput2}
        />
        {/* eslint-disable-next-line */}
        <button
          onClick={this.updateSearchInput}
          type="button"
          data-testid="searchButton"
          className="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    const {activeJobType, activeSalaryRange, profileApiStatus} = this.state

    return (
      <div className="jobsSection">
        <Header />
        <div className="jobsPageContainer">
          <div className="part1">
            <div className="searchContainerSm"> {this.renderSearchBar()}</div>

            <div className="profileContainer">
              {profileApiStatus === apiStatusConstants.success &&
                this.renderProfileCard()}
              {profileApiStatus === apiStatusConstants.inProgress &&
                this.renderLoadingView()}
              {profileApiStatus === apiStatusConstants.failure &&
                this.renderProfileFailureView()}
            </div>
            <hr className="part1Hr" />
            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              activeJobType={activeJobType}
              activeSalaryRange={activeSalaryRange}
              changeEmploymentType={this.changeEmploymentType}
              changeSalaryRange={this.changeSalaryRange}
              key="filters"
            />
          </div>

          <div className="part2">
            <div className="searchContainerLg">{this.renderSearchBar()}</div>
            <div className="allJobsContainer">{this.renderAllJobs()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
