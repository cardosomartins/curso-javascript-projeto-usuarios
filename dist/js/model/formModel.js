class formModel {
    constructor() {
        this._name;
        this._gender;
        this._birthday;
        this._country;
        this._email;
        this._password;
        this._photo;
        this._photoBase64;
        this._adminBoolean;
        this._formEl = document.getElementById("form-user-create");
        this._mainPanel = document.querySelector(".table.table-striped");
        this.addLine()
        this.Initializer()
    }

    addLine(base64Photo) {
        console.log("Adicionando linhas");
        let rowToBeAdded = document.createElement("tbody");
        rowToBeAdded.innerHTML = `
        <tr>
            <td><img src="${base64Photo}" alt="User Image" class="img-circle img-sm"></td>
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

    getPhoto() {

        return new Promise((resolve, reject) => {

            let fileReader = new FileReader();

            fileReader.onload = () => {
                console.log(fileReader.result);
                // this._photoBase64 = fileReader.result;
                console.log("Funcionou")
                resolve(fileReader.result);
            }

            fileReader.onerror = (e) => {
                console.log("Não Funcionou")
                reject(e);
            }

            fileReader.readAsDataURL(this._photo.files[0]);
        }
        )

    }

    updateVariables() {
        this._name = this._formEl.querySelector("[id='exampleInputName']").value;
        this._gender = this._formEl.querySelector("[id='exampleInputGenderM']").checked ? "Masculino" : "Feminino";
        this._birthday = this._formEl.querySelector("[id='exampleInputBirth']").value
        this._country = this._formEl.querySelector("[id='exampleInputCountry']").value;
        this._email = this._formEl.querySelector("[id='exampleInputEmail1']").value;
        this._password = this._formEl.querySelector("[id='exampleInputPassword1']").value;
        this._photo = this._formEl.querySelector("[id='exampleInputFile']");
        this._adminBoolean = this._formEl.querySelector("[type='checkbox']").checked;
    }


    Initializer() {

        document.getElementById("form-user-create").addEventListener("submit", e => {

            e.preventDefault();
            this.updateVariables();
            this.getPhoto().then(
                (result) => {
                    console.log(`Dentro da promessa: ${result}`);
                    this._photoBase64 = result;
                    this.addLine(this._photoBase64);
                },
                (error) => {
                    console.log(`Dentro da falha: ${result}`);
                    console.error(e);
                }
            );
        });
    }
}



