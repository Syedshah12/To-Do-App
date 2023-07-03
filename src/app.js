const express = require('express');
require('./db/connect');
const port = process.env.PORT || 3000;
const app = express();
const Task = require('./models/schema');
const path = require('path');
const hbs = require('hbs');
const { log } = require('console');
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');


app.listen(port, (req, res) => {
    console.log(`server listening on port :${port}`);
})


// middlewares
app.use(express.json());
app.use(express.static(static_path));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);





app.post('/add', async (req, res) => {
    try {
        const date = new Date();
        const newtask = new Task({
            number: req.body.number,
            name: req.body.name,
            date: new Date().toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
        })
        if ((newtask.number === null) || (newtask.name == '')) {
            res.send('empty fields')

        }
        else {
            const task = await newtask.save();
            res.redirect('/')

        }


    } catch (error) {
        res.status(400).send(error);
    }
})






app.get("/task/:number", async (req, res) => {
    try {
        const number = req.params.number;
        const deltask = await Task.deleteOne({ number: number });
        res.redirect('/')
    } catch (error) {
        res.status(404).send(error);
    }
});




app.get('/add', async (req, res) => {
    try {
        res.render('add');
    } catch (error) {
        res.status(400).send(error);
    }
})

app.get('/', async (req, res) => {
    try {
        const task = await Task.find({})
        res.render('index', {
            data: task
        });
    } catch (error) {
        res.status(404).send(error);
    }

})



app.post('/update/:number', async (req, res) => {
    try {
        const name = req.body.name;
        const number = req.body.number;
        const result = await Task.updateOne({ number: number },
            {
                $set: {
                    number: number,
                    name: name,
                    date: new Date().toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })

                }
            })
        res.redirect('/')
    } catch (error) {
        res.send(error)
    }
})



app.get('/update/:number', async (req, res) => {
    try {
        let number = req.params.number;
        const task = await Task.find({ number: number }, {
            useFindAndModify: false
        });

        res.render('update', {
            number: number
        });
        console.log(number);
    } catch (error) {
        res.send(error)
    }
})