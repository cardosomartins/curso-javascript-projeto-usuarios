 var fields = document.querySelectorAll("#form-user-create [name='carlos']");
 var user = {};

 console.log(fields);

 document.getElementById("form-user-create").addEventListener("submit", function(e){

    console.log("amebinha");
    e.preventDefault();
 });