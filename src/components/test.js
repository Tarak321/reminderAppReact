// const checkForm=()=>{
//     var depname = document.getElementById("ename");
//     var deppass = document.getElementById("epass");
//     var deppass2 = document.getElementById("epass2");

//     if(depname.value === "") {
//       alert("Error: name cannot be blank!");
//       depname.focus();
//       return false;
//     }
//    var re = /^\w+$/;
//     if(!re.test(depname.value)) {
//       alert("Error: name must contain only letters, numbers and underscores!");
//       depname.focus();
//       return false;
//     }
  
//     if(deppass.value !== "" && deppass.value === deppass2.value) {
//       if(deppass.value.length < 6) {
//         alert("Error: Password must contain at least six characters!");
//         deppass.focus();
//         return false;
//       }
//       if(deppass.value === depname.value) {
//         alert("Error: Password must be different from name!");
//         deppass.focus();
//         return false;
//       }
//       re = /[0-9]/;
//       if(!re.test(deppass.value)) {
//         alert("Error: password must contain at least one number (0-9)!");
//         deppass.focus();
//         return false;
//       }
//       re = /[a-z]/;
//       if(!re.test(deppass.value)) {
//         alert("Error: password must contain at least one lowercase letter (a-z)!");
//         deppass.focus();
//         return false;
//       }
//       re = /[A-Z]/;
//       if(!re.test(deppass.value)) {
//         alert("Error: password must contain at least one uppercase letter (A-Z)!");
//         deppass.focus();
//         return false;
//       }
//     } else {
//       alert("Error: Please check that both the password are same!");
//       deppass.focus();
//       return false;
//     }
  
//       return true;
//   }


// const [dep, setDep] = useState({
//   depname: "",
//   depemail: "",
//   depcontact: "",
//   depblood:"",
//   depdob:"",
//   depweight:"",
//   depheight:""
// });


  //   const [dep, setDep] = useState({
    //     depname: "",
    //     depemail: "",
    //     depcontact: "",
    //     depblood:"",
    //     depdob:"",
    //     depweight:"",
    //     depheight:""
    //   });


      //   const dephandleChange = (e) => {
    //     setDep({
    //       ...dep,
    //       [e.target.name]: e.target.value
    //     })
    //   }

    // const myDep=(e)=>{
        //     //    e.prevenetDefault();
               
        //     //   for(var i=0;i<depresponse.length;i++){
    
        //     //         if(depresponse[i].relationship.toString()===document.getElementById("dep").value.toString()){
        //     //             document.getElementById("depname").value=depresponse[i].name;
        //     //             document.getElementById("depemail").value=depresponse[i].email_address;
        //     //             document.getElementById("depcontact").value=depresponse[i].contact_number;  
        //     //         }
                
        //     //     }
        //     //    }


        // const checkForm = (e) => {
        //   e.preventDefault();
        //   var name =user.name;
        //   var password = user.password;
        //   var password2 = user.password2;
      
        //   if (name.toString() === "") {
        //     alert("Error: name cannot be blank!");
        //     name.focus();
        //     return false;
        //   }
        //   var re = /^\w+$/;
        //   if (!re.test(name.toString())) {
        //     alert("Error: name must contain only letters, numbers and underscores!");
        //     name.focus();
        //     return false;
        //   }
      
        //   if (password.toString() !== "" && password.toString() === password2.toString()) {
        //     if (password.toString().length < 6) {
        //       alert("Error: Password must contain at least six characters!");
        //       return false;
        //     }
        //     if (password.toString() === name.toString()) {
        //       alert("Error: Password must be different from name!");
        //       return false;
        //     }
        //     re = /[0-9]/;
        //     if (!re.test(password.toString())) {
        //       alert("Error: password must contain at least one number (0-9)!");
        //       return false;
        //     }
        //     re = /[a-z]/;
        //     if (!re.test(password.toString())) {
        //       alert(
        //         "Error: password must contain at least one lowercase letter (a-z)!"
        //       );
        //       return false;
        //     }
        //     re = /[A-Z]/;
        //     if (!re.test(password.toString())) {
        //       alert(
        //         "Error: password must contain at least one uppercase letter (A-Z)!"
        //       );
        //       return false;
        //     }
        //   } else {
        //     alert("Error: Please check that both the password are same!")
        //     return false;
        //   }
      
        //   doFetch({
        //     method: "post",
        //     body: JSON.stringify({
        //       user: {
        //         name: user.name,
        //         email: user.email,
        //         contact_number: user.contact_number,
        //         date_of_birth: user.dob,
        //         country: user.country,
        //         password: user.password,
        //         password_confirmation: user.password2,
        //       },
        //     }),
        //   });
        // };

        // const checkForm = (e) => {
        //   e.preventDefault();
        //   var name =user.name;
        //   var oldpassword=user.password;
        //   var password = user.newpassword;
        //   var password2 = user.newpassword2;
      
        //   if (name.toString() === "") {
        //     alert("Error: name cannot be blank!");
        //     return false;
        //   }
        //   var re = /^\w+$/;
        //   if (!re.test(name.toString())) {
        //     alert("Error: name must contain only letters, numbers and underscores!");
        //     return false;
        //   }
        //   if (oldpassword.toString().length < 6) {
        //     alert("Error: Password must contain at least six characters!");
        //     return false;
        //   }
        //   if (oldpassword.toString() === name.toString()) {
        //     alert("Error: Password must be different from name!");
        //     return false;
        //   }
        //   re = /[0-9]/;
        //   if (!re.test(oldpassword.toString())) {
        //     alert("Error: Password must contain at least one number (0-9)!");
        //     return false;
        //   }
        //   re = /[a-z]/;
        //   if (!re.test(oldpassword.toString())) {
        //     alert(
        //       "Error: Password must contain at least one lowercase letter (a-z)!"
        //     );
        //     return false;
        //   }
        //   re = /[A-Z]/;
        //   if (!re.test(oldpassword.toString())) {
        //     alert(
        //       "Error: Password must contain at least one uppercase letter (A-Z)!"
        //     );
        //     return false;
        //   }
      
        //   if (password.toString() !== "" && password.toString() === password2.toString()) {
        //     if (password.toString().length < 6) {
        //       alert("Error: New Password must contain at least six characters!");
        //       return false;
        //     }
        //     if (password.toString() === name.toString()) {
        //       alert("Error: New Password must be different from name!");
        //       return false;
        //     }
        //     re = /[0-9]/;
        //     if (!re.test(password.toString())) {
        //       alert("Error: New Password must contain at least one number (0-9)!");
        //       return false;
        //     }
        //     re = /[a-z]/;
        //     if (!re.test(password.toString())) {
        //       alert(
        //         "Error: New Password must contain at least one lowercase letter (a-z)!"
        //       );
        //       return false;
        //     }
        //     re = /[A-Z]/;
        //     if (!re.test(password.toString())) {
        //       alert(
        //         "Error: New Password must contain at least one uppercase letter (A-Z)!"
        //       );
        //       return false;
        //     }
        //   } else {
        //     alert("Error: Please check that both the new passwords are same!")
        //     return false;
        //   }
      
        //   doFetch({
        //     method: "post",
        //     body: JSON.stringify({
        //       email: user.email,
        //       password: user.password,
        //       newpassword: user.newpassword
        //     }),
        //   });
        // };