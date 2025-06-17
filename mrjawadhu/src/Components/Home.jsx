import React, { useState } from "react";
// import "./Home.css"
import Loading from "./Loading"
// import { preview } from "vite";
import axios from "axios";
import NavBar from "./NavBar";


const Home = () => {
 const ai_url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCpHeTiBeTM0BA8yEqC3rX658VRdNu2j2o";
  let [suggestion,setSuggestion]=useState([
    "What is React.js" ,"What is javascript","How to Build chatBot AI"
  ])
  let [message,setMessage]=useState([])
  let [input,setInput]=useState(""); 

  let handleSubmit= async()=>{
    let userMessage={sender:"user",text:input}
    setMessage(prev=>[...prev,userMessage]);
    try{
     const response =await axios.post(ai_url,{
    contents: [
      {
        parts: [
          {
            "text": input
          }
        ]
      }
    ]
  })
  // console.log(response.data);
  
     if(response.data){

       let aiMessage={sender:"AI",text:response.data.candidates[0].content.parts[0].text}
       setMessage(prev=>[...prev,aiMessage]);
      }
  
      
    }
    catch(error){
      
      let errorMessage={sender:"AI",text:"Sorry,Im not able to answer this qustion."}
      setMessage=(prev=>[...prev,errorMessage]);
    }
    
      setInput("");
  }
  return (
    
  <div className="vh-100 findc" >

 <div className="container h-100">

<div className="card border-0 bg-transparent h-100">

  <div className="card-body chatBot-body">


<div className="d-flex justify-content-center align-items-center">
 <div className="ones my-4">
  <Loading/>
 </div>

</div>
  
 <div className="row row-cols-4">
  {
    suggestion.map((cElement,index)=>{
      return(
          <div className="col">
    <div className="card border-0 shadow-sm suggestion-card h-100 ">
      <div className="card-body ">
        {/* <h5 className="card-title">react-js</h5> */}
        <p className="card-text" >{cElement} </p>
      </div>
    </div>
   </div>
      )
    })

  }
 </div>

 {
  message.length>0?
  <>
  
    {
      message.map((cElement,index)=>{
     return(
      <div className={cElement.sender==="user"? 'd-flex justify-content-end w-100' : 'd-flex justify-content-start w-100' }>
      <div className={`${cElement.sender}-repone-messages`}>
      <p className="mb-0">{cElement.text}</p>
      </div>

      </div>
     )
  })
    }
  
  </>:null
 }
  
</div>
<div className="card-footer">
  <div className="input-group">
    <input type="text" className="form-control" value={input} placeholder="ask me anything..." onChange={e=>setInput(e.target.value)} />
    <button className="btn btn-primary" onClick={()=>handleSubmit()}>Send</button>
  </div>
</div>
    
  </div>
  </div>
  </div>

  )
};

export default Home;
