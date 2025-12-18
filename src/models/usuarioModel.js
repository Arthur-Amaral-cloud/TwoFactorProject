var database = require("../database/config")

function cadastrarUsuario(nome, email, senha) {
    var instrucaoSql = `INSERT INTO Usuario(nome,email,senha) VALUES ('${nome}','${email}',sha2('${senha}',256));`;

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarUsuario
};