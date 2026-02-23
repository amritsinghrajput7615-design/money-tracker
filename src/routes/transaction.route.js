const transactionController = require('../controllers/transaction.controller')
const express = require('express')
const authMiddileware = require('../middileware/auth.middileware')

const router = express.Router()

router.post('/create', authMiddileware, transactionController.transactionCreate)
router.get('/', authMiddileware, transactionController.getTransactions)
router.get('/summary', authMiddileware, transactionController.getSummary)
router.get('/:id', authMiddileware, transactionController.getSingleTransaction)
router.delete('/:id', authMiddileware, transactionController.deleteTransaction)

module.exports = router