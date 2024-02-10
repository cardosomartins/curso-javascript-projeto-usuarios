class formModel {
    constructor() {
        this.attributesObject = {};
        this._photoBase64;
        this._formEl = document.getElementById("form-user-create");
        this._mainPanel = document.querySelector(".table.table-striped");        
        this._formGroupArray = document.querySelectorAll("#form-user-create [name]"); 
        this.Initializer()              
    }

    insertIntoSessionStorage(object){
        let id = 1;
        let jsonObject = JSON.stringify(object);
        sessionStorage.setItem(id, jsonObject);
    }

    addLine() {
        let rowToBeAdded = document.createElement("tbody");
        rowToBeAdded.innerHTML = `
        <tr>
            <td><img src="${this.attributesObject["photo"]}" alt="User Image" class="img-circle img-sm"></td>
            <td>${this.attributesObject["name"]}</td>
            <td>${this.attributesObject["email"]}</td>
            <td>${this.attributesObject["admin"]}</td>
            <td>${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        </tr>`
        this._mainPanel.append(rowToBeAdded);
    }

    getBase64FromPhoto() {
        return new Promise((resolve, reject) => {
        

            let fileReader = new FileReader();

            fileReader.onload = () => {
                console.log("Deu bom");
                console.log(this.attributesObject);
                resolve(fileReader.result);
            }

            fileReader.onerror = (e) => {
                console.log("Não Funcionou")
                reject(e);
            }
            fileReader.readAsDataURL(this.attributesObject["photo"]);
        }
        )
    }

    updateVariables() {

        this._formGroupArray = document.querySelectorAll("#form-user-create [name]");
        Array.from(this._formGroupArray).forEach(element => {

            if(element.getAttribute("name") == "gender"){
                if(element.checked){
                    this.attributesObject[element.getAttribute("name")] = element.value;
                }
            }
            else if(element.getAttribute("name") == "admin"){
                element.checked ? this.attributesObject[element.getAttribute("name")] = "Sim" : this.attributesObject[element.getAttribute("name")] = "Não";                    
            }
            else if(element.getAttribute("name") == "photo"){
                this.attributesObject[element.getAttribute("name")] = element.files[0];
                this.getBase64FromPhoto().then((result) => {
                    console.log("Surprisingly it did work!");
                    this.attributesObject[element.getAttribute("name")] = result;
                },
                (error) => {
                    console.log(`Booo-ho, it didn't work!`);
                    console.log(error);
                }
                )
            }
            else{                    
                this.attributesObject[element.getAttribute("name")] = element.value;
            }
        });

        console.log(this.attributesObject);

    }


    Initializer() {

        document.getElementById("form-user-create").addEventListener("submit", e => {


            e.preventDefault();
            this.updateVariables();
            setTimeout(() => {this.addLine()}, 2000);
        });
    }
    
}