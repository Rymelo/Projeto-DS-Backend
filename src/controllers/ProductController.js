const ProductImageModel = require('../models/ProductImageModel');
const ProductModel = require('../models/ProductModel');
const ProductOptionsModel = require('../models/ProductOptionsModel');
const CategoryModel = require('../models/CategoryModel');
const ProductCategoryModel = require('../models/ProductCategoryModel');
const { Op } = require('sequelize');

class ProductController {

    constructor() {
        ProductModel.associate({ ProductImageModel, ProductOptionsModel, CategoryModel, ProductCategoryModel });
    }

    async listar(request, response) {
        try {
            const {
                limit = 12,
                page = 1,
                fields,
                match,
                category_ids,
                'price-range': priceRange,
                option
            } = request.query;

            // Validação
            const Limit = parseInt(limit);
            const Page = parseInt(page);
            const attributes = fieldArray ? fieldArray : ['id', 'enabled', 'name', 'slug', 'stock', 'description', 'price', 'price_with_discount']

            if (fields) {
                var fieldArray = fields.split(',');
            }

            // Valida se o número está entre -1 e numeros positivos
            if (Limit !== -1 && (isNaN(Limit) || Limit <= 0)) {
                return response.status(400).json({ message: "O limit precisa ser positivo ou -1" })
            }

            // Merge de where
            const wherecondition = {};

            // Procura a palavra na query match em name e description
            if (match) {
                wherecondition[Op.or] = [
                    { name: { [Op.like]: `%${match}%` } },
                    { description: { [Op.like]: `%${match}%` } }
                ];
            }

            // Busca produtos entre o preço estabelecido
            if (priceRange) {
                const [min, max] = priceRange.split('-').map(parseFloat);
                wherecondition.price = { [Op.between]: [min, max] };
            }

            // Filtro por categoria
            const categoryFilter = category_ids
                ? category_ids.split(',').map(id => parseInt(id))
                : null;

            // include separado
            const include = [
                {
                    model: ProductImageModel,
                    as: 'images',
                    attributes: ['id', 'path']
                },
                {
                    model: ProductOptionsModel,
                    as: 'options',
                    attributes: ['id', 'title', 'shape', 'radius', 'type', 'values']
                },
                {
                    model: CategoryModel,
                    as: 'categories',
                    attributes: ['id'],
                    through: { attributes: [] }
                }
            ];

            // Caso o usuário use o filtro de categorias
            if (categoryFilter) {
                include[2].wherecondition = { id: { [Op.in]: categoryFilter } };
            }

            // Faz a busca de acordo com o limit (qtd itens por pagina) e page (qtd paginas)
            const data = await ProductModel.findAll({
                where: wherecondition,
                attributes,
                include,
                limit: Limit === -1 ? undefined : Limit,
                offset: Limit === -1 ? 0 : (Page - 1) * Limit
            });

            // propriedade limit define quantos produtos devem aparecer
            // offset define quais serão os itens em cada página através de uma fórmula que identifica em que página o usuário está, e quais os respectivos itens dessa página

            // Filtro das opções
            let filteredData = data;
            if (option) {
                const optionValues = option
                    .split(',')
                    .map(val => val.trim().toLowerCase());

                filteredData = data.filter(product =>
                    product.options.some(opt => {
                        const valuesArray = JSON.parse(opt.values || '[]').map(v => v.toLowerCase());
                        return optionValues.some(val => valuesArray.includes(val));
                    })
                );
            }

            const totalproduct = filteredData.length;

            // Formulando o response body de acordo com a documentação
            const responsebody = filteredData.map(data => ({
                id: data.id,
                enabled: data.enabled,
                name: data.name,
                slug: data.slug,
                stock: data.stock,
                description: data.description,
                price: data.price,
                price_with_discount: data.price_with_discount,
                category_ids: data.categories.map(categories => categories.id),
                images: data.images.map(image => ({
                    id: image.id,
                    content: image.path
                })),
                options: data.options.map(option => ({
                    id: option.id,
                    title: option.title,
                    shape: option.shape,
                    radius: option.radius,
                    type: option.type,
                    values: JSON.parse(option.values || '[]')
                }))
            }));


            // permite a inserção de total, limit e page
            const resposta = {
                data: responsebody,
                total: totalproduct,
                limit: Limit,
                page: Page
            }

            // Validação para encontrar produtos
            if (filteredData.length === 0) {
                return response.status(400).json({ message: "Nenhum produto foi encontrado." })
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
            const data = await ProductModel.findByPk(id, {
                attributes: ['id', 'enabled', 'name', 'slug', 'stock', 'description', 'price', 'price_with_discount'],
                include: [
                    {
                        model: ProductImageModel,
                        as: 'images',
                        attributes: ['id', 'path']
                    },
                    {
                        model: ProductOptionsModel,
                        as: 'options',
                        attributes: ['id', 'title', 'shape', 'radius', 'type', 'values']
                    },
                    {
                        model: CategoryModel,
                        as: 'categories',
                        attributes: ['id'],
                        through: { attributes: [] }
                    }
                ]
            });

            // Verifica se o produto existe
            if (!data) {
                return response.status(404).json({ message: "Produto não foi encontrado." })
            }

            const responsebody = {
                id: data.id,
                enabled: data.enabled,
                name: data.name,
                slug: data.slug,
                stock: data.stock,
                description: data.description,
                price: data.price,
                price_with_discount: data.price_with_discount,
                category_ids: data.categories.map(categories => categories.id),
                images: data.images.map(image => ({
                    id: image.id,
                    content: image.path
                })),
                options: data.options.map(option => ({
                    id: option.id,
                    title: option.title,
                    shape: option.shape,
                    radius: option.radius,
                    type: option.type,
                    values: (() => {
                        try {
                            return JSON.parse(option.values);
                        } catch (e) {
                            return [];
                        }
                    })
                }))
            };

            return response.json(responsebody)

        } catch (error) {
            return response.status(500).json({
                message: 'Erro interno do servidor.',
                error: error.message
            });

        }

    }

    async criar(request, response) {
        try {
            const {
                name,
                slug,
                enabled,
                use_in_menu,
                stock,
                description,
                price,
                price_with_discount,
                category_ids,
                images,
                options
            } = request.body;

            // Validação de name já existente
            const Productnameverify = await ProductModel.findOne({
                where: {
                    name: name
                }
            });

            if (Productnameverify) {
                return response.status(400).json({ message: "O nome do produto já está cadastrado." })
            }

            // Validação de slug já existente
            const Productslugverify = await ProductModel.findOne({
                where: {
                    slug: slug
                }
            });

            if (Productslugverify) {
                return response.status(400).json({ message: "O slug do produto já está cadastrado." })
            }

            // Criando produtos
            const product = await ProductModel.create({
                name,
                slug,
                enabled,
                use_in_menu,
                stock,
                description,
                price,
                price_with_discount
            });

            // Preenchendo a tabela intermediária ProductCategoryModel
            if (Array.isArray(category_ids)) {
                const preencherPC = category_ids.map(category_id => ({
                    product_id: product.id,
                    category_id: category_id
                }));
                await ProductCategoryModel.bulkCreate(preencherPC);
            } else {
                return response.status(400).json({ message: "category_ids não está no formato adequado (array)" });
            }

            // Preenchendo a tabela ProductImagesModel
            if (Array.isArray(images)) {
                const preencherPI = images.map(images => ({
                    product_id: product.id,
                    path: images.content
                }));
                await ProductImageModel.bulkCreate(preencherPI);
            } else {
                return response.status(400).json({ message: "images não está no formato adequado (array)" });
            }

            // Preenchendo a tabela ProductOptionsModel
            if (Array.isArray(options)) {
                const preencherPI = options.map(options => ({
                    product_id: product.id,
                    title: options.title,
                    shape: options.shape,
                    radius: parseInt(options.radius) || 0,
                    type: options.type || 'text',
                    values: JSON.stringify(options.values || [])
                }));
                await ProductOptionsModel.bulkCreate(preencherPI);
            } else {
                return response.status(400).json({ message: "options não está no formato adequado (array)" });
            }

            return response.status(201).json({ message: "Produto cadastrado com sucesso." });

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
            const {
                name,
                slug,
                enabled,
                use_in_menu,
                stock,
                description,
                price,
                price_with_discount,
                category_ids,
                images,
                options
            } = request.body;

            // Validação de dados
            if (!name || !slug) {
                return response.status(400).json({ message: "Algumas colunas não podem ficar em branco" })
            }

            // Verifica se o produto existe
            const productexists = await ProductModel.findByPk(id);
            if (!productexists) {
                return response.status(404).json({ message: "Produto não encontrado." })
            }

            // atualiza os dados principais do produto
            await ProductModel.update({
                name,
                slug,
                enabled,
                use_in_menu,
                stock,
                description,
                price,
                price_with_discount
            }, { where: { id } });

            // Atualiza a tabela images em conjunto
            // Primeiro ele destrói e depois atualiza com as novas informações
            await ProductCategoryModel.destroy({ where: { product_id: id } });
            if (Array.isArray(category_ids)) {
                const preencherPC = category_ids.map(category_id => ({
                    product_id: id,
                    category_id: category_id
                }));
                await ProductCategoryModel.bulkCreate(preencherPC);
            } else {
                return response.status(400).json({ message: "category_ids não está no formato adequado (array)" });
            }

            // Atualiza a tabela ProductImagesModel
            // Primeiro ele destrói e depois atualiza com as novas informações
            await ProductImageModel.destroy({ where: { product_id: id } });
            if (Array.isArray(images)) {
                const preencherPI = images.map(images => ({
                    product_id: id,
                    path: images.content
                }));
                await ProductImageModel.bulkCreate(preencherPI);
            } else {
                return response.status(400).json({ message: "images não está no formato adequado (array)" });
            }

            // Preenchendo a tabela ProductOptionsModel
            // Primeiro ele destrói e depois atualiza com as novas informações
            await ProductOptionsModel.destroy({ where: { product_id: id } });
            if (Array.isArray(options)) {
                const preencherPI = options.map(options => ({
                    product_id: id,
                    title: options.title,
                    shape: options.shape,
                    radius: parseInt(options.radius) || 0,
                    type: options.type || 'text',
                    values: JSON.stringify(options.values || [])
                }));
                await ProductOptionsModel.bulkCreate(preencherPI);
            } else {
                return response.status(400).json({ message: "options não está no formato adequado (array)" });
            }

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

            // Verifica se o produto existe
            const productdelete = await ProductModel.findByPk(id);
            if (!productdelete) {
                return response.status(404).json({ message: "Produto não encontrado." })
            }

            // Remove todas as informações relacionadas ao produto
            await ProductCategoryModel.destroy({ where: { product_id: id } });
            await ProductImageModel.destroy({ where: { product_id: id } });
            await ProductOptionsModel.destroy({ where: { product_id: id } });

            // deleta o produto, por fim
            await ProductModel.destroy({ where: { id } })

            return response.status(204).send();

        } catch (error) {
            return response.status(500).json({
                message: 'Erro interno do servidor.',
                error: error.message
            });

        }
    }
}

module.exports = new ProductController();