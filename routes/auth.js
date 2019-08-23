const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


const User = require('../modules/Users')
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get logged in user');
});


router.post('/',
    [check('email', 'Please include a valid email address').isEmail(),
     check('password', 'Password is required').exists()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {email, password}  = req.body;
        try{
            let user = await User.findOne({email});
            console.log(user);
            if(!user){
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            console.log(isMatch);
            if(!isMatch){
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            const payload = {
                user: {id: user.id}
            }
            jwt.sign(payload,config.get('jwtSecret'),
            {
                expiresIn: 36000
            },
                (err, token) => {
                    if(err) throw err;
                    console.error('at step5');
                    res.json({ token });
                }
            );

        }
        catch(err){
            console.log(err);
            return res.status(500).json({ msg: 'Server error' });
        }
    });

module.exports = router;