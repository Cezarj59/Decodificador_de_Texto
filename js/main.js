
semMensagem()
function semMensagem() {
    let mensagem = ('<div class="msgInicial">' +
        ' <img src="./style/img/lupa.png" width="336" alt="">' +
        '<p class="titulo">Nenhuma mensagem encontrada.</p>' +
        '<p class="msn_alerta">Digite um texto que você deseja criptografar ou descriptografar.</p>' +
        '</div>');

    document.getElementById('areaDecodificacao').innerHTML += mensagem;
}
function errorReplaceClass() {
    document.getElementById('textoVetor').classList.replace("alertVetor", "pError");
    document.getElementById('iconeVetor').classList.replace("vetor", "vetorError");
    document.getElementById('area').classList.replace("boxArea", "boxAreaError");
    document.getElementById('areaDecodificacao').classList.replace("localTexto", "localTextoError");
}
function errorFormatClass() {
    document.getElementById('textoVetor').classList.replace("pError", "alertVetor");
    document.getElementById('iconeVetor').classList.replace("vetorError", "vetor");
    document.getElementById('area').classList.replace("boxAreaError", "boxArea");
    document.getElementById('areaDecodificacao').classList.replace("localTextoError", "localTexto");
}
function error() {
    limpaAreaTexto();
    errorReplaceClass();
    let mensagem = ('<div class="msg_error">' +
        '<p class="titulo">ERROR</p>' +
        '<p class="msn_alerta">Você digitou caracteres inválidos.' + '</br> ' + 'Tente Novamente...' +
        '</div>');

    setTimeout(function () {
        limpaAreaTexto();
        limpaAreaDigitada();
        errorFormatClass();
        semMensagem();
        document.getElementById("digiteTexto").placeholder = 'Tente novamente...';
    }, 3000
    );
    document.getElementById('areaDecodificacao').innerHTML += mensagem;
}
function error2() {
    limpaAreaTexto();
    errorReplaceClass();
    let mensagem = ('<div class="msg_error">' +
        '<p class="titulo">ERROR</p>' +
        '<p class="msn_alerta">Digite algo cabeção...' +
        '</div>');

    setTimeout(function () {
        limpaAreaTexto();
        limpaAreaDigitada();
        errorFormatClass()
        semMensagem();
        document.getElementById("digiteTexto").placeholder = 'DIGITE AQUI...';
    }, 2000
    );
    document.getElementById('areaDecodificacao').innerHTML += mensagem;
}
function verificaCaracteres(texto) {
    let textoDigitado = texto;
    let textoArray = [...textoDigitado]

    const caracteresInvalidos = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕśŚ0123456789_-";
    const caracteresInvalidosArray = [...caracteresInvalidos];

    let index = 0;
    let contador = 0;

    while (index < textoArray.length) {
        while (contador < caracteresInvalidosArray.length && textoArray[index] != caracteresInvalidosArray[contador]) {
            contador++;
        }
        if (/[A-Z]/.test(textoArray) || textoArray[index] == caracteresInvalidosArray[contador]) {
            return true;
        }
        contador = 0;
        index++;
    }
    return false;
}
function codifica(texto) {

    let textoDigitado = texto;

    let distribuidoNoArray = [...textoDigitado];

    const letras = ['a', 'e', 'i', 'o', 'u'];
    const chaves = ['ai', 'enter', 'imes', 'ober', 'ufat'];



    for (let indice = 0; indice < distribuidoNoArray.length; indice++) {

        for (let i = 0; i < letras.length; i++) {

            if (distribuidoNoArray[indice] == letras[i]) {

                const substituicao = distribuidoNoArray.indexOf(distribuidoNoArray[indice]);

                if (substituicao !== -1) {
                    distribuidoNoArray[substituicao] = chaves[i];
                }
            }
        }
    }



    const textoCodificado = distribuidoNoArray.join('');

    return textoCodificado;
}
function criptografar() {
    let texto = document.getElementById('digiteTexto').value;

    if (document.getElementById('digiteTexto').value == "") {
        error2();
    } else if (verificaCaracteres(texto) == false) {
        limpaAreaTexto()
        document.getElementById('areaDecodificacao').innerHTML += codifica(texto);
        botaoCopiar();
    } else {
        error();
    }

}

function descriptografar() {

    const letras = ['a', 'e', 'i', 'o', 'u'];
    const chaves = ['ai', 'enter', 'imes', 'ober', 'ufat'];


    let textoDigitado = document.getElementById('digiteTexto').value;
    let arrayDePalavras = textoDigitado.split(' ');

    if (document.getElementById('digiteTexto').value == "") {
        error2();
    } else if (verificaCaracteres(textoDigitado) == false) {
        limpaAreaTexto()
        for (let indice = 0; indice < arrayDePalavras.length; indice++) {
            for (let i = 0; i < chaves.length; i++) {
                const substituicao = arrayDePalavras.indexOf(arrayDePalavras[indice]);
                if (substituicao !== -1) {
                    arrayDePalavras[substituicao] = arrayDePalavras[indice].replaceAll(chaves[i], letras[i]);
                }
            }
        }
        let resultado = arrayDePalavras.join(' ');
        document.getElementById('areaDecodificacao').innerHTML += resultado;
        botaoCopiar();
    } else {
        error();
    }
}
function copiar() {

    const textoParaCopiar = document.getElementById('areaDecodificacao').innerHTML;

    if (navigator.clipboard.writeText(textoParaCopiar)) {
        document.getElementById("copiar").textContent = 'COPIADO';
        limpaAreaDigitada();
        document.getElementById("digiteTexto").placeholder = 'Texto copiado...';
    }

    setInterval(function () {
        document.getElementById("copiar").textContent = 'Copiar';
        document.getElementById("digiteTexto").placeholder = 'Cole aqui, ou digite outro texto..';
    }, 5000
    );
}
function limpaAreaTexto() {
    document.getElementById('areaDecodificacao').innerHTML = "";
    document.getElementById('secondArea').innerHTML = "";
}
function limpaAreaDigitada() {
    document.getElementById('digiteTexto').value = "";
}
function botaoCopiar() {
    const copyButton =
        "<div>" +
        "<button id='copiar' onclick='copiar()'>" + "Copiar" + "</button>" +
        "</div>";
    return document.getElementById('secondArea').innerHTML += copyButton;
}
