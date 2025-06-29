const CategoryModel = require('../models/CategoryModel');

class CategoryController {

    async listar(request, response) {
        try {
            const { limit = 12, page = 1, fields, use_in_menu } = request.query;

            // Validação de tipo
            const Limit = parseInt(limit);
            const Page = parseInt(page);
            if (fields) {
                var fieldArray = fields.split(',');
            }
            // Valida se o número está entre -1 e numeros positivos
            if (Limit !== -1 && (isNaN(Limit) || Limit <= 0)) {
                return response.status(400).json({ message: "O limit precisa ser positivo ou -1" })
            }

            // Identifica se o usuário utilizou use_in_menu ou não
            const menucondition = use_in_menu !== undefined ? { use_in_menu: use_in_menu === true } : {};

            // Faz a busca de acordo com o limit (qtd itens por pagina) e page (qtd paginas)
            const data = await CategoryModel.findAll({
                where: menucondition,
                attributes: fieldArray ? fieldArray : ['id','name','slug','use_in_menu'],
                limit: Limit === -1 ? undefined : Limit,
                offset: Limit === -1 ? 0 : (Page - 1) * Limit
            });
            
            // propriedade limit define quantas categorias devem aparecer
            // offset define quais serão os itens em cada página através de uma fórmula que identifica em que página o usuário está, e quais os respectivos itens dessa página

            // Conta a quantidade de linhas de categoria no banco, à partir do use in menu
            const totalcategory = await CategoryModel.count({ where: menucondition });

            const resposta = {
                data: data,
                total: totalcategory,
                limit: Limit,
                page: Page
            }

            // Validação para encontrar categorias
            if (data.length === 0) {
                return response.status(400).json({ message: "Nenhuma categoria foi encontrada." })
            }

            return response.status(200).json(resposta)

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
            const data = await CategoryModel.findByPk(id, { attributes: ['id', 'name', 'slug', 'use_in_menu'] });

            if (!data) {
                return response.status(404).json({ message: "Categoria não foi encontrada." })
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

            const {name, slug, use_in_menu } = request.body;

            // Validação de name já existente
            const categorynameverify = await CategoryModel.findOne({
                where: {
                    name: name
                }
            });

            if (categorynameverify) {
                return response.status(400).json({ message: "O nome da categoria já está cadastrado." })
            }

            // Validação de slug já existente
            const categoryslugverify = await CategoryModel.findOne({
                where: {
                    slug: slug
                }
            });

            if (categoryslugverify) {
                return response.status(400).json({ message: "O slug da categoria já está cadastrado." })
            }

            await CategoryModel.create({name, slug, use_in_menu });
            return response.status(201).json({ message: "Categoria cadastrada com sucesso." });

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
            const { name, slug, use_in_menu } = request.body;

            // Validação de dados
            if (!name || !slug || !use_in_menu) {
                return response.status(400).json({ message: "Todos os campos são obrigatórios." })
            }

            // Verifica se a categoria existe
            const categoryexists = await CategoryModel.findByPk(id);
            if (!categoryexists) {
                return response.status(404).json({ message: "Categoria não encontrada." })
            }

            await CategoryModel.update({ name, slug, use_in_menu }, { where: { id } });

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

            // Verifica se a categoria existe
            const categorydelete = await CategoryModel.findByPk(id);
            if (!categorydelete) {
                return response.status(404).json({ message: "Categoria não encontrada." })
            }

            await CategoryModel.destroy({ where: { id } })
            return response.status(204).send();

        } catch (error) {

            return response.status(500).json({
                message: 'Erro interno do servidor.',
                error: error.message
            });

        }
    }
}

module.exports = new CategoryController();