import './index.css'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="job-item-container">
          <div className="logo-title-ratings-container">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="company logo"
            />
            <div className="title-rating-container">
              <h1 className="title">{title}</h1>
              <div className="star-rating-container">
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
            <h1 className="description-heading">Description</h1>
            <p className="description">{jobDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
