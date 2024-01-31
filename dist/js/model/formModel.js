class formModel{
    constructor(){
       this._name = "hamster"
       this._formEl = document.querySelectorAll("#form-user-create"); 
       this.Initializer()
    }


    Initializer(){

        document.getElementById("form-user-create").addEventListener("submit", e => {
    
            console.log("amebinha");
            e.preventDefault();    
            console.log(document.querySelectorAll("#exampleInputName"));
            console.log(this._formEl)
            // console.log(document.querySelector("#exampleInputName").getAttributeNames());
         
            // console.log(document.querySelector("#exampleInputName").getAttribute('name'));
         
          });

    }
}
 
 
var fields = document.querySelectorAll("#form-user-create");
var user = {};
 
 
 
 
