const model = require('../models/product');
const file = require('../models/file')

module.exports = {
    index: (req, res) =>  res.send(model.all())
       /*  res.render('products/list', {
        styles: ['products/list', 'main'],
        title: 'House of Wines | Productos',
        products: model.all().map(p => Object({...p, image: file.search('id', p.image)}))
    }) */,
    create: (req, res) => res.render('products/create', {
        styles: ['products/create', 'main'],
        title: 'House of Wines | Crear producto'
    }),
    save: (req, res) => {
        req.body.file = req.files;
        let created = model.create(req.body);
        return res.redirect('/products/detail/' + created.id)
    },
    show: (req, res) => {
        let result = model.search('id', req.params.id)
        return result ? res.render('products/detail', {
        styles: ['products/detail', 'main'],
        title: 'House of Wines | ' + result.name,
        product: result
        }) : res.render('error', { msg: 'Producto no encontrado'})
    },
    edit: (req, res) =>  res.render('products/edit', {
        styles: ['products/edit', 'main'],
        title: 'House of Wines | Editar producto',
        product: model.search('id', req.params.id)
    }),
    modify: (req, res) => {
        let updated = model.update(req.params.id, req.body);
        return res.redirect('/products/' + updated.id)
    },
    delete: (req, res) => {
        product.delete(req.body.id);
        return res.redirect('/products/')
    }
}