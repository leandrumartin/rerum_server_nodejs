const router = require('express').Router()
//This controller will handle all MongoDB interactions.
const controller = require('../db-controller.js')

router.route('/')
    .post(controller.query)
    .head(controller.queryHeadRequest)
    .all((req, res, next) => {
        res.statusMessage = 'Improper request method for requesting objects with matching properties.  Please use POST.'
        res.status(405)
        next(res)
    })

module.exports = router
