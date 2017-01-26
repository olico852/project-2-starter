const express = require('express')
const router = express.Router()
const publicationController = require('../controllers/publication_controller')
const postController = require('../controllers/post_controller')

router.get('/', publicationController.list)

router.get('/publication/others', publicationController.listAll)

router.get('/new', publicationController.new)

router.get('/:id', publicationController.listOne)

router.get('/:id/edit', publicationController.edit)

router.post('/new', publicationController.create)

router.put('/:id/edit', publicationController.update)

router.delete('/:id', publicationController.delete)

router.post('/:id/comment/new', postController.create)

router.get('/:id/comment/list', postController.list)

module.exports = router
