//Set up the express app
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const port = 3080;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

let currentUser = null;
let userStillPresent = false;


const getCurrentTimeSec = () => {
    return parseInt(new Date() / 1000);
}

app.get('/', (req, res) => {
    res.send(`<h1>API Running on the port ${port}</h1>`);
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

app.get('/api/user/', (req, res) => {
    const currentTime = getCurrentTimeSec();
    if (userStillPresent && currentTime - userStillPresent > 1) {
        userStillPresent = false;
        currentUser = null;
    }
    res.json(currentUser);
});

app.post('/api/selectUser', (req, res) => {
    const user = req.body.userData;
    if (!currentUser) {
        currentUser = user;
        res.json(currentUser)
    }
    res.json({ userId: false });
})

app.post('/api/saveMessage', (req, res) => {
    const message = req.body.message;
    if (currentUser && currentUser.messages)
        currentUser.messages.unshift({
            message,
            timestamp: new Date()
        });
    res.json(currentUser)
})

app.get('/api/confirmUserPresence', (req, res) => {
    userStillPresent = getCurrentTimeSec();
    res.send()
})