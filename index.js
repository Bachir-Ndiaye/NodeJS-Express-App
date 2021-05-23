const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); //EXPHBS = EXpress HandleBarS
const logger = require('./middleware/logger');
const members = require('./global/members');



const app = express();

// call logger
app.use(logger);

// Handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Render Home page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Members list',
        members
    })
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
/*app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});*/

app.use('/api/members', require('./routes/api/members'));

// Check if there is not a default port available on the environment
// Else use port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));