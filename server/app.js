const express = require('express');
const cors = require('cors');
const articleRoutes = require('./routes/articles');

const app = express();

// Middleware
app.use(cors(
    {
        origin:["https://smartscript-manthan-gohil.vercel.app"],
        methods: ["POST","GET"],
        credentials: true
    }
));
app.use(express.json());

// Routes
app.use('/api/articles', articleRoutes);

app.get('/',(req,res)=>{
    res.json("Server is running")
    
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));