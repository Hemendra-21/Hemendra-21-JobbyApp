import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header/index'
import './index.css'
import SimilarJobs from '../SimilarJobs/index'

const apiConstants = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class jobItemDetails extends Component {
  state = {apiStatus: apiConstants.initial, JobData: ''}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiConstants.in_progress})

    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jobItemDetailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobItemDetailsUrl, options)
    const data = await response.json()
    const formattedData = {
      JobDetails: {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(eachItem => ({
          skillImageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        title: data.job_details.title,
      },
      similarJobs: data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      })),
    }

    this.setState({
      apiStatus: apiConstants.success,
      JobData: formattedData,
    })
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetails = () => {
    const {JobData} = this.state
    const {JobDetails, similarJobs} = JobData

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = JobDetails

    const {description, imageUrl} = lifeAtCompany
    console.log(similarJobs)

    return (
      <div>
        <Header />
        <div className="job-details-item-container">
          <div className="job-details-container">
            <div className="company-logo-title-rating-container">
              <img
                src={companyLogoUrl}
                className="company-logo"
                alt="company logo url"
              />
              <div className="title-rating-container">
                <h1 className="job-title">{title}</h1>
                <div className="rating-container">
                  <FaStar className="rating-star" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-empType-package-container">
              <div className="location-empType-container">
                <div className="location-container">
                  <IoLocationSharp className="location-logo" />
                  <p className="location">{location}</p>
                </div>
                <div className="job-type-container">
                  <BsBriefcaseFill className="brief-case-logo" />
                  <p className="employment-type">{employmentType}</p>
                </div>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>
            <hr className="section-divider" />
            <div className="description-container">
              <div className="description-anchor-container">
                <p className="job-detail-description-heading">Description</p>
                <a href={companyWebsiteUrl} className="anchor">
                  Visit <FiExternalLink />
                </a>
              </div>
              <p className="job-detail-description">{jobDescription}</p>
            </div>
            <div className="skills-container">
              <h1 className="skills-heading">Skills</h1>
              <ul className="skills-list-container">
                {skills.map(eachItem => (
                  <li className="skill-item">
                    <img
                      src={eachItem.skillImageUrl}
                      alt={eachItem.name}
                      className="skill-logo"
                    />
                    <p className="skill-name">{eachItem.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h1 className="company-life-heading">Life at Company</h1>
              <div className="company-life-desc-image-container">
                <p className="company-life-description">{description}</p>
                <img src={imageUrl} alt="company life" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="similar-jobs-heading">Similar Jobs</h1>
            <ul className="similar-jobs-container">
              {similarJobs.map(eachItem => (
                <SimilarJobs details={eachItem} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderViewBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.in_progress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderJobItemDetails()
      default:
        return null
    }
  }

  /*
   case apiConstants.failure:
        return this.renderFailureView()
        */

  render() {
    return <div>{this.renderViewBasedOnApiStatus()}</div>
  }
}

export default jobItemDetails