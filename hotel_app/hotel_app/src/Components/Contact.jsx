import React from 'react'

export default function Contact() {
  return (
    <div className="w3-container" id="contact">
        <h2>Contact</h2>
        <p>If you have any questions, do not hesitate to ask them.</p>
        <i className="fa fa-map-marker w3-text-red" style={{width:"30px"}}></i> Chicago, US<br />
        <i className="fa fa-phone w3-text-red" style={{width:"30px"}}></i> Phone: +00 151515<br />
        <i className="fa fa-envelope w3-text-red" style={{width:"30px"}}> </i> Email: mail@mail.com<br />
        <form>
        <p><input className="w3-input w3-padding-16 w3-border" type="text" placeholder="Name" required name="Name" /></p>
        <p><input className="w3-input w3-padding-16 w3-border" type="text" placeholder="Email" required name="Email" /></p>
        <p><input className="w3-input w3-padding-16 w3-border" type="text" placeholder="Message" required name="Message" /></p>
        <p><button className="w3-button w3-black w3-padding-large" type="submit">SEND MESSAGE</button></p>
        </form>
    </div>
  )
}
