const professoras = require("../model/professoras.json")
exports.get = (req, res) => {
    console.log(req.url)
    res.status(200).send(professoras)
}

exports.getById = (req, res) => {
    const id = req.params.id
    const prof = professoras.find(professoras => professoras.id == id)
    delete prof.cpf
    res.status(200).send(prof)
}
// exports.get = (req, res) => {
//     const novaArr = []
//     for (let i = 0; i < professoras.length; i++) {
//         const semCpf = {}
//         semCpf.id = professoras[i].id
//         semCpf.nome = professoras[i].nome
//         semCpf.especialidade = professoras[i].especialidade
//         semCpf.signo = professoras[i].signo
//         novaArr.push(semCpf)
//     }
//     res.status(200).send(novaArr)
// }

//Codigo da Valentina
// exports.get = (req, res) => {
//     const profSemCpf = professoras.map(item => {
//         item.cpf = '*********'
//         return item;
//     })
//     res.status(200).send(profSemCpf)
// }

//Codigo da Shirley
// exports.get = (req, res) => {
//     const profSemCpf = professoras.map(item => {
//         delete item.cpf
//         return item
//     })
//     res.status(200).send(profSemCpf)
// // }
// exports.getById = (req, res) => {
//     const id = req.params.id
//     console.log(id)
//     const professoras = professoras.find(professoras => professoras.id == id)
//     const professorasSemCpf = professoras.map(item => {
//         delete item.cpf
//         return item
//     })
//     res.status(200).send(professorasSemCpf)
// }

// // exports.getCpf = (req, res) => {
// //     for (let i = 0; i < professoras.length; i++) {
//         const professorasSemCpf = professoras.map(function (cpf) {
//             professorasSemCpf.push(professoras[i] - 1)
//             console.log(professorasSemCpf)
//         })
//     }
// }
