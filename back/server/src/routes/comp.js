const { Router } = require('express')
const {
insertComplaint,
getComplaints,
DeleteComplaint
} = require('../controllers/comp')
const router = Router()
router.post('/insert-complaint',insertComplaint)
router.get('/get-complaints',getComplaints)
router.post('/delete-complaint',DeleteComplaint)
module.exports = router
