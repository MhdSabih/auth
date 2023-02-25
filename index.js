const express = require('express')
const app = express();
require("./db/db")
// Import Routes
const authRoutes = require('./routes/auth');
const postRoute = require('./posts/posts');

//PORT 
const PORT = 3000

// Middlewares
app.use(express.json());
// Routes middlewares
app.use('/api/User', authRoutes);
app.use('/posts', postRoute);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})