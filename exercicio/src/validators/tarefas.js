const yup = require('yup')

exports.tarefaSchema = yup.object().shape({
    title: yup.string().required('Título é obrigatório'),
    nameColaborator: yup.string().required('Autor (a) é obrigatório'),
    discription: yup.array().min(1).required('Esse campo é obrigatório')
}).required('O formulário não pode ser vazio')