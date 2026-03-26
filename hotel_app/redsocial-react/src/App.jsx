import React from 'react'
import Header from './components/Header'
import LeftColumn from './components/LeftColumn'
import MiddleColumn from './components/MiddleColumn'
import RightColumn from './components/RightColumn'

export default function App(){
  return (
    <div>
      <Header />
      <div className="w3-container w3-content" style={{maxWidth:1400, marginTop:80}}>
        <div className="w3-row">
          <div className="w3-col m3"><LeftColumn/></div>
          <div className="w3-col m7"><MiddleColumn/></div>
          <div className="w3-col m2"><RightColumn/></div>
        </div>
      </div>
    </div>
  )
}
