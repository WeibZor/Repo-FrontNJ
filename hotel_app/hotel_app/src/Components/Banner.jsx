import React from 'react'

export default function Banner() {
  return (
   <header className="w3-display-container w3-content" style={{maxWidth:"2000px"}}>
        <img className="w3-image" src="https://www.w3schools.com/w3images/hotel.jpg" alt="The Hotel" style={{minWidth:"1000px"}} width="2000" height="800" />
        <div className="w3-display-left w3-padding w3-col l6 m8">
            <div className="w3-container w3-red">
            <h2><i className="fa fa-bed w3-margin-right"></i>Hotel Name</h2>
            </div>
            <div className="w3-container w3-white w3-padding-16">
            <form>
                <div className="w3-row-padding" style={{margin:"0 -16px"}}>
                <div className="w3-half w3-margin-bottom">
                    <label><i className="fa fa-calendar-o"></i> Check In</label>
                    <input className="w3-input w3-border" type="text" placeholder="DD MM YYYY" name="CheckIn" required />
                </div>
                <div className="w3-half">
                    <label><i className="fa fa-calendar-o"></i> Check Out</label>
                    <input className="w3-input w3-border" type="text" placeholder="DD MM YYYY" name="CheckOut" required />
                </div>
                </div>
                <div className="w3-row-padding" style={{margin:"8px -16px"}}>
                <div className="w3-half w3-margin-bottom">
                    <label><i className="fa fa-male"></i> Adults</label>
                    <input className="w3-input w3-border" type="number" value="1" name="Adults" min="1" max="6" />
                </div>
                <div className="w3-half">
                    <label><i className="fa fa-child"></i> Kids</label>
                    <input className="w3-input w3-border" type="number" value="0" name="Kids" min="0" max="6" />
                </div>
                </div>
                <button className="w3-button w3-dark-grey" type="submit"><i className="fa fa-search w3-margin-right"></i> Search availability</button>
            </form>
            </div>
        </div>
    </header>
  )
}
