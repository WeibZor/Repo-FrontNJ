import React from 'react'

export default function RightColumn(){
  return (
    <>
      <div className="w3-card w3-round w3-white w3-center">
        <div className="w3-container">
          <p>Upcoming Events:</p>
          <img src="https://www.w3schools.com/w3images/forest.jpg" alt="Forest" style={{width:'100%'}}/>
          <p><strong>Holiday</strong></p>
          <p>Friday 15:00</p>
          <p><button className="w3-button w3-block w3-theme-l4">Info</button></p>
        </div>
      </div>
      <br/>
      <div className="w3-card w3-round w3-white w3-center">
        <div className="w3-container">
          <p>Friend Request</p>
          <img src="https://www.w3schools.com/w3images/avatar6.png" alt="Avatar" style={{width:'50%'}}/><br/>
          <span>Jane Doe</span>
          <div className="w3-row w3-opacity">
            <div className="w3-half"><button className="w3-button w3-block w3-green w3-section" title="Accept"><i className="fa fa-check"></i></button></div>
            <div className="w3-half"><button className="w3-button w3-block w3-red w3-section" title="Decline"><i className="fa fa-remove"></i></button></div>
          </div>
        </div>
      </div>
      <br/>
      <div className="w3-card w3-round w3-white w3-padding-16 w3-center"><div className="w3-container"><p>ADS</p></div></div>
      <br/>
      <div className="w3-card w3-round w3-white w3-padding-32 w3-center"><div className="w3-container"><p><i className="fa fa-bug w3-xxlarge"></i></p></div></div>
    </>
  )
}
