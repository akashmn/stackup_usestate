const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

//express app
const app = express();

//connect to db

const dbUri = 'mongodb+srv://ksabhishek00:ronaldomessi@cluster0.vjdwpsa.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbUri)
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));

//register view engine
app.set('view engine','ejs');

//middleware and static files
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));

app.get('/',(req,res)=>{
 
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{

    res.render('about',{title:'About'});
});

//blog routes

app.use('/blogs',blogRoutes);

app.use((req,res)=>{
    res.status(404).render('404',{title:'404'})
})

