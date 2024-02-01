class formModel{
    constructor(){
       this._name;
       this._gender;
       this._birthday;
       this._country;
       this._email;
       this._password;
       this._photo;
       this._adminBoolean;
       this._formEl = document.getElementById("form-user-create"); 
       this.Initializer()
    }

    updateVariables(){
        this._name = this._formEl.querySelector("[id='exampleInputName']").value
        // this._gender = this._formEl.querySelector("[id='exampleInput']").value
        this._birthday = this._formEl.querySelector("[id='exampleInputBirth']").value
        this._country = this._formEl.querySelector("[id='exampleInputCountry']").value
        this._email = this._formEl.querySelector("[id='exampleInputEmail1']").value
        this._password = this._formEl.querySelector("[id='exampleInputPassword1']").value
        // this._photo = this._formEl.querySelector("[id='exampleInputFile']").value
        this._adminBoolean = this._formEl.querySelector("[type='checkbox']").checked
        console.log(this._adminBoolean)
    }

    Initializer(){

        document.getElementById("form-user-create").addEventListener("submit", e => {
    
            e.preventDefault();
            this.updateVariables();
            
          });
    }
}
 
 
var fields = document.querySelectorAll("#form-user-create");
var user = {};
 
 
 
 
