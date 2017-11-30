const express = require('express'),
app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const myApiKey = require('../keys.js');

const Message = require('./models/Message');
const User = require('./models/User');
const Reply = require('./models/Reply');

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
    username: myApiKey.username,
    password: myApiKey.password,
    version_date: myApiKey.version_date
});

getTone = (text) => {
    tone_analyzer.tone({ text: text },
        function (err, tone) {
            if (err)
                console.log(err);
            else
                return JSON.stringify(tone, null, 2);
        });

}

generateToken = (userId) => {
    // create a payload object to be used in the JWT
    let payload = {
        // issuer is which server created this token
        iss: 'rema-server.com',

        // subject field is what user this is on behalf of
        sub: userId,

        // expiration field says how long this is valid for
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }
return jwt.sign(payload, secretKey);

}

const PORT = process.env.PORT || 8080;

//add body parsing to our server so that our endpoints can access req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')) 

//tells our server any request that comes from crazy domains, when you send the response, put a cors header on it 
app.use(cors());

//define the URI or string it should connect to 
//where mongoose should look to connect to your database
const MONGO_CONNECTION_STRING = 'mongodb://localhost:27017/miabDB';

const connection = mongoose.connection;
//tell mongoose to connect to the database
mongoose.connect(MONGO_CONNECTION_STRING);



// Tell Mongoose to use ES6 Promises for its promises
mongoose.Promise = global.Promise;



connection.on("open", () => {
    console.log("We are connected to Mongo.");
    app.listen(PORT, () => {
        console.log("Server running on port " + PORT + ". Enjoy!");
    })
})

let secretKey = "bangbangbang";



app.get('/test', (req, res) => {
    res.send("Test passed")
});

app.post('/validtoken', (req, res) => {
    let tokenFromHeader = req.headers["authorization"];
    jwt.verify(tokenFromHeader, secretKey, (err, decodedPayload) => {
        if (err) {
            // if error verifying
            console.log(err);
            return res.status(301).json('You are unauthorized');
        }
        else
        {
            return res.status(200).json('You are authorized');
        }
    });
});

//create a new message
app.post('/create', (req, res) => {
    let tokenFromHeader = req.headers["authorization"];
    jwt.verify(tokenFromHeader, secretKey, (err, decodedPayload) => {
        if (err) {
            // if error verifying
            
            return res.status(301).json('You are unauthorized');
        }
        tone_analyzer.tone({ text: req.body.message },
            function (err, tone) {
                if (err) {
                    console.log(err);

                } else {

                    let tones = tone.document_tone.tone_categories[0].tones

                    let score = tones.sort(function (a, b) { //Array now becomes [41, 25, 8, 7]
                        return b.score - a.score
                    })[0]
                    User.findById(decodedPayload.sub, function (err, user) { 
                        var Msg = new Message({
                            message: req.body.message,
                            tone: score.tone_name,
                            replies: (req.body.replies),
                            replySentiment: req.body.replySentiment,
                            user_id: user._id,
                            location: user.location
                        });
    
                        Msg.save().then(savedMessage => {
                            res.status(200).json(savedMessage);
                        })
                            .catch(error => {
                            });
                     });
                }
            });

    });
});

//reply to a message
app.post('/reply/:messageId', (req, res) => {
    let tokenFromHeader = req.headers["authorization"];
    jwt.verify(tokenFromHeader, secretKey, (err, decodedPayload) => {
        if (err) {
            // if error verifying
            // return 4XX error status
            console.log(err);
            return res.status(301).json('You are unauthorized');
        }
        tone_analyzer.tone({ text: req.body.message },
            function (err, tone) {
                if (err) {
                    console.log(err);
                } else {
                    let tones = tone.document_tone.tone_categories[0].tones
                    
                    let score = tones.sort(function (a, b) { //Array now becomes [41, 25, 8, 7]
                        return b.score - a.score
                    })[0]
                    Message.findOne({ _id: req.params.messageId })
                    .then(messages => {
                        if(messages.replySentiment.includes(score.tone_name.toLowerCase())){
                            //console.log("Tone criteria met.")
                            User.findById(decodedPayload.sub, function (err, user) { 
                            Reply({
                                message: req.body.message,
                                tone: score.tone_name,//not really
                                user_id: user._id,//get from token saved into state
                                message_id: req.params.messageId,//don't know 
                                isRead: false,
                                location: user.location
                            }).save()
                                .then(savedReply => {
                                    res.status(200).json(savedReply);
                                })
                                .catch(error => {
                                    res.status(500).json({ error: ' we encountered an error' });
                                    //console.log(error);
                                })
                            });
                        }
                        else{
                            //console.log("Tone criteria not met " + score.tone_name.toLowerCase())
                            //console.log("Allowed criteria " + messages.replySentiment.split(','))
                            res.send("Message Sent")
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        res.send('we encountered an error')
                    })
                    
                }
            });
    });
});

//used in homepage
//get ALL messages on homepage
app.get('/messages', (req, res) => {

    let tokenFromHeader = req.headers["authorization"];
    jwt.verify(tokenFromHeader, secretKey, (err, decodedPayload) => {
        if (err) {
            // if error verifying
            console.log(err);
            return res.status(401).json(err);
        }
        console.log(req.headers["filter"]);
        if(req.headers["filter"] !== undefined)
        {
            console.log("filtering");
            Message.find({ tone: req.headers["filter"]})
            .then(messages => {
                //console.log(messages);
                res.json(messages);
            })
            .catch(error => {
                console.log(error);
                res.send('we encountered an error')
            })
        }
        else{
            console.log("not filtering");
        Message.find({})
            .then(messages => {
                //console.log(messages);
                res.json(messages);
            })
            .catch(error => {
                console.log(error);
                res.send('we encountered an error')
            })
        }
    })
})

//get messages in inbox
//need to figure out how to input user id here
app.get('/getinbox', (req, res) => {
    let tokenFromHeader = req.headers["authorization"];
    jwt.verify(tokenFromHeader, secretKey, (err, decodedPayload) => {
        if (err) {
            // if error verifying
            // return 4XX error status
            
            return res.status(301).json('You are unauthorized');

        }
        console.log(req.headers["filter"]);
        if(req.headers["filter"] !== undefined)
        {
            console.log("filtering");
            Message.find({ tone: req.headers["filter"]})
            .then(messages => {
                //console.log(messages);
                res.json(messages);
            })
            .catch(error => {
                console.log(error);
                res.send('we encountered an error')
            })
        }
        else{
        Message.find({ user_id: decodedPayload.sub })
            .then(messages => {
                //console.log(messages);
                res.json(messages);
            })
            .catch(error => {
                console.log(error);
                res.send('we encountered an error')
            })
        }
    })
})
//open individual message (onclick event) from homepage or inbox
app.get('/message/:messageId', (req, res) => {
    let tokenFromHeader = req.headers["authorization"];
    jwt.verify(tokenFromHeader, secretKey, (err, decodedPayload) => {
        if (err) {
            // if error verifying
            // return 4XX error status
            console.log(err);
            return res.status(301).json('You are unauthorized');
        }
        Message.findOne({ _id: req.params.messageId })
            .then(messages => {
                messages.isRead = true;
                messages.save();
                res.json(messages);
            })
            .catch(error => {
                console.log(error);
                res.send('we encountered an error')
            })
    })
})


//gets replies for individual message in inbox
app.get('/replies/:messageId', (req, res) => {
    let tokenFromHeader = req.headers["authorization"];
    jwt.verify(tokenFromHeader, secretKey, (err, decodedPayload) => {
        if (err) {
            // if error verifying
            // return 4XX error status
            console.log(err);
            return res.status(301).json('You are unauthorized');
        }
        Reply.find({ message_id: req.params.messageId })
            .then(messages => {
                res.json(messages);
            })
            .catch(error => {
                console.log(error);
                res.send('/replies/' + req.param.message_id + ', we encountered an error')
            })
    })
})

//used in landing page
//signup
app.post('/signup', (req, res) => {
    // extract username and password from the body
    //  of the post request
    uName = req.body.username.toLowerCase();
    pass = req.body.password;
    loc = req.body.location;

    if (uName.length < 1 || pass.length < 1 || loc.length < 1) {
        return res.json('Invalid username, password or location')
    }

    // use bcrypt to hash the new user password
    // generate salt with work factor of 12
    bcrypt.genSalt(12, (err, salt) => {
        if (err) {
            return res.send(500);
        }
        bcrypt.hash(pass, salt, (err, hashedPassword) => {
            if (err) {
                return res.send(500);
            }
            // store the new username and hashed password
            // in a 'database' (in our case, an array)
            new User({
                username: uName,
                password: hashedPassword,
                location: loc
            }).save().then(newUser => {
                res.status(200).json(generateToken(newUser._id));
            })
                .catch(error => {
                    res.status(500).json({ error: ' we encountered an error' });
                });

        });
    });
});

//used in landing page
//login
app.post('/login', (req, res) => {
    // extract the username and password guess from the body
    const uName = req.body.username.toLowerCase(),
        passwordGuess = req.body.password;

    if (uName.length < 1 || passwordGuess.length < 1) {
        return res.json('Invalid username, password or location')
    }

    // we find the user's hashed password in our database
    // loop through the accounts array to find the user's data
    //  then we use the hashedPassword to see if it matches
    //  the password guess
    User.findOne({ username: uName })
        .then(user => {
            if (user.length < 1) {
                res.status(401).json('Invalid username or password');
            } else {
                bcrypt.compare(passwordGuess, user.password, (err, match) => {
                    if (err) {
                        res.json(user)
                        return res.status(500);
                    }
                    // if 'match' is true, then passwordGuess and the hashed password do match
                    //  we can send back a token or some data to indicate they logged in successfully
                    if (match) {
                        res.status(200).json(generateToken(user._id));
                    }

                    else {
                        // if match is false, then we should deny their
                        //  login request
                        res.status(301).json('Invalid username or password');
                    }
                });
            }
        })
        .catch(error => {
            res.status(301).json('we encountered an error')
            userAccount = null;
        })
});
//serves any files within the build folder
app.use(express.static(__dirname+'/build'))
//allows a request to index.html to be made 
app.get('*', (req, res) => {
    res.sendFile(__dirname+'/build/index.html')
})