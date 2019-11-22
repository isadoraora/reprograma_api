const alunas = require("../model/alunas.json")
const fs = require('fs');

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
        res.send('Aluna não encontrada!')
    }
    const livrosAluna = aluna.livros
    const livrosLidos = livrosAluna.filter(livro => livro.leu == 'true')
    const tituloLivros = livrosAluna.map(livros => livros.titulo)
    res.status(200).send(tituloLivros)
}
exports.getSp = (req, res) => {
    const nasceuSp = alunas.filter(aluna => aluna.nasceuEmSp == 'true')
    const paulistas = nasceuSp.map(aluna => aluna.nome)

    res.status(200).send(paulistas)
}
function calcularIdade(anoDeNasc, mesDeNasc, diaDeNasc) {
    const now = new Date()
    const anoAtual = now.getFullYear()
    const mesAtual = now.getMonth() + 1
    const hoje = now.getDate()

    let idade = anoAtual - anoDeNasc
    if (mesAtual < mesDeNasc || (mesAtual == mesDeNasc && hoje < diaDeNasc)) {
        idade -= 1
    }
    return idade
}

exports.getIdades = (req, res) => {
    const id = req.params.id
    const aluna = alunas.find(aluna => aluna.id == id)
    const dataDeNasc = aluna.dateOfBirth
    const arrDataQuebrada = dataDeNasc.split("/")

    const ano = arrDataQuebrada[2]
    const mes = arrDataQuebrada[1]
    const dia = arrDataQuebrada[0]
    const datinha = calcularIdade(ano, mes, dia)

    res.status(200).send({ datinha })
}

exports.post = (req, res) => {
    const { nome, dateOfBirth, nasceuEmSp, id, livros } = req.body;
    alunas.push({ nome, dateOfBirth, nasceuEmSp, id, livros });
    //('./src/model') => tem que ser o caminho absoluto, ou não acha.
    fs.writeFile('./src/model/alunas.json', JSON.stringify(alunas), 'utf8', function (err) {
        if (err) {
            return res.status(500).send({ message: err })
        }
        console.log('The file was saved!')
    })
    return res.status(201).send(alunas)
}

exports.postBooks = (req, res) => {
    const id = req.params.id
    const aluna = alunas.find(aluna => aluna.id == id)
    if (!aluna) {
        res.send("Não encontrei essa garouta!")
    }
    const { titulo, leu } = req.body
    alunas[alunas.id - 1].livros.push({ titulo, leu })

    fs.writeFile("./src/model/alunas.json", JSON.stringify(alunas), 'utf8', function (err) {
        if (err) {
            return res.status(500).send({ message: err })
        }
        console.log("The file was saved!")
    })
    return res.status(201).send(alunas[aluna.id - 1].livros)
}

exports.deletarAluna = (req, res) => {
    const idAluna = req.params.id;

    Alunas.findById(idAluna, function (err, aluna) {
        if (err) return res.status(500).send(err);

        if (!aluna) {
            return res.status(200).send({ message: `Infelizmente não foi possível localizar a aluna com o id ${idAluna}` })
        }
        aluna.remove(function (err) {
            if (!err) {
                res.status(200).send({ message: `Aluna removida com sucesso!` })
            }
        })
    })
}