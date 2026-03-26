import React from 'react'

export default function Menu() {
  return (
    <div className="w3-bar w3-white w3-large">
        <a href="#" className="w3-bar-item w3-button w3-red w3-mobile"><i className="fa fa-bed w3-margin-right"></i>Logo</a>
        <a href="#rooms" className="w3-bar-item w3-button w3-mobile">Rooms</a>
        <a href="#about" className="w3-bar-item w3-button w3-mobile">About</a>
        <a href="#contact" className="w3-bar-item w3-button w3-mobile">Contact</a>
        <a href="#contact" className="w3-bar-item w3-button w3-right w3-light-grey w3-mobile">Book Now</a>
    </div>
  )
}
