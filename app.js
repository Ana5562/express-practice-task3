const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const db = mongoose.connect('mongodb://localhost/movies');

const app = express();

const Comment = require('./model/comment.js');

app.use(bodyParser.json({ extended: true }));

app.post('/show/:id/comments', async function(req, res) {
    
    let response = await axios.get('http://api.tvmaze.com/shows/' + req.params.id);

    console.log(response.data);
    
    var comment = new Comment();
    comment.show_id = req.params.id;
    comment.name = req.body.name;
    comment.content = req.body.content;
    comment.created_at = new Date(Date.now()).toISOString();

    comment.save(function(err, savedComment) {
        if(err) {
            res.status(500).send({error:"Could not save comment."});
        } else {
            res.send({"success": true});
        }
    });
});

app.listen(3000, () => {
    console.log("Up and running on port 3000!");
});