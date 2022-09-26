const router = require('express').Router();
const User = require('../Models/User')
const bcrypt = require('bcrypt')




//update user
router.put('/:id', async (req, res)=>{
    //if the user id does not match with that id
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(error){
                return res.status(500).json(error);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                //this will automatically set all inputs inside the body
                $set: req.body
            });
            res.status(200).json('Account has been updated')
        } catch(error){
            return res.status(500).json(error)
        }

    } else{
        return res.status(403).json('Updates are only possible on your account')
    }
});

//delete user
router.delete('/:id', async (req, res)=>{
    //if the user id does not match with that id
    if(req.body.userId === req.params.id || req.body.isAdmin){
     
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Account has been deleted')
        } catch(error){
            return res.status(500).json(error)
        }

    } else{
        return res.status(403).json('You can only delete your own account')
    }
});


//get a user
// router.get('/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)

//         //take away what we dont want to see
//         const {password, email, isAdmin, ...other } = user._doc
//         res.status(200).json(other)

//     } catch (error) {
//         res.status(500).json(error)
//     }
// });

router.get('/', async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId 
        ? await User.findById(userId) 
        : await User.findOne({username: username})
        //take away what we dont want to see
        const {password, email, isAdmin, ...other } = user._doc
        res.status(200).json(other)

    } catch (error) {
        res.status(500).json(error)
    }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
    //if it is not the same user
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currUser = await User.findById(req.auth.userId);

            if(!user.followers.includes(req.auth.userId)){
                await user.updateOne({$push:{followers: req.auth.userId}});
                await currUser.updateOne({$push:{following: req.params.id}});
                res.status(200).json('user followed')

            } else {
                res.status(403).json('you already follow this user')
            }

        } catch (error) {
            res.status(500).json(error)  
        }

    } else {
        //if it is the same user
        res.status(403).json('you can not follow yourself')
    }
})

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    //if it is not the same user
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currUser = await User.findById(req.body.userId);

            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers: req.body.userId}});
                await currUser.updateOne({$pull:{following: req.params.id}});
                res.status(200).json('user unfollowed')

            } else {
                res.status(403).json('you do not follow this user')
            }

        } catch (error) {
            res.status(500).json(error)  
        }

    } else {
        //if it is the same user
        res.status(403).json('you can not unfollow yourself')
    }
})


router.get('/', (req, res) =>{
    res.send('hey the user route is working')
})

module.exports = router;