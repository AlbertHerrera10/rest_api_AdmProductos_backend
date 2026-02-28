import express from 'express';
import colors from 'colors';
import cors, {CorsOptions} from 'cors';
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import router from './router';
import db from './config/db';
import swaggerSpec from './config/swagger';

export async function connectDB() {
    try{
        await db.authenticate()
        await db.sync({ alter: true })
        console.log(colors.blue('Conexion exitosa a la db'))
    } catch (error){
        console.error('Error detallado:', error) // 👈 cambia esto
    }
}
connectDB()

//Instancia de express
const server = express()

//Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function(origin, callback){
        if(!origin || origin === process.env.FRONTEND_URL){
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))
server.use('/api/products', router)

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


export default server