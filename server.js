require('dotenv').config({ path: './config/.env' })
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const router = express.Router();
const app = express();
const port = 5000;


app.use(express.json());
app.use('/api/users', router);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to the database')
    } catch (error) {
        console.log(error)
    }

}

// CONNECTING TO THE DATABASE WE CALL ITS FUNCTION

connectDB();



//RETURN ALL USERS
// METHOD GET

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users)

    } catch (error) {
        res.status('500').send('server error')
    }
})


// ADD A NEW USER TO THE DATABASE
//METHOD GET

router.post('/', async (req, res) => {
    const { name, age, email } = req.body
    try {
        const newUser = new User({ name, age, email });
        await newUser.save();
        res.send('User added successfully');
    } catch (error) {
        res.status('500').send('server error')
    }
})


// EDIT A USER BY ID
// METHOD PUT


router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndUpdate(id, { $set: { ...req.body } });
        res.send('User Updated successfully')

    } catch (error) {
        res.status('500').send('server error')
    }
})



// DELETE A USER BY ID
// METHOD DELETE

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.send('User deleted successfully');
    } catch (error) {
        res.status('500').send('server error')
    }
})


app.listen(port, () => console.log(`Server running on port ${port}`));

