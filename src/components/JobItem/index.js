import './index.css'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

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
    <li className="job-item-container">
      <div className="logo-title-ratings-container">
        <img src={companyLogoUrl} className="company-logo" />
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
      <hr />
      <div className="description-container">
        <p className="description-heading">Description</p>
        <p className="description">{jobDescription}</p>
      </div>
    </li>
  )
}

export default JobItem
