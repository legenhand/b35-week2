const express = require('express');
const app = express();
const port = 8080;
const db = require('./connection/db');


const isLogin = true;
let projects = [{
    id: 1,
    name: 'Project Web Express JS',
    start_date: '2022-05-24',
    end_date: '2022-08-09',
    lengthDate: getDateDifference(new Date('2022-05-24'),new Date('2022-08-09')),
    description: 'web project menggunakan express js',
    technologies: {
        nodejs : true,
        reactjs: true,
        nextjs: true,
        typescript: true
        },
    image: 'webproject.png'
}];

app.set('view engine', 'hbs'); //setup template engine / view engine

app.use('/public', express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));

// FOR TESTING ONLY

app.get('/test',(req,res) =>{


});


// Routing GET
app.get('/', (req, res) => {
    db.connect(function (err, client, done) {
        if (err) throw err;

        const query = 'SELECT * FROM tb_projects';

        client.query(query, function (err, result) {
            if (err) throw err;

            const projectsData = result.rows;
            console.log(processDataProjects(projectsData));
            res.render('index', {projects : projectsData});
        });
        done();
    });
});

app.get('/contact-me', (req, res) => {
    res.render('contact-me');
});

app.get('/project', (req, res) => {
    res.render('project');
});

app.get('/project-detail/:id', (req, res) => {
    db.connect(function (err, client, done) {
        if (err) throw err;
        const id = req.params.id;
        const query = `SELECT * FROM tb_projects where id = ${id}`;

        client.query(query, function (err, result) {
            if (err) throw err;

            const projectsData = result.rows;
            let data = processDataProjects(projectsData);
            res.render('project-detail', { data: data[0] });
        });
        done();
    });
});

app.get('/project-update/:id', (req, res) => {
    db.connect(function (err, client, done) {
        if (err) throw err;
        const id = req.params.id;
        const query = `SELECT * FROM tb_projects where id = ${id}`;

        client.query(query, function (err, result) {
            if (err) throw err;

            const projectsData = result.rows;
            let data = processDataProjects(projectsData);
            res.render('project-update', { data: data[0] });
        });
        done();
    });

});

app.get('/delete-project/:id', (req, res) => {
    const id = req.params.id;
    const removeIndex = projects.findIndex( item => item.id === id );
    projects.splice( removeIndex, 1 );
    res.redirect('/');
});

// Routing POST
app.post('/add-project', (req, res) => {
    addProjects(req.body);
    res.redirect('/');
});

app.post('/project-update/:id', (req, res) => {
    const id = req.params.id;
    updateProjects(id, req.body);
    res.redirect('/');
    console.log(projects)
});

// Start express app
app.listen(port, () => {
    console.log(`Server running on 127.0.0.1:${port}`);
})


// function tambahan


function getDateDifference(startDate, endDate) {
    if (startDate > endDate) {
        console.error('Start date must be before end date');
        return null;
    }
    let startYear = startDate.getFullYear();
    let startMonth = startDate.getMonth();
    let startDay = startDate.getDate();

    let endYear = endDate.getFullYear();
    let endMonth = endDate.getMonth();
    let endDay = endDate.getDate();

    let february = (endYear % 4 == 0 && endYear % 100 != 0) || endYear % 400 == 0 ? 29 : 28;
    let daysOfMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let startDateNotPassedInEndYear = (endMonth < startMonth) || endMonth == startMonth && endDay < startDay;
    let years = endYear - startYear - (startDateNotPassedInEndYear ? 1 : 0);

    let months = (12 + endMonth - startMonth - (endDay < startDay ? 1 : 0)) % 12;

    let days = startDay <= endDay ? endDay - startDay : daysOfMonth[(12 + endMonth - 1) % 12] - startDay + endDay;

    return {
        years: years,
        months: months,
        days: days
    };
}

function addProjects(data) {
    let technologies = {};
    if (data.nodejs){
        technologies.nodejs = true;
    }
    if (data.reactjs){
        technologies.reactjs = true;
    }
    if (data.nextjs){
        technologies.nextjs = true;
    }
    if (data.typescript){
        technologies.typescript = true;
    }

    projects.push({
        id: Math.floor(Math.random() * 1000000),
        name: data.name,
        start_date: data.start_date,
        end_date: data.end_date,
        lengthDate: getDateDifference(new Date(data.start_date),new Date(data.end_date)),
        description: data.description,
        technologies: technologies,
        image: data.image
    });
}

function updateProjects(id, data){
    let elementIndex = projects.findIndex( item => item.id == id );
    projects[elementIndex].name = data.name;
    projects[elementIndex].start_date = data.start_date;
    projects[elementIndex].end_date = data.end_date;
    projects[elementIndex].description = data.description;
    projects[elementIndex].lengthDate = getDateDifference(new Date(data.start_date),new Date(data.end_date));
}

function processDataProjects(data){
    const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    data.map((x)=>{
        x.lengthDate = getDateDifference(new Date(x.start_date), new Date(x.end_date));
        x.start_date = x.start_date.toLocaleDateString('id-ID', dateFormatOptions);
        x.end_date = x.end_date.toLocaleDateString('id-ID', dateFormatOptions);
        if (x.technologies.includes("nodejs")){
            x.technologies.nodejs = true;
        }
        if (x.technologies.includes("reactjs")){
            x.technologies.reactjs = true;
        }
        if (x.technologies.includes("nextjs")){
            x.technologies.nextjs = true;
        }
        if (x.technologies.includes("typescript")){
            x.technologies.typescript = true;
        }
    })
    return data;
}