import React from 'react'

export default function Header(){
  return (
    <div className="w3-top">
      <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
        <a href="#" className="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i className="fa fa-home w3-margin-right"></i>Logo</a>
        <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="News"><i className="fa fa-globe"></i></a>
        <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account"><i className="fa fa-user"></i></a>
        <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Messages"><i className="fa fa-envelope"></i></a>
        <div className="w3-dropdown-hover w3-hide-small">
          <button className="w3-button w3-padding-large" title="Notifications"><i className="fa fa-bell"></i><span className="w3-badge w3-right w3-small w3-green">3</span></button>
        </div>
        <a href="#" className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="My Account">
          <img src="https://www.w3schools.com//w3images/avatar2.png" className="w3-circle" style={{height:23,width:23}} alt="Avatar"/>
        </a>
      </div>
    </div>
  )
}
