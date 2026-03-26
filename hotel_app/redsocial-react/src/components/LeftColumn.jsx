import React from 'react'

function Accordion(){
  const toggle = (id)=>{
    const el = document.getElementById(id)
    if(!el) return
    el.className = el.className.indexOf('w3-show')===-1 ? el.className + ' w3-show' : el.className.replace(' w3-show','')
  }
  return (
    <div className="w3-card w3-round">
      <div className="w3-white">
        <button onClick={()=>toggle('Demo1')} className="w3-button w3-block w3-theme-l1 w3-left-align"> My Groups</button>
        <div id="Demo1" className="w3-hide w3-container"><p>Some text..</p></div>
        <button onClick={()=>toggle('Demo2')} className="w3-button w3-block w3-theme-l1 w3-left-align"> My Events</button>
        <div id="Demo2" className="w3-hide w3-container"><p>Some other text..</p></div>
        <button onClick={()=>toggle('Demo3')} className="w3-button w3-block w3-theme-l1 w3-left-align"> My Photos</button>
        <div id="Demo3" className="w3-hide w3-container">
          <div className="w3-row-padding"><br/>
            <div className="w3-half"><img src="https://www.w3schools.com/w3images/lights.jpg" style={{width:'100%'}} className="w3-margin-bottom" alt=""/></div>
            <div className="w3-half"><img src="https://www.w3schools.com/w3images/nature.jpg" style={{width:'100%'}} className="w3-margin-bottom" alt=""/></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LeftColumn(){
  return (
    <>
      <div className="w3-card w3-round w3-white">
        <div className="w3-container">
          <h4 className="w3-center">My Profile</h4>
          <p className="w3-center"><img src="https://www.w3schools.com/w3images/avatar3.png" className="w3-circle" style={{height:106,width:106}} alt="Avatar"/></p>
          <hr/>
          <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> Designer, UI</p>
          <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> London, UK</p>
          <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> April 1, 1988</p>
        </div>
      </div>
      <br/>
      <Accordion />
      <br/>
      <div className="w3-card w3-round w3-white w3-hide-small">
        <div className="w3-container">
          <p>Interests</p>
          <p>
            <span className="w3-tag w3-small w3-theme-d5">News</span>
            <span className="w3-tag w3-small w3-theme-d4">W3Schools</span>
            <span className="w3-tag w3-small w3-theme-d3">Labels</span>
          </p>
        </div>
      </div>
      <br/>
      <div className="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
        <span onClick={e=>e.target.parentElement.style.display='none'} className="w3-button w3-theme-l3 w3-display-topright"><i className="fa fa-remove"></i></span>
        <p><strong>Hey!</strong></p>
        <p>People are looking at your profile. Find out who.</p>
      </div>
    </>
  )
}
