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
       this._mainPanel = document.querySelector(".table.table-striped");
       this.addLine()
       this.Initializer()
    }

    addLine(){
        console.log("Adicionando linhas");
        let rowToBeAdded = document.createElement("tbody");
        rowToBeAdded.innerHTML = `
        <tr>
            <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
            <td>${this._name}</td>
            <td>${this._email}</td>
            <td>${this._adminBoolean ? "Sim" : "Não"}</td>
            <td>${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>`
        this._mainPanel.append(rowToBeAdded);


    }

    updateVariables(){
        this._name = this._formEl.querySelector("[id='exampleInputName']").value;
        this._gender = this._formEl.querySelector("[id='exampleInputGenderM']").checked ? "Masculino" : "Feminino";
        this._birthday = this._formEl.querySelector("[id='exampleInputBirth']").value 
        this._country = this._formEl.querySelector("[id='exampleInputCountry']").value;
        this._email = this._formEl.querySelector("[id='exampleInputEmail1']").value;
        this._password = this._formEl.querySelector("[id='exampleInputPassword1']").value;
        this._photo = this._formEl.querySelector("[id='exampleInputFile']").value
        this._adminBoolean = this._formEl.querySelector("[type='checkbox']").checked;
    }

    Initializer(){

        document.getElementById("form-user-create").addEventListener("submit", e => {
    
            e.preventDefault();
            this.updateVariables();
            this.addLine();

          });
    }
}
 
 
var fields = document.querySelectorAll("#form-user-create");
var user = {};
 
 
 
 
