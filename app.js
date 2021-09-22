const express = require('express');
const app = express(); 
const mongoose = require('mongoose'); // for models

// first do npm install cors
// if you are accessing from multiple servers. . . ? 
const cors = require('cors');

require('dotenv/config'); 
   /* injects all environment variables from the .env file into
   the process.env object
*/

// MIDDLEWARE (good place for auth)
app.use(express.json());
app.use(cors());

// Import Routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute); // middleware--when you get posts, user postsRoute

// could create other routes like user. . . 

// ROUTES

app.get('/', (req, res) => {
   res.send('We are on Home');
});

mongoose.set('debug', true);
// Connect to DB
// define my database and middleware
mongoose.connect(process.env.MONGO_URI, {
   useUnifiedTopology: true,
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false
 })
 mongoose.connection.once('connected', () => console.log('Connected to Mongo Life is Good'));
// how do we listen to the server? 
app.listen(3000);
