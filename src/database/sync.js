const connection = require('../config/connection')

require('../models/UserModel');
require('../models/ProductModel');
require('../models/ProductImageModel');
require('../models/ProductOptionsModel');
require('../models/CategoryModel');
require('../models/ProductCategoryModel');

connection.sync({force: true});


