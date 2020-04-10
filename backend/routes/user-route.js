const express = require('express')
const { check } = require('express-validator')
const multer = require('multer')
const userController = require('../controller/user-controller')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

router.get('/', userController.getUsers)
router.get('/:userId' , userController.getUserById)
router.post(
    '/signup',
    [
        check('name').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min : 6 }),
    ],
    userController.signup)
router.post('/login', userController.login)

router.use(checkAuth)

router.patch(
    '/',
    multer().single('image'),
    [check('name').not().isEmpty()],
    userController.update
)

module.exports = router 
