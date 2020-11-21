const yup = require('yup');

yup.setLocale({
    string: {
        min: 'A senha deve conter no mínimo 8 caracteres',
        max: 'A senha deve conter no máximo 15 caracteres'
    }
})

const taskSchema = yup.object().shape({
    descricao: yup.string().required('O preenchimento desse campo é obrigatório'),
    nomeColaborador: yup.string().required('Você precisa inserir o nome do colaborador'),
    password: yup.string().min(8).max(15).required('O campo da senha é obrigatório')
}).required('Esse objeto deve ser preenchido')


module.exports = {
    taskSchema
}