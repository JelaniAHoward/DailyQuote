const express = require('express');
const axios = require("axios").default;
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let options = {
    method: 'GET',
    url: 'https://healthruwords.p.rapidapi.com/v1/quotes/',
    params: { size: 'medium' },
    headers: {
        'x-rapidapi-host': 'healthruwords.p.rapidapi.com',
        'x-rapidapi-key': '2f13d58d02mshefe904ff90002bap138706jsna5bb44f32ff8'
    }
};

axios.request(options).then(function(response) {
    console.log("got it!");
}).catch(function(error) {
    console.error(error);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post('/', (req, res) => {
    axios.request(options).then((response) => {
        res.redirect(response.data[0].media);
    }).catch((error) => {
        console.error(error);
    });
});


app.listen(3000, () => {
    console.log("We on 3000")
});