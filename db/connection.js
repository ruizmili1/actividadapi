import {sequelize} from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()
//creacion de la intancia sequelize 

const db = new sequelize (
process.env.DB_NAME,  //dbname
process.env.DB_USERNAME, //User
process.env.DB_PASSWORD,//password 
{
    host: process.env.DB_HOSTNAME,
    dialect: process.env.DB_DIALECT, 
    logging: true
}
)

export default db