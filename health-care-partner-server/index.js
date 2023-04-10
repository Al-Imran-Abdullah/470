const express = require('express');
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config()

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }), cors())

const port = 5001;

app.get('/', (req, res) => {
    res.send('Welcome to The Backend!')
})

const uri = "mongodb+srv://gudduraufu:camWUWDJyaCvbq0P@cluster0.fswacqy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
    const usersCollection = client.db("health-care").collection("users");
    const waterCollection = client.db("health-care").collection("water");
    const moodCollection = client.db("health-care").collection("mood");

    // login
    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const user = await usersCollection.findOne({ email, password });

        user ?
            res.send({
                status: true,
                message: "Logged In Successfully!",
                user
            })
            :
            res.send({
                status: false,
                message: "Email and Password does not match!"
            })
    })

    // Add New User
    app.post('/addUser', (req, res) => {
        const user = req.body;
        usersCollection.findOne({ email: req.body.email }, (err, result) => {
            err && res.send({
                status: false,
                message: 'There is an error adding new user. Please try again later!',
            })
            result ?
                res.send({
                    status: false,
                    message: 'User Already Exists!'
                }) :
                usersCollection.insertOne(user, (err, result) => {
                    err && res.send({
                        status: false,
                        message: 'There is an error adding new user. Please try again later!',
                    })
                    result && res.send({
                        status: true,
                        message: 'User Registered Successfully',
                        user
                    });
                });
        });
    })

    // Get All Users
    app.get('/users', (req, res) => {
        usersCollection.find({}).toArray((err, users) => {
            err && res.send({ status: false, message: 'There is an error. Please try again later!' })
            users.length ? res.send({ status: true, users }) : res.send({ status: true, message: 'No users found!' })
        })
    })

    // Get Single User
    app.get('/user/:id', (req, res) => {
        usersCollection.find({ _id: ObjectId(req.params.id) })
            .toArray((err, documents) => {
                res.send(documents[0]);
            })
    })

    // Update User By Id
    app.patch('/user/:id', (req, res) => {
        usersCollection.updateOne(
            {
                _id: ObjectId(req.params.id),
            },
            {
                $set: req.body
            },
            (err, result) => {
                err &&
                    res.send({
                        status: false,
                        message: "An Error Occurred! Please try again Later"
                    })
                result &&
                    res.send({
                        status: true,
                        message: "User Information Updated Successfully!"
                    })
            }
        )
    })

    app.post('/water', (req, res) => {
        const water = req.body;
        waterCollection.findOne({ date: req.body.date, email:req.body.email }, (err, result) => {
            err && res.send({
                status: false,
                message: 'There is an error. Please try again later!',
            })
            result ?
                res.send({
                    status: false,
                    message: "You have already given input today!"
                }) :
                waterCollection.insertOne(water, (err, result) => {
                    err && res.send({
                        status: false,
                        message: 'There is an error. Please try again later!',
                    })
                    result && res.send({
                        status: true,
                        message: "Water Added Successfully!"
                    })
                });
        });
    })

    app.get('/water', (req, res) => {
        waterCollection.find({}).toArray((err, result) => {
            err && res.send({
                status: false,
                message: "An Error Occurred! Please try again Later"
            })
            result && res.send({ status: true, result })
        })
    })

    app.get('/water-by-email/:email', (req, res) => {
        waterCollection.find({ email: req.params.email }).toArray((err, result) => {
            err && res.send({ status: false, message: "An Error Occurred!" })
            result && res.send({ status: true, result })
        })
    })

    app.post('/mood', (req, res) => {
        const mood = req.body;
        moodCollection.findOne({ date: req.body.date, email: req.body.email }, (err, result) => {
            err && res.send({
                status: false,
                message: 'There is an error. Please try again later!',
            })
            result ?
                res.send({
                    status: false,
                    message: "You have already given input today!"
                }) :
                moodCollection.insertOne(mood, (err, result) => {
                    err && res.send({
                        status: false,
                        message: 'There is an error. Please try again later!',
                    })
                    result && res.send({
                        status: true,
                        message: "Mood Meter Added Successfully!"
                    })
                });
        });
    })

    app.get('/mood', (req, res) => {
        moodCollection.find({}).toArray((err, result) => {
            err && res.send({
                status: false,
                message: "An Error Occurred! Please try again Later"
            })
            result && res.send({ status: true, result })
        })
    })

    app.get('/mood-by-email/:email', (req, res) => {
        moodCollection.find({ email: req.params.email }).toArray((err, result) => {
            err && res.send({ status: false, message: "An Error Occurred!" })
            result && res.send({ status: true, result })
        })
    })

    err ? console.log(err) : console.log("MongoDB Connected")
})

app.listen(process.env.PORT || port, () => {
    console.log(`Backend is Running on port ${port}`);
})