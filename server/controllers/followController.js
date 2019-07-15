module.exports = {
    getWhoIamFollowing: (req, res, next) => {
        const db = req.app.get('db');

        //Param is the id of the user who is logged in
        const {id} = req.params

        db.following.getWhoImFollowing(id)
        .then(following => {
            // Destructuring objects that contain user id's in an array 
            let people = []
            following.map(val => {
                people.push(val.followed)
            })
            res.status(200).send(people)
        })
        .catch(err => console.log('Error getting all your followers', err))

        
    },

    follow: (req, res, next) => {
        const db = req.app.get('db')
        const {user_id, otherId} = req.body
        console.log(req.body)
        console.log(user_id, otherId)


    },

    unFollow: (req, res, next) => {

    }
}