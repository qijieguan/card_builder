const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require('cors');
const path  =  require('path');
require('dotenv').config();

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

app.use(cors());

app.use(express.json()); 

const db = mysql.createConnection({ 
    user: process.env.USER_VAL,
    host: process.env.HOST_VAL,
    password: process.env.PASSWORD_VAL,
    database: process.env.DATABASE_VAL 
}); 

//app.use(express.static('client/build'));
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query("SELECT * FROM users WHERE username = ?",
        username,
        (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length > 0) {
                res.send({message: "Username already taken!", error: true});
            }
            else {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) {
                        console.log(err);
                    }
                    else {    
                        db.query("INSERT INTO users (username, password) VALUES (?,?)",
                            [username, hash],
                            (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                            }
                        );
                        console.log(result);
                        res.send({message: "User is successfully registered", error: false});
                    }
                })
            }
        });
    }
)

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.send({auth: false, message: "Token is needed. Please resend it to us!", error: true});
    }
    else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.send({auth: false, message: "Authentication failed. Please try again!", error: true});
            }
            else {
                req.userID = decoded.id;
                next();
            }
        });
    }
}

app.get('/api/auth', verifyJWT, (req, res) => {
    res.send({auth: true, message: "User is authenticated!"});
});

app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query("SELECT * FROM users WHERE username = ?",
        username,
        (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length <= 0) {
                res.send({message: "Invalid username!", error: true});
            }
            else {
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if (response) {
                        const id = result[0].id;
                        const token = jwt.sign({id}, process.env.JWT_SECRET, 
                            {expiresIn: 300}
                        );
                        res.send({message: "Ready to Authenticate", token: token, error: false});
                    }
                    else {
                        res.send({message: "Invalid username/password combination!", error: true});
                    }
                })
            }
        });
    }
)

app.get('/api/namecards', (req, res) => {
    db.query("SELECT * FROM namecards", (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send(result);
    });
});

app.post('/api/insert', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const desc = req.body.desc;
    const img_url = req.body.img_url;

    db.query(
        "INSERT INTO namecards (first_name, last_name, description, image_url) VALUES (?,?,?,?)",
        [fname, lname, desc, img_url],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send('card is added');
        }
    );
});

app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query(
        "DELETE FROM namecards WHERE id = ?",
        id,
        (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send('card is deleted');
        }
    )
});

app.put('/api/update', (req, res) => {
    const id = req.body.id;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const desc = req.body.desc;
    const img_url = req.body.img_url;

    db.query(
        "UPDATE namecards SET first_name = ?, last_name = ?, description = ?, image_url = ? WHERE id = ?",
        [fname, lname, desc, img_url, id],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send('card is updated');
        }
    )
});


/*
app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})
*/ 

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});