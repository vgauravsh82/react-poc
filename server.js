const express = require('express');
const connectDB = require('./config/db');


const app = express();

connectDB();

app.use(express.json({extended:false}));

app.get('/', (req, res) =>
    res.json({ msg: 'Welcome to the ContactKeepr API ...' }));


app.use('/api/users', require('./routes/users.js'));
app.use('/api/contacts', require('./routes/contacts.js'));
app.use('/api/auth', require('./routes/auth.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on port ' + PORT));