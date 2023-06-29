import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const FilterCard = ({filters, categoryIndex, title, value, addProducts, selectedFilters}) => {

    const [selected, setSelected] = useState(false)

    const isFound = selectedFilters.some(element => {
      if(element.key === Object.entries(filters)[categoryIndex][0] && element.value === title){
        return true
      }
      return false
    })

    useEffect(() => {
      if(isFound){
        setSelected(true)
      }else{
        setSelected(false)
      }
      // console.log(value, title, "selected");
      
    }, [JSON.stringify(selectedFilters)])
    

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
    <div
      className={`trait-wrapper ${selected && 'trait-wrapper-active'} d-flex align-items-center justify-content-between p-2`}
      style={{height: "40px", cursor: 'pointer'}}
      onClick={() =>{

          addProducts({
            key: Object.entries(filters)[categoryIndex][0],
            value: title,
          });
          // setSelected(!selected)
      }
      }
    >
      <div className="d-flex align-items-center">
        <span className="trait-title mb-0">{title}</span>
      </div>
      <span className="trait-amount mb-0">{value}</span>
    </div>
  </div>
  )
}

export default FilterCard