import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const FilterCard = ({filters, categoryIndex, title, value, addProducts, selectedFilters, count}) => {

    const [selected, setSelected] = useState(false)

    // const isFound = selectedFilters[categoryIndex].value.some(element => {
    //   if(element === title){
    //     return true
    //   }
    //   return false
    // })

    useEffect(() => {
      if(selectedFilters[categoryIndex]?.value?.includes(title)){
        setSelected(true)
      }else{
        setSelected(false)
      }
      
    }, [count])
    

  return (
    <div className="col-6 col-lg-4 col-xxl-4">
    <div
      className={`trait-wrapper ${selected && 'trait-wrapper-active'} d-flex align-items-center justify-content-between p-2`}
      style={{height: "40px", cursor: 'pointer'}}
      onClick={() =>{

          addProducts(title, categoryIndex);
          // setSelected(!selected)
      }
      }
    >
      <div className="d-flex align-items-center">
        <span className="trait-title mb-0">{title === "1" ? "1 (One)" : title === "2" ? "2 (Two)" : title}</span>
      </div>
      <span className="trait-amount">{value}</span>

    </div>
  </div>
  )
}

export default FilterCard