//Masks
$("#inputCEP").mask("99999-999");

function search() {

    console.log("entrei");
    
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