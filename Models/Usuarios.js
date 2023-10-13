import db from '../db/connection'
import { DataTypes } from 'sequelize'

const Usuarios = db.define('usuarios',
    {
        id: {
            type: DataTypes.INTEGER,
            primarykey: true,
            autoIncrement: true
        },
        nombre: { type: DataTypes.STRING },
        edad: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        telefono: { type: DataTypes.STRING },
    },
    {
        timestamps: false,
        tableName: 'usuarios',
    })

export default Usuarios
