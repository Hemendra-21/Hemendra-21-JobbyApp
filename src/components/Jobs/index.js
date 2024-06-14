/* eslint-disable jsx-a11y/control-has-associated-label */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header/index'
import Profile from '../Profile/index'
import FiltersGroup from '../FiltersGroup/index'
import './index.css'
import JobItem from '../JobItem/index'

const apiConstants = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    employmentTypesToSearch: [],
    activeSalaryRange: '',
    apiStatus: apiConstants.initial,
    inputSearch: '',
    jobsToDisplay: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {employmentTypesToSearch, activeSalaryRange, inputSearch} = this.state
    const employmentTypesText = employmentTypesToSearch.join(',')

    const getJobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypesText}&minimum_package=${activeSalaryRange}&search=${inputSearch}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(getJobsUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data
      const updatedData = jobs.map(eachData => ({
        companyLogoUrl: eachData.company_logo_url,
        employmentType: eachData.employment_type,
        id: eachData.id,
        jobDescription: eachData.job_description,
        location: eachData.location,
        packagePerAnnum: eachData.package_per_annum,
        rating: eachData.rating,
        title: eachData.title,
      }))

      this.setState({
        jobsToDisplay: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  updateEmploymentTypes = empTypeId => {
    const {employmentTypesToSearch} = this.state
    let updatedList = employmentTypesToSearch
    if (employmentTypesToSearch.includes(empTypeId)) {
      updatedList = employmentTypesToSearch.filter(
        eachItem => eachItem !== empTypeId,
      )
    } else {
      updatedList = [...updatedList, empTypeId]
    }
    this.setState({employmentTypesToSearch: updatedList}, this.getJobs)
  }

  updateSalaryRange = salaryRangeId => {
    this.setState({activeSalaryRange: salaryRangeId}, this.getJobs)
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-view"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderSuccessView = () => {
    const {jobsToDisplay} = this.state
    return (
      <>
        {jobsToDisplay.length > 0 ? (
          <ul className="jobs-items-container">
            {jobsToDisplay.map(eachItem => (
              <JobItem jobDetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
        ) : (
          this.renderNoJobsView()
        )}
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-btn" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  renderJobsOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.in_progress:
        return this.renderLoadingView()
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {inputSearch, activeSalaryRange} = this.state
    return (
      <div className="jobs-section-container">
        <Header />
        <div className="inner-container">
          <div className="profile-filters-container">
            <Profile />
            <hr />
            <FiltersGroup
              updateEmploymentTypes={this.updateEmploymentTypes}
              updateSalaryRange={this.updateSalaryRange}
              activeSalaryRange={activeSalaryRange}
            />
          </div>

          <div className="onSearch-jobs-list-container">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={event =>
                  this.setState({inputSearch: event.target.value})
                }
                value={inputSearch}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={() => this.getJobs()}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            <div className="jobs-list-container">
              {this.renderJobsOnApiStatus()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
