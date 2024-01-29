//Masks
$("#inputCEP").mask("99999-999");

var clients = [];

function search() {
    
    var cep = document.getElementById("inputCEP").value;
    var url = `https://viacep.com.br/ws/${cep}/json/`;
    
    $.getJSON(url, (cepResponse) => {

        if (("erro" in cepResponse)) {
            
            showMessage("Não Encontrado!");
            showCepData(cepResponse);
            changePropDisabledOfInputNumber(true);
        }
        else {

            showCepData(cepResponse);
            changePropDisabledOfInputNumber(false);
            showMessage("");
        }

    }).fail((cepResponseFail) => {

        showMessage("CEP Inválido!");
        showCepData(cepResponseFail);
        changePropDisabledOfInputNumber(true);
    });
}

function save() {
    
    var client = {
        id: clients.length + 1,
        fullName: document.getElementById("inputName").value + " " + document.getElementById("inputLastName").value,
        adress: document.getElementById("inputAdress").value + ", " + document.getElementById("inputNumber").value,
        cep: document.getElementById("inputCEP").value,
        neighborhood: document.getElementById("inputNeighborhood").value,
        city: document.getElementById("inputCity").value,
        state: document.getElementById("inputState").value
    }

    addNewRow(client);

    clients.push(client);

    document.getElementById("formClient").reset();

    changePropDisabledOfInputNumber(true);
}

function addNewRow(client) {
    var table = document.getElementById("clientsTable");
    var newRow = table.insertRow();

    //Insert id client
    var idNode = document.createTextNode(client.id);
    newRow.insertCell().appendChild(idNode);

    //Insert fullName client
    var fullNameNode = document.createTextNode(client.fullName);
    newRow.insertCell().appendChild(fullNameNode);

    //Insert adress client
    var adressNode = document.createTextNode(client.adress);
    newRow.insertCell().appendChild(adressNode);

    //Insert cep client
    var cepNode = document.createTextNode(client.cep);
    newRow.insertCell().appendChild(cepNode);

    //Insert neighborhood client
    var neighborhoodNode = document.createTextNode(client.neighborhood);
    var cell = newRow.insertCell();
    cell.className = "d-none d-md-table-cell";
    cell.appendChild(neighborhoodNode);

    //Insert city client
    var cityNode = document.createTextNode(client.city);
    var cell = newRow.insertCell();
    cell.className = "d-none d-sm-table-cell";
    cell.appendChild(cityNode);

    //Insert state client
    var stateNode = document.createTextNode(client.state);
    var cell = newRow.insertCell();
    cell.className = "d-none d-sm-table-cell";
    cell.appendChild(stateNode);
}

function showMessage(msg) {
    document.getElementById("msg").innerHTML = `<p class="text-danger align-items-end pt-2 m-0">${msg}</p>`;
}

function changePropDisabledOfInputNumber(state) {
    $("#inputNumber").prop("disabled", state);
}

function showCepData(cepResponse) {
    document.getElementById("inputAdress").value = cepResponse.logradouro || "";
    document.getElementById("inputNeighborhood").value = cepResponse.bairro || "";
    document.getElementById("inputCity").value = cepResponse.localidade || "";
    document.getElementById("inputState").value = cepResponse.uf || "";
}