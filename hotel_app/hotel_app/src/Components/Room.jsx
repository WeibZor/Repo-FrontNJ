import React from 'react'

export default function Room({data}) {
    console.log(data);
  return (
    <div className="w3-third w3-margin-bottom">
        <img src={data.image} alt="Norway" style={{width:"100%", height:"300px"}} />
        <div className="w3-container w3-white">
            <h3>{data.name}</h3>
            <h6 className="w3-opacity">From ${data.price}</h6>
            <p>{data.bed} bed</p>
            <p>{data.size}m<sup>2</sup></p>
            <p className="w3-large"><i className="fa fa-bath"></i> <i className="fa fa-phone"></i> <i className="fa fa-wifi"></i> <i className="fa fa-tv"></i></p>
            <button className="w3-button w3-block w3-black w3-margin-bottom">Choose Room</button>
        </div>
    </div>
  )
}
