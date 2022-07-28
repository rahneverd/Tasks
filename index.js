const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Note = require('./models/Note');

mongoose.connect('mongodb://localhost/notes-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get('/', async(req, res) => {
    const notes = await Note.find();
    res.render('index', { notes });
});

app.post('/createNotes', (req, res) => {
    const note = new Note({
        task: req.body.addNote
    });

    note.save()
        .then(result => {
            res.redirect('/');
        }).catch(err => {
            console.log(err);
        }
        );

})

app.get('/delete/:id', (req, res) => {
    console.log(req.params.id)
    Note.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/');
        }).catch(err => {
            console.log(err);
        })
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

