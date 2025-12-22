var nome = document.getElementById("ipt_nome")
var email = document.getElementById("ipt_email")
var senha = document.getElementById("ipt_senha")
var confirmarSenha = document.getElementById("ipt_confirmarsenha")
var sobrecargaBotao = false

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function cadastrar() {
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
    var senhaCriptografada = criptografarSenha(senha.value)
    setTimeout(() => {
        document.querySelector(".texto-erro-config").classList.remove("oculto")
    }, 30000)
    var axCadastro = false
    while (!axCadastro) {
        await fetch('/usuarios/cadastrarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome.value,
                email: email.value,
                senha: senhaCriptografada
            })
        })
            .then(function (resposta) {
                if (resposta.ok) {
                    axCadastro = true
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                console.log('Ocorreu ao criar o usuário.');
            });
        await delay(5000)
        console.log(axCadastro)
    }
    setTimeout(() => {
        document.getElementById("texto_tela_escura2").classList.remove("oculto")
        document.getElementById("texto_tela_escura1").classList.add("oculto")
        document.getElementById("nome_user").innerHTML = nome.value
        setTimeout(() => {
            document.getElementById("texto_tela_escura3").classList.remove("oculto")
            document.getElementById("texto_tela_escura2").classList.add("oculto")
            setTimeout(() => {
                window.location.href = "login.html"
            },6000)
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

function criptografarSenha(senha) {
    var senhaModificada = ""
    var senhaCriptografada = ""
    for (let i = senha.length - 1; i >= 0; i--) {
        senhaModificada += senha[i]
    }
    const caracteresOrdenados = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ç', 'á', 'à', 'ã', 'â', 'é', 'ê', 'í', 'ó', 'õ', 'ô', 'ú', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ç', 'Á', 'À', 'Ã', 'Â', 'É', 'Ê', 'Í', 'Ó', 'Õ', 'Ô', 'Ú', '\'', '-', '=', '[', '~', ']', ',', '.', ';', '/', '\\', ' ', '"', '!', '@', '#', '$', '%', '¨', '&', '*', '(', ')', '_', '+', '{', '^', '}', '<', '>', ':', '?', '|', '¹', '²', '³', '£', '¢', '¬', '§', 'ª', 'º', '°'];
    const caracteresCriptografia = ['º', 'ª', '§', '¬', '¢', '£', '³', '²', '¹', '|', '?', ':', '>', '<', '}', '^', '{', '+', '_', '(', ')', '*', '&', '¨', '%', '$', '#', '@', '!', '"', ' ', '\\', '/', ';', '.', ',', ']', '~', '[', '=', '-', '\'', 'Ú', 'Ô', 'Õ', 'Ó', 'Í', 'Ê', 'É', 'Â', 'Ã', 'À', 'Á', 'Ç', 'Z', 'Y', 'X', 'W', 'V', 'U', 'T', 'S', 'R', 'Q', 'P', 'O', 'N', 'M', 'L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A', 'ú', 'ô', 'õ', 'ó', 'í', 'ê', 'é', 'â', 'ã', 'à', 'á', 'ç', 'z', 'y', 'x', 'w', 'v', 'u', 't', 's', 'r', 'q', 'p', 'o', 'n', 'm', 'l', 'k', 'j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0', '°'];
    for (let i = 0; i < senhaModificada.length; i++) {
        for (let x = 0; x < caracteresOrdenados.length; x++) {
            if (senhaModificada[i] == caracteresOrdenados[x]) {
                senhaCriptografada += caracteresCriptografia[x]
                break
            }
        }
    }
    return senhaCriptografada
}
