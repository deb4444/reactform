import React, { useState } from "react";

const ReactContact = () => {
  const [fullName, setFullName] = useState({
    fname:"",
    lname:"",
    email:"",
    phone:"",
    
  });

  const inputEvent = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);

    const { value, name } = event.target;

    setFullName((preValue) => {
      // console.log(preValue);
      return {
        ...preValue,
        [name]: value
      };
      /*  if (name === "fName") {
        return {
          fname: value,
          lname: preValue.lname,
          email: preValue.email,
          phone: preValue.phone
        };
      } else if (name === "lName") {
        return {
          fname: preValue.fname,
          lname: value,
          email: preValue.email,
          phone: preValue.phone
        };
      } else if (name === "email") {
        return {
          fname: preValue.fname,
          lname: preValue.lname,
          email: value,
          phone: preValue.phone
        };
      } else if (name === "phone") {
        return {
          fname: preValue.fname,
          lname: preValue.lname,
          email: preValue.email,
          phone: value
        };
      }*/
    });
  };
   
   const postData = async(e)=>{
       e.preventDefault();

       const{fname,lname,email,phone}=fullName;

       if (fname && lname && email && phone) {
        const res = await fetch(
            "https://reactform-ab421-default-rtdb.firebaseio.com/newreactform.json" ,{
            method : "POST",
            headers :{
                "Content-Type": "application/json"
            },
            body : JSON.stringify({    
            fname,
            lname,
            email,
            phone
            }),}
 
        ); 
        if (res){
         setFullName({
         fname:"",
         lname:"",
         email:"",
         phone:"",
         
       });
       alert("Submitted Sucessfully")
     }
           
       } else {
           alert("Please fill all fields")
           
       }

   };
 
  return (
    <>
      <div className="main_div">
        <form method="POST">
          <div>
            <h1> Contact Form</h1>
            <input
              type="text"
              placeholder="Enter Your First Name"
              name="fname"
              onChange={inputEvent}
              value={fullName.fname}
              required
            />
            <br />
            <input
              type="text"
              placeholder="Enter Your last Name"
              name="lname"
              onChange={inputEvent}
              value={fullName.lname}
              required
            />
            <input
              type="email"
              placeholder="Enter Your email"
              name="email"
              onChange={inputEvent}
              value={fullName.email}
            
            />
            <input
              type="tel"
              placeholder="Enter Your Mobile Number"
              name="phone"
              onChange={inputEvent}
              value={fullName.phone}
              
            />
            <button type="submit" onClick={postData}>  Submit Me </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReactContact;
