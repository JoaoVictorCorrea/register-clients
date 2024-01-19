//Masks
$("#inputCEP").mask("99999-999");

var clients = [];

function search() {
    
    var cep = document.getElementById("inputCEP").value;
    var url = `https://viacep.com.br/ws/${cep}/json/`;
    
    $.getJSON(url, (response) => {

        document.getElementById("inputAdress").value = response.logradouro;
        document.getElementById("inputNeighborhood").value = response.bairro;
        document.getElementById("inputCity").value = response.localidade;
        document.getElementById("inputState").value = response.uf;

        $("#inputNumber").prop("disabled", false);

    }).fail(() => {

        console.log("Erro");
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

    $("#inputNumber").prop("disabled", true);
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
    newRow.insertCell().appendChild(neighborhoodNode);

    //Insert city client
    var cityNode = document.createTextNode(client.city);
    newRow.insertCell().appendChild(cityNode);

    //Insert state client
    var stateNode = document.createTextNode(client.state);
    newRow.insertCell().appendChild(stateNode);
}