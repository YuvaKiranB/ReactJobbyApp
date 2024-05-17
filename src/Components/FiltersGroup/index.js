import './index.css'

let employmentTypeList = []

const FiltersGroup = props => {
  const getSalaryFilterData = event => {
    const {changeSalaryRange} = props
    changeSalaryRange(event.target.value)
  }

  const getEmploymentTypeData = event => {
    const {changeEmploymentType} = props

    if (event.target.checked) {
      employmentTypeList.push(event.target.value)
    } else {
      const filteredList = employmentTypeList.filter(
        eachItem => event.target.value !== eachItem,
      )
      employmentTypeList = [...filteredList]
    }
    const employmentTypeString = employmentTypeList.join()
    changeEmploymentType(employmentTypeString)
  }

  const renderEmploymentType = () => {
    const {employmentTypesList} = props

    return (
      <div className="employmentTypeContainer">
        <h2 className="employmentTypeHeading">Type of Employment</h2>
        <ul className="listItem">
          {employmentTypesList.map(eachItem => (
            <li
              className="employmentTypeListItem"
              key={eachItem.employmentTypeId}
            >
              <input
                type="checkbox"
                id={eachItem.employmentTypeId}
                value={eachItem.employmentTypeId}
                className="employmentTypeInput"
                key={eachItem.employmentTypeId}
                onChange={getEmploymentTypeData}
              />
              <label
                className="employmentTypeLabel"
                htmlFor={eachItem.employmentTypeId}
              >
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>

        <hr className="employmentTypeHr" />
      </div>
    )
  }

  const renderSalaryRange = () => {
    const {salaryRangesList} = props

    return (
      <div className="salaryRangeContainer">
        <h2 className="salaryRangeHeading">Salary Range</h2>
        <ul className="salaryRangeList">
          {salaryRangesList.map(eachItem => (
            <li className="salaryRangeListItem" key={eachItem.salaryRangeId}>
              <input
                className="salaryRangeInput"
                type="radio"
                value={eachItem.salaryRangeId}
                id={eachItem.salaryRangeId}
                name="salary"
                key={eachItem.salaryRangeId}
                onChange={getSalaryFilterData}
              />
              <label
                className="salaryRangeLabel"
                htmlFor={eachItem.salaryRangeId}
              >
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>
      {renderEmploymentType()}
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup
