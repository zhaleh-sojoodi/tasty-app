const express = require('express')
const { check } = require('express-validator')
const userController = require('../controller/user-controller')
const imageUpload = require('../middleware/image-upload')
//const {Storage} = require('@google-cloud/storage')

const router = express.Router()

router.get('/', userController.getUsers)
router.get('/:userId' , userController.getUserById)
router.post(
    '/signup',
    imageUpload.single('image'),
    [
        check('name').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min : 6 }),
        check('biography').isLength({ max : 50})
    ],
    userController.signup)
router.post('/login', userController.login)
router.patch('/:userId', userController.update)

module.exports = router 
