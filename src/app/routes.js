const passport = require("passport");

module.exports = (app, passport)=>{
    app.get('/', (req,res)=>{
        res.render('index',{title:'Pagina Contenido'});
    });

    app.get('/logger',(req,res)=>{
        res.render('logger',{title:"Logger"});
    });
    
    app.get('/login', (req,res)=>{
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    app.post('/login', passport.authenticate('local-login',{
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup', (req,res)=>{
        res.render('signup', {
            message: req.flash('signUpMessage')
        })
    });

    app.post('/signup', passport.authenticate('local-signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    
    app.get('/profile',isLoggedIn,(req,res)=>{
        res.render('profile',{
            user: req.user
        });
    });

    app.get('/logout',(req,res)=>{
        req.logout();
        res.redirect('/');
    });

    //pagina
    app.get('/contact',(req,res)=>{
        res.render('contact', {title:'Contact Page'});
    });

    //contact
    app.post('/send-email',(req,res)=>{
        const {email, message} = req.body;

        contentHtml = `
            <h1>User information</h1>
            <ul>
                <li>Email: ${email}</li>
            </ul>
            <p>${message}</p>
        `;
        console.log(contentHtml);
        res.send('Received');
    });

};

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}