import React from 'react'
import NavMenu from './NavMenu'
import MainStructure from './MainStructure'

const Main = () => {
  return(
    <div className="fullbody">
      <div className="fb-content">
        <NavMenu />
        <MainStructure />
      </div>
    </div>
  )
}

export default Main
