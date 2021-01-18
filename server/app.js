let express = require('express');
require('dotenv').config();
const app = express();
const sequelize = require('./db');
let journal = require('./controllers/journalcontroller');
let user = require('./controllers/usercontroller');
let calculator = require('./controllers/calculatorcontroller');

sequelize.sync();

// header configuration for client requests
app.use(require('./middleware/headers'));

// THIS MUST GO ABOVE ANY ROUTES THAT USE THIS
app.use(express.json());

app.use('/calculator', calculator);

// User endpoint controller - Exposed route (not protected)
app.use('/user', user);

// Journal endpoint controller - Protected route
app.use('/journal', journal);

app.listen(3000, function() {
    console.log("App is listening on port 3000");
});


