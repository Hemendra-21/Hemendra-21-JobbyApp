import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    title,
    rating,
  } = details
  console.log(details)
  return (
    <li className="similar-job-item-container">
      <div className="similar-company-logo-title-rating-container">
        <img
          src={companyLogoUrl}
          className="similar-company-logo"
          alt="similar job company logo"
        />
        <div className="similar-job-title-rating-container">
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-job-rating-container">
            <FaStar className="rating-star" />
            <p className="similar-job-rating">{rating}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="similar-jobs-description-heading">Description</h1>
        <p className="similar-jobs-description">{jobDescription}</p>
      </div>

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
    </li>
  )
}

export default SimilarJobs
