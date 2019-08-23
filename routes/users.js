const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


const User = require('../modules/Users')
const { check, validationResult } = require('express-validator');


const router = express.Router();

router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Please enter valid email').isEmail(),
        check('password', 'Please enter password more than 6 char').isLength(
            { min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        try {
            let user = await User.findOne({ email });

            console.error('at step1');

            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }
            console.error('at step2');
            user = new User(
                {name,
                email,
            password}
            );
            console.error('at step3');
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            console.error('at step4');
            await user.save();

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
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
       
    }

);

module.exports = router;