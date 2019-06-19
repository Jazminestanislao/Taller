console.log("Hola mundo en node");
const Hapi = require('hapi');
const routes = require("./routes/index");
const mongoose= require("mongoose");
const Ejs=require("ejs");
const jwt2=require('hapi-auth-jwt2');

//swagger
const Inert = require('inert');
const Vision = require ('vision');
const HapiSwagger = require('hapi-swagger');
//mongoose.connect('mongodb://localhost/sms')
// .then(db => console.log('db connected'))
//.catch(err=> console.log(err));

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    app: {},
    routes: {} //utilizable para vistas
});

const iniciarServer = async () => {
    try{
        await server.register(Vision);
        server.views({
            engines: {ejs: Ejs },
            relativeTo: __dirname,
            path: './views'
        });

        //swagger
        await server.register([
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: {
                    host: 'localhost:3000',
                    info: {
                        title: 'Documentación hapi',
                        version: '1.0.0'
                    },
                    //code2
                    sortEndpoints: 'ordered',
                    grouping: 'tags'
                }
            }
        ]);

        await server.route(routes);
        await server.start();
        console.log(`Servidor corriendo en: ${server.info.uri}`);
    }catch (error){
        console.log('Error al iniciar el servidor Hapi'+error);
    }
};
iniciarServer();