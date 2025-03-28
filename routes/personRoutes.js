const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require('./../jwt');

const Person = require('../models/Person');
const { authorize } = require('passport');

router.post('/signup', async (req, res) => {

    try {
        const data = req.body

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('Data Saved');

        const payload = {
            id : response.id,
            username: response.username
        }
        const token = generateToken(payload);
        console.log("Token is:", token);

        res.status(200).json({ response: response, token: token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });;
    }

})



router.get('/', jwtAuthMiddleware,async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data fetch');
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'manager' || workType == 'chef') {
            const response = await Person.find({ work: workType });
            console.log('Data fetch');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updateData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updateData, {
            new: true,
            runValidators: true
        })

        if (!response) {
            res.status(404).json("Person not found");
        }

        console.log('Data Update');
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            res.status(404).json("Person not found");
        }

        console.log('Data Delete');
        res.status(200).json("Person deleted");

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router; 