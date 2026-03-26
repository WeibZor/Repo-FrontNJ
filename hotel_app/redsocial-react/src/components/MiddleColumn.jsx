import React from 'react'
import Post from './Post'

export default function MiddleColumn(){
  return (
    <>
      <div className="w3-row-padding">
        <div className="w3-col m12">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding">
              <h6 className="w3-opacity">Social Media template by w3.css</h6>
              <p contentEditable className="w3-border w3-padding">Status: Feeling Blue</p>
              <button type="button" className="w3-button w3-theme"><i className="fa fa-pencil"></i>  Post</button>
            </div>
          </div>
        </div>
      </div>

      <Post avatar="https://www.w3schools.com/w3images/avatar2.png" name="John Doe" time="1 min" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit."></Post>
      <Post avatar="https://www.w3schools.com/w3images/avatar5.png" name="Jane Doe" time="16 min" text="Lorem ipsum dolor sit amet, consectetur adipisicing elit."></Post>
      <Post avatar="https://www.w3schools.com/w3images/avatar6.png" name="Angie Jane" time="32 min" text="Have you seen this?" images={["https://www.w3schools.com/w3images/nature.jpg"]}></Post>
    </>
  )
}
