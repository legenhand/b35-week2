const express = require('express');
const app = express();
const port = 8080;

const isLogin = true;

app.set('view engine', 'hbs'); //setup template engine / view engine

app.use('/public', express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));

// Routing GET
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/contact-me', (req, res) => {
    res.render('contact-me');
})

app.get('/project', (req, res) => {
    res.render('project');
})



// Routing POST
app.post('/add-project', (req, res) => {
    const data = req.body;
    console.log(data);
    res.redirect('/');
});




// Start express app
app.listen(port, () => {
    console.log(`Server running on 127.0.0.1:${port}`);
})