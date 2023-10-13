import db from '../db/connection';
import { DataTypes } from 'sequelize';


const Productos = db.define('Producto',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: { type: DataTypes.STRING },
        tipo: { type: DataTypes.STRING },
        precio: { type: DataTypes.DOUBLE }
    },
    {
        tableName: 'productos',
        timestamps: false
    }
);


export default Productos;