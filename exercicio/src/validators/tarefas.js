const yup = require('yup')

exports.tarefasSchema = yup.Object().shape({
    concluido: yup.boolean(),
    descricao: yup.string().required('Esse campo é obrigatório'),
    nomeColaborador: yup.string().required('Esse campo é obrigatório')
}).required('Esse objeto não pode ser vazio')