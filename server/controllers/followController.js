module.exports = {
    getWhoIamFollowing: (req, res, next) => {
        const db = req.app.get('db');
        const {id} = req.params //Param is the id of the user who is logged in

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
        db.following.followUser(req.body)
        .then(res => console.log('followed developer', req.body[1]))
        .catch(err => console.log('Error trying to follow user'))
    },

    unFollow: (req, res, next) => {

    },

    // This endpoint gets all the posts of the user that you follow
    followingPosts: (req, res, next) => {
        const db = req.app.get('db')
        const {id} = req.params

        db.following.followingPosts(id)
        .then(posts => {
            res.status(200).send(posts)
        })
        .catch(err => console.log('Error getting people who you follow posts'))
    }
}