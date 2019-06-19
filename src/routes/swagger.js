const joi=require("joi");
module.exports = [
    {
    method: 'GET',
    path: '/api/v1/get',
        config: {
            description: 'Get hapi-swagger',
            notes: 'Ruta de prueba para obtener hapi-swagger',
            tags: ['api', 'rutas']
        },
        handler: (req, reply)=> {
            return "Esta es una ruta de prueba";
        }
    }
]