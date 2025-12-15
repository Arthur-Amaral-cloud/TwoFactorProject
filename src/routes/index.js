var express = require("express");
var router = express.Router();
var path = require("path");

router.get("/", function (req, res) {
    var caminhoDoArquivo = path.join(__dirname, '..', '..', 'public', 'login.html');

    res.sendFile(caminhoDoArquivo);
});

module.exports = router;