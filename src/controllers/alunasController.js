const alunas = require("../model/alunas.json")

exports.get = (req, res) => {
    console.log(req.url)
    res.status(200).send(alunas)
}
//envia aluna de acordo com o id dela
exports.getById = (req, res) => {
    const id = req.params.id
    console.log(id)
    res.status(200).send(alunas.find(aluna => aluna.id == id))
}
//pega o livro de uma aluna especifica
exports.getBooks = (req, res) => {
    const id = req.params.id
    const aluna = alunas.find(aluna => aluna.id == id)
    const livrosAluna = aluna.livros
    const livrosLidos = livrosAluna.filter(livro => livros.leu == 'true')
    const tituloLivro = livrosAluna.map(livros => livros.titulo)
    res.status(200).send(tituloLivro)
}