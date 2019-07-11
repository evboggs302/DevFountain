module.exports = {
    allUsers: (req, res, next) => {
        const db = req.app.get('db')

        db.marketplace.selectAllDevelopers()
        .then(users => res.status(200).send(users))
        .catch( err => {
            res.send('there was an error')
        })
    }
}