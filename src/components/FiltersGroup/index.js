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

const FiltersGroup = props => {
  const renderEmploymentTypes = () => {
    const {updateEmploymentTypes} = props

    return (
      <div>
        <h1 className="emp-type-list-heading">Type of Employment</h1>
        <ul className="emp-types-list-container">
          {employmentTypesList.map(eachItem => {
            const onClickEmploymentItem = () => {
              updateEmploymentTypes(eachItem.employmentTypeId)
            }
            return (
              <li className="emp-type-item" key={eachItem.employmentTypeId}>
                <input
                  type="checkbox"
                  id={eachItem.label}
                  onChange={onClickEmploymentItem}
                  className="emp-type-item-input"
                />
                <label htmlFor={eachItem.label} className="emp-type-label-name">
                  {eachItem.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderSalaryRanges = () => {
    const {updateSalaryRange, activeSalaryRange} = props
    return (
      <div>
        <h1 className="salary-list-heading">Salary Range</h1>
        <ul className="salary-range-list-container">
          {salaryRangesList.map(eachItem => {
            const onClickSalaryRange = () => {
              updateSalaryRange(eachItem.salaryRangeId)
            }

            const isChecked = eachItem.salaryRangeId === activeSalaryRange
            return (
              <li
                key={eachItem.salaryRangeId}
                className="salary-range-list-item"
              >
                <input
                  type="radio"
                  name="salary-range"
                  id={eachItem.label}
                  onClick={onClickSalaryRange}
                  className="salary-range-input"
                  checked={isChecked}
                />
                <label
                  htmlFor={eachItem.label}
                  className="salary-range-label-name"
                >
                  {eachItem.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div>
      {renderEmploymentTypes()}
      <hr />
      {renderSalaryRanges()}
    </div>
  )
}

export default FiltersGroup
