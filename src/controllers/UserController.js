const UserModel = require('../models/UserModel')

class UserController {

    async listar(request, response) {
        try {
            const data = await UserModel.findAll({ attributes: ['id', 'firstname', 'surname', 'email'] });

            // Validação para encontrar usuários
            if (data.length === 0) {
                return response.status(400).json({ message: "Nenhum usuário foi encontrado." })
            }

            return response.status(200).json(data)

        } catch (error) {
            return response.status(500).json({
                message: 'Erro interno do servidor.',
                error: error.message
            });

        }
    }

    async consultarPorId(request, response) {

        try {
            const id = request.params.id;
            const data = await UserModel.findByPk(id, { attributes: ['id', 'firstname', 'surname', 'email'] });

            if (!data) {
                return response.status(404).json({ message: "Usuário não foi encontrado." })
            }

            return response.json(data)

        } catch (error) {
            return response.status(500).json({
                message: 'Erro interno do servidor.',
                error: error.message
            });

        }

    }

    async criar(request, response) {
        try {
            const {firstname, surname, email, password, confirmPassword, } = request.body;

            // Validação de usuário já existente
            const userverify =  await UserModel.findOne({
                where: {
                    firstname: firstname,
                    surname: surname
                }
            });

            if(userverify) {
                return response.status(400).json({message: "Usuário já está cadastrado."})
            }
            
            // Validação de email já existente
            const emailverify = await UserModel.findOne({
                where: {
                    email: email
                }
            });

            if(emailverify) {
                return response.status(400).json({message: "Email já está cadastrado."})
            }

            // Validação de dados
            if (!firstname || !surname || !email || !password || !confirmPassword) {
                return response.status(400).json({ message: "Todos os campos são obrigatórios." })
            }

            // Validação de senha
            if (password !== confirmPassword) {
                return response.status(400).json({ message: "A senha não é equivalente à confirmação de senha." })
            }

            await UserModel.create({ firstname, surname, email, password });
            return response.status(201).json({ message: "Usuário cadastrado com sucesso." });

        } catch (error) {
            return response.status(500).json({
                message: 'Erro interno do servidor.',
                error: error.message
            });

        }
    }

    async atualizar(request, response) {
        try {
            const id = request.params.id;
            const { firstname, surname, email } = request.body;

            // Validação de dados
            if (!firstname || !surname || !email) {
                return response.status(400).json({ message: "Todos os campos são obrigatórios." })
            }

            // Verifica se o usuário existe
            const user = await UserModel.findByPk(id);
            if (!user) {
                return response.status(404).json({ message: "Usuário não encontrado." })
            }

            await UserModel.update({ firstname, surname, email }, { where: { id } });

            return response.status(204).send();

        } catch (error) {
            return response.status(500).json({
                message: 'Erro interno do servidor.',
                error: error.message
            });

        }

    }

    async deletar(request, response) {
        try {
            const id = request.params.id;

            // Verifica se o usuário existe
            const user = await UserModel.findByPk(id);
            if (!user) {
                return response.status(404).json({ message: "Usuário não encontrado." })
            }

            await UserModel.destroy({ where: { id } })
            return response.status(204).send();

        } catch (error) {
            return response.status(500).json({
                message: 'Erro interno do servidor.',
                error: error.message
            });

        }
    }
}

module.exports = new UserController();