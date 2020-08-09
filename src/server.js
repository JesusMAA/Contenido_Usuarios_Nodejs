const express = require('express');
const app = express();

//settings
//compurba si ya hay un puerto o que use el 3000
app.set('port', process.env.PORT || 3000)

//middlewares

//routes

//statics

app.listen(app.get('port'), ()=>{
    console.log('server on port:', app.get('port'));
});