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
        let storageKey = localStorage.getItem(object["email"]) ? localStorage.getItem(object["email"]) : object["email"];
        localStorage.setItem(storageKey, JSON.stringify(object));
    }


    renderLines() {
        Object.keys(localStorage).forEach(key => {
            let rowToBeAdded = document.createElement("tbody");
            let storedParsedEl = JSON.parse(localStorage.getItem(key));
            rowToBeAdded.innerHTML = `
            <tr>
                <td><img src="${storedParsedEl["photo"] ?? "dist/img/anonymous.jpg"}" alt="User Image" class="img-circle img-sm"></td>
                <td>${storedParsedEl["name"]}</td>
                <td>${storedParsedEl["email"]}</td>
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
        let rowToBeAdded = document.createElement("tbody");
        rowToBeAdded.innerHTML = `
        <tr>
            <td><img src="${this.attributesObject["photo"] ?? "dist/img/anonymous.jpg"}" alt="User Image" class="img-circle img-sm"></td>
            <td>${this.attributesObject["name"]}</td>
            <td>${this.attributesObject["email"]}</td>
            <td>${this.attributesObject["admin"]}</td>
            <td>${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat" id="editButton">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat" id="removeButton">Excluir</button>
            </td>
        </tr>`
        this._mainPanel.append(rowToBeAdded);
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

    async updateVariables() {

        this._formGroupArray = document.querySelectorAll("#form-user-create [name]");
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

    Initializer() {

        this.renderLines();

        document.getElementById("form-user-create").addEventListener("submit", async e => {

            e.preventDefault();
            await this.updateVariables();
            this.addLine()
            //this.insertIntoSessionStorage(this.attributesObject);
            this.insertIntoLocalStorage(this.attributesObject);
        });

        document.querySelectorAll(".removeBtn").forEach(btn => {
            btn.addEventListener("click", e => {
                console.log("remove clicked");
            })
        })

        document.querySelectorAll(".editBtn").forEach(btn => {
            btn.addEventListener("click", e => {
                console.log("edit clicked");
            })
        })



    }

}