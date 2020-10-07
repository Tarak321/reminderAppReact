// const myDep=(e)=>{
//     e.preventDefault();
//     for(var i=0;i<deptotalstate.length;i++){
//         if(deptotalstate[i].relationship.toString()===document.getElementById("dep").toString().toString()){
//             setchangeDep(deptotalstate[i].id);

//             console.log(deptotalstate);
//             setDep({
//                 depname: deptotalstate[i].name,
//                 depemail: deptotalstate[i].email_address,
//                 depcontact: deptotalstate[i].contact_number,
//                 depblood:deptotalstate[i].blood_group,
//                 depdob:deptotalstate[i].date_of_birth,
//                 depweight:deptotalstate[i].weight,
//                 depheight:deptotalstate[i].height
//               })
//         }
        
//     }
// }


// const checkForm = (e) => {
//     e.preventDefault();
//     var name =user.name;
//     var oldpassword = user.oldpassword;
//     var oldpassword2 = user.oldpassword2;

//     if (name.toString() === "") {
//       alert("Error: name cannot be blank!");
//       name.focus();
//       return false;
//     }
//     var re = /^\w+$/;
//     if (!re.test(name.toString())) {
//       alert("Error: name must contain only letters, numbers and underscores!");
//       name.focus();
//       return false;
//     }

//     if (oldpassword.toString() !== "" && oldpassword.toString() === oldpassword2.toString()) {
//       if (oldpassword.toString().length < 6) {
//         alert("Error: oldpassword must contain at least six characters!");
//         oldpassword.focus();
//         return false;
//       }
//       if (oldpassword.toString() === name.toString()) {
//         alert("Error: oldpassword must be different from name!");
//         oldpassword.focus();
//         return false;
//       }
//       re = /[0-9]/;
//       if (!re.test(oldpassword.toString())) {
//         alert("Error: oldpassword must contain at least one number (0-9)!");
//         oldpassword.focus();
//         return false;
//       }
//       re = /[a-z]/;
//       if (!re.test(oldpassword.toString())) {
//         alert(
//           "Error: oldpassword must contain at least one lowercase letter (a-z)!"
//         );
//         oldpassword.focus();
//         return false;
//       }
//       re = /[A-Z]/;
//       if (!re.test(oldpassword.toString())) {
//         alert(
//           "Error: oldpassword must contain at least one uppercase letter (A-Z)!"
//         );
//         oldpassword.focus();
//         return false;
//       }
//     } else {
//       alert("Error: Please check that both the oldpassword are same!");
//       oldpassword.focus();
//       return false;
//     }

//     doFetch({
//       method: "post",
//       body: JSON.stringify({
//         user: {
//           name: user.name,
//           email: user.email,
//           contact_number: user.contact_number,
//           date_of_birth: user.dob,
//           country: user.country,
//           oldpassword: user.oldpassword,
//           oldpassword_confirmation: user.oldpassword2,
//         },
//       }),
//     });
//   };
// if (oldpassword.toString().length < 6) {
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