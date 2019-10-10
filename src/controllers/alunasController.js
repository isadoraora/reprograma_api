const alunas = require("../model/alunas.json")

exports.get = (req, res) => {
    console.log(req.url)
    res.status(200).send(alunas)
}
//envia aluna de acordo com o id dela
exports.getById = (req, res) => {
    const id = req.params.id
    console.log(id)
    const aluna = alunas.find(aluna => aluna.id == id)

    if (id > 17 || id <= 0) {
        res.redirect(301, 'https://www.mercadolivre.com.br/')
    }
    res.status(200).send(alunas.find(aluna => aluna.id == id))
}
//pega o livro de uma aluna especifica
exports.getBooks = (req, res) => {
    const id = req.params.id
    const aluna = alunas.find(aluna => aluna.id == id)

    if (!aluna) {
        res.send('Não encontrei essa garota!')
    }
    const livrosAluna = aluna.livros
    const livrosLidos = livrosAluna.filter(livro => livro.leu == 'true')
    const tituloLivro = livrosAluna.map(livros => livros.titulo)
    res.status(200).send(tituloLivro)
}

exports.getSp = (req, res) => {
    //const nasceuSp = alunas.nasceuEmSp
  //  const nomePaulista = nasceuSp.filter(aluna => aluna.nasceuEmSp == 'true')
  //const paulistas = nasceuSp.map(aluna => aluna.nome)
    const nasceuSp = alunas.filter(aluna => aluna.nasceuEmSp == 'true')
    const paulistas = nasceuSp.map(aluna => aluna.nome)
    
    res.status(200).send(paulistas)
    

}