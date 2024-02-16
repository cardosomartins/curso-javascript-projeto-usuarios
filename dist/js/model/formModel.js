class formModel {
    constructor() {
        this.attributesObject = {};
        this._photoBase64;
        this._formEl = document.getElementById("form-user-create");
        this._mainPanel = document.querySelector(".table.table-striped");
        this._formGroupArray = document.querySelectorAll("#form-user-create [name]");

        this.Initializer()
    }


    insertIntoSessionStorage(object) {
        let storageKey = sessionStorage.getItem(object["email"]) ? sessionStorage.getItem(object["email"]) : object["email"];
        sessionStorage.setItem(storageKey, JSON.stringify(object));
    }

    insertIntoLocalStorage(object) {
        let storageKey = localStorage.getItem(object["email"]) ? JSON.parse(localStorage.getItem(object["email"]))["email"] : object["email"];
        localStorage.setItem(storageKey, JSON.stringify(object));
    }

    renderLines() {
        this._mainPanel.querySelectorAll("*").forEach(element => element.remove());
        Object.keys(localStorage).forEach(key => {
            let rowToBeAdded = document.createElement("tbody");
            let storedParsedEl = JSON.parse(localStorage.getItem(key));
            rowToBeAdded.innerHTML = `
            <tr>
                <td><img src="${storedParsedEl["photo"] ?? "dist/img/anonymous.jpg"}" alt="User Image" class="img-circle img-sm"></td>
                <td>${storedParsedEl["name"]}</td>
                <td class="emailBtn">${storedParsedEl["email"]}</td>
                <td>${storedParsedEl["admin"]}</td>
                <td>${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat editBtn">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat removeBtn">Excluir</button>
                </td>
            </tr>`
            this._mainPanel.append(rowToBeAdded);
        });
    }

    addLine() {
        if (!localStorage.getItem(this.attributesObject["email"])){
            let rowToBeAdded = document.createElement("tbody");
            rowToBeAdded.innerHTML = `
            <tr>
                <td><img src="${this.attributesObject["photo"] ?? "dist/img/anonymous.jpg"}" alt="User Image" class="img-circle img-sm"></td>
                <td>${this.attributesObject["name"]}</td>
                <td class="emailBtn">${this.attributesObject["email"]}</td>
                <td>${this.attributesObject["admin"]}</td>
                <td>${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat editBtn">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat removeBtn">Excluir</button>
                </td>
            </tr>`
            this._mainPanel.append(rowToBeAdded);
        }

    }

    getBase64FromPhoto() {
        return new Promise((resolve, reject) => {

            let fileReader = new FileReader();

            fileReader.onload = () => {
                resolve(fileReader.result);
            }

            fileReader.onerror = (e) => {
                reject(e);
            }
            fileReader.readAsDataURL(this.attributesObject["photo"]);
        });
    }

    async updateVariables(formOrigin) {

        if(formOrigin == "Create") this._formGroupArray = document.querySelectorAll("#form-user-create [name]");
        if(formOrigin == "Edit") this._formGroupArray = document.querySelectorAll("#form-user-edit [name]");

        let promise = [];
        Array.from(this._formGroupArray).forEach(element => {

            if (element.getAttribute("name") == "gender") {
                if (element.checked) {
                    this.attributesObject[element.getAttribute("name")] = element.value;
                }
            }
            else if (element.getAttribute("name") == "admin") {
                element.checked ? this.attributesObject[element.getAttribute("name")] = "Sim" : this.attributesObject[element.getAttribute("name")] = "Não";
            }
            else if (element.getAttribute("name") == "photo") {
                this.attributesObject[element.getAttribute("name")] = element.files[0];
                promise.push(
                    this.getBase64FromPhoto().then(
                        (result) => {
                            this.attributesObject[element.getAttribute("name")] = result;
                        },
                        (error) => {
                            console.log(error);
                        }
                    ))
            }
            else {
                this.attributesObject[element.getAttribute("name")] = element.value;
            }
        });

        await Promise.all(promise);
    }

    removeRow(tr) {
        tr.remove();
        localStorage.removeItem(tr.querySelector(".emailBtn").textContent);
    }

    editUser(tr){
        let emailString = tr.querySelector(".emailBtn").textContent;
        let localStorageEl = JSON.parse(localStorage.getItem(emailString));
        console.log(localStorageEl);
        document.querySelector("#editExampleInputName").value = localStorageEl["name"] ?? " ";
        if(localStorageEl["gender"] == "Masculino"){
            document.querySelector("#editExampleInputGenderM").checked = true;
        }
        else{
            document.querySelector("#editExampleInputGenderF").checked = true;
        }
        document.querySelector("#editExampleInputBirth").value = localStorageEl["birth"] ?? " ";
        document.querySelector("#editExampleInputCountry").value = localStorageEl["country"] ?? " ";
        document.querySelector("#editExampleInputEmail1").value = localStorageEl["email"] ?? " ";
        if(localStorageEl["admin"] == "Sim") document.querySelector("#editCheckbox").checked = true;

    }

    Initializer() {

        this.renderLines();

        document.getElementById("form-user-create").addEventListener("submit", async e => {

            e.preventDefault();
            await this.updateVariables("Create");
            this.addLine()
            //this.insertIntoSessionStorage(this.attributesObject);
            this.insertIntoLocalStorage(this.attributesObject);
        });

        document.getElementById("form-user-edit").addEventListener("submit", async e => {

            e.preventDefault();
            await this.updateVariables("Edit");
            localStorage.removeItem(this.attributesObject["email"]);
            this.renderLines();
            this.addLine()
            //this.insertIntoSessionStorage(this.attributesObject);
            this.insertIntoLocalStorage(this.attributesObject);
        });



        document.querySelectorAll(".editBtn").forEach(btn => {
            btn.addEventListener("click", e => {
                this.editUser(btn.closest('tr'));
                console.log("edit clicked");
            })
        });

        document.querySelectorAll(".removeBtn").forEach(btn => {
            btn.addEventListener("click", e => {
                this.removeRow(btn.closest('tr'));
            })
        });


    }

}