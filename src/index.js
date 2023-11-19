const express = require('express');
const morgan = require('morgan');
const path = require('path');//modulo que permite unir directorios.
const exphbs = require('express-handlebars');//parecido a archivos html pero con mejoras
const session = require('express-session');
const methodOverride = require('method-override');
//initializations
const app = express();

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));//en este punto concateno con la carpeta views
app.engine('.hbs', exphbs=>({ //seguidamente doy objetos de configuración con sus propiedades, 
    //estas nos permiten sabe de qué forma vamos a utilizar las vistas
    defaultLayout:'main' ,//archivo
    layoutsDir: path.join(app.get('views'), 'layouts'),
    //partials son pequeñas partes de html que podems usar en varias vistas, acá establezco dirección
    partialDir: path.join(app.get('views'), 'partials'),
    //sirve para colocar qué extensión van a tener nuestros archivos
    extname:'.hbs'
}) );
//para configurar el motor de las vistas
app.set('view engine', '.hbs');
//**********Middleware******************************************************************************
//ciertas cosas del servidor que nos van a servir
//metodo que nos permite entender si nos mandan datos, false porque no voy a aceptar imagenes solod datos
app.use(express.urlencoded({extended: false}));
//permite que lo formularios pudan mandar también put y delete, y lo hacen a trabés del input _method
app.use(methodOverride('_method'));
//app.use(morgan('dev'));
//modulo de sesion para express, puedo guardar los datos de los usuarios en una sesión
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
//global variables


//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Public

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});