var nome = document.getElementById("ipt_nome")
var email = document.getElementById("ipt_email")
var senha = document.getElementById("ipt_senha")
var confirmarSenha = document.getElementById("ipt_confirmarsenha")
var sobrecargaBotao = false

function cadastrar() {
    if (sobrecargaBotao == true) {
        return
    }
    sobrecargaBotao = true
    // Declaração dos textos de erro
    var textoNome = document.getElementById("texto_erro_nome")
    var textoEmail = document.getElementById("texto_erro_email")
    var textoSenha = document.getElementById("texto_erro_senha")
    var textoConfimarSenha = document.getElementById("texto_erro_confirmar")
    // Começo Validacação
    // Nome
    var axValidacao = false
    if (nome.value == null || nome.value == undefined || nome.value.trim().length == 0) {
        axValidacao = true
        textoNome.innerHTML = `Preencha o campo`
        nome.classList.add("error")
    } else {
        textoNome.innerHTML = ``
        nome.classList.remove("error")
    }
    // Email
    let validacaoEmail = validarEmail(email.value)
    if (email.value == null || email.value == undefined || email.value.trim().length == 0) {
        axValidacao = true
        textoEmail.innerHTML = `Preencha o campo`
        email.classList.add("error")
    } else if (!validacaoEmail) {
        axValidacao = true
        textoEmail.innerHTML = `Email Inválido`
        email.classList.add("error")
    } else {
        textoEmail.innerHTML = ``
        email.classList.remove("error")
    }
    // Senha
    if (senha.value == null || senha.value == undefined || senha.value.trim().length == 0) {
        axValidacao = true
        textoSenha.innerHTML = `Preencha o campo`
        senha.classList.add("error")
    } else if (senha.value.length < 8) {
        axValidacao = true
        textoSenha.innerHTML = `Sua senha precisa ter no mínimo 8 caracteres`
        senha.classList.add("error")
    } else {
        textoSenha.innerHTML = ``
        senha.classList.remove("error")
    }
    // Confirmar senha
    if (confirmarSenha.value == null || confirmarSenha.value == undefined || confirmarSenha.value.trim().length == 0) {
        axValidacao = true
        textoConfimarSenha.innerHTML = `Preencha o campo`
        confirmarSenha.classList.add("error")
    } else if (senha.value != confirmarSenha.value) {
        axValidacao = true
        textoConfimarSenha.innerHTML = `As senhas não diferentes`
        confirmarSenha.classList.add("error")
    } else {
        textoConfimarSenha.innerHTML = ``
        confirmarSenha.classList.remove("error")
    }
    if (axValidacao) {
        sobrecargaBotao = false
        return
    }
    console.log("Passei da Validação")
    document.querySelector(".tela-escura").classList.remove("oculto")
    document.getElementById("texto_tela_escura1").classList.remove("oculto")
    document.querySelector(".tela-escura").style.backgroundColor = "#000"
    document.querySelector(".tela-escura").style.animation = "animacaoTelaEscura 20s linear infinite"
    document.querySelector(".button-login").classList.add("oculto")
    setTimeout(() => {
        document.getElementById("texto_tela_escura2").classList.remove("oculto")
        document.getElementById("texto_tela_escura1").classList.add("oculto")
        document.getElementById("nome_user").innerHTML = nome.value
        setTimeout(() => {
            document.getElementById("texto_tela_escura3").classList.remove("oculto")
            document.getElementById("texto_tela_escura2").classList.add("oculto")
        }, 6000)
    }, 6000)
    sobrecargaBotao = false
}


function validarEmail(email) {
    const input = document.createElement('input');
    input.type = 'email';
    input.value = email;
    return input.checkValidity();
}