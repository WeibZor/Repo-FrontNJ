import React from 'react'
import Room from './Room'

export default function Rooms() {
    //simular datos de una BD
    let RoomsData = [
        {
            "image": "data:image/jpeg;base64,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",
            "name": "Room Simgle",
            "price": 80,
            "size": 30,
            "bed": "Queen"
        },
         {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcYxGqKpjJuGIOcdHSPOGbLstHL7Dnf3ky_Q&s",
            "name": "Room Double",
            "price": 100,
            "size": 35,
            "bed": "Super Queen"
        },
         {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFsG7zOiT5DCwUvxe_HBrad4zvRIHFRXcX-w&s",
            "name": "Room Family",
            "price": 120,
            "size": 40,
            "bed": "Omega Queen"
        },
         {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWLb16c1Sv4zIjEAq-DLp5BcNElTlSdLdrRg&s",
            "name": "Room Simgle",
            "price": 85,
            "size": 25,
            "bed": "Queen"
        }
    ];

  return (
    <>
        <div className="w3-container w3-margin-top" id="rooms">
            <h3>Rooms</h3>
            <p>Make yourself at home is our slogan. We offer the best beds in the industry. Sleep well and rest well.</p>
        </div>
        
        <div className="w3-row-padding">
            <div className="w3-col m3">
            <label><i className="fa fa-calendar-o"></i> Check In</label>
            <input className="w3-input w3-border" type="text" placeholder="DD MM YYYY" />
            </div>
            <div className="w3-col m3">
            <label><i className="fa fa-calendar-o"></i> Check Out</label>
            <input className="w3-input w3-border" type="text" placeholder="DD MM YYYY" />
            </div>
            <div className="w3-col m2">
            <label><i className="fa fa-male"></i> Adults</label>
            <input className="w3-input w3-border" type="number" placeholder="1" />
            </div>
            <div className="w3-col m2">
            <label><i className="fa fa-child"></i> Kids</label>
            <input className="w3-input w3-border" type="number" placeholder="0" />
            </div>
            <div className="w3-col m2">
            <label><i className="fa fa-search"></i> Search</label>
            <button className="w3-button w3-block w3-black">Search</button>
            </div>
        </div>

        <div className="w3-row-padding w3-padding-16">
            {/* Habitaciones Dinamicas */}
           {
               RoomsData.map((r)=>( <Room data={r} /> )) 
            }
        </div>
    </>
  )
}
