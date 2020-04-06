
// const Category = require('../models/category')

// // function categoriesIndex (req, res, next) {
// //   Category
// //     .find()
// //     .then(categories => res.json(categories))
// //     .catch(next)
// // }

// // function categoriesShow(req, res, next) {
// //   Category
// //     .findById(req.params.id)
// //     .then(category => res.json(category))
// //     .catch(next)
// // }

// function categoriesCreate(req, res, next) {
//   Category
//     .create(req.body)
//     .then(category => res.status(201).json(category))
//     .catch(next)
// }

// function categoriesUpdate(req, res, next) {
//   Category
//     .findById(req.params.id)
//     .then(category => category.set(req.body))
//     .then(category => category.save())
//     .then(category => res.json(category))
//     .catch(next)
// }

// function categoriesDelete(req, res, next) {
//   Category
//     .findById(req.params.id)
//     .exec()
//     .then(category => category.remove())
//     .then(() => res.sendStatus(204))
//     .catch(next)
// }

// module.exports = {
// //   index: categoriesIndex,
// //   show: categoriesShow,
//   create: categoriesCreate,
//   edit: categoriesUpdate,
//   delete: categoriesDelete
// }