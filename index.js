import { createRequire } from 'node:module'
import express from 'express'
import db from './db/connection.js'
import Productos from './Models/Productos.js'
import Usuarios from './Models/Usuarios.js'

const require = createRequire(import.meta.url)
const datos = require('./datos.json');

const html = '<h1>Bienvenido a la API</h1><p>Los comandos disponibles son:</p><ul><li>GET: /productos/</li><li>GET: /productos/id</li>    <li>POST: /productos/</li>    <li>DELETE: /productos/id</li>    <li>PUT: /productos/id</li>    <li>PATCH: /productos/id</li>    <li>GET: /usuarios/</li>    <li>GET: /usuarios/id</li>    <li>POST: /usuarios/</li>    <li>DELETE: /usuarios/id</li>    <li>PUT: /usuarios/id</li>    <li>PATCH: /usuarios/id</li></ul>'

const app = express()

const exposedPort = 1234
const usuarios = require('./datos.json');


app.get('/', (req, res) => {
    res.status(200).send(html)
})

//GET

/* Punto 10.  Stock actual de productos y sumatoria de los precios indiviales */

app.get("/stock/actual", async (req, res) => {
    try {
        const productos = await productos.findAll();
        const productosStock = productos.length;
        const precioTotal = productos.reduce((total, producto) => {
            return total + producto.precio;
        }, 0);
         const precioTotalRedondeado = parseFloat(precioTotal.toFixed(2));
        res.status(200).json({
            productosStock,
            precioTotal: precioTotalRedondeado, 
        });
    } catch (error) {
        res.status(204).json({ message: error });
    }
});



/* Listado de productos*/

app.get('/productos/', async (req, res) => {
    try {
        let allProducts = await Producto.findAll()

        res.status(200).json(allProducts)

    } catch (error) {
        res.status(204).json({ "message": error })
    }
})



/* Punto 6. Obtencion de precio del producto por su id */

app.get('/productos/precio/:id', async (req, res) => {
    try {
        const productoId = parseInt(req.params.id);

        const productoEncontrado = await productoId.findByPk(productoId);
        if (productoEncontrado) {
            res.status(200).json({ 'precio': productoEncontrado.precio });
        } else {
            res.status(404).json({
                'message':
                    'Producto no encontrado'
            });
        }

    } catch (error) {
        res.status(204).json({ "message": error })
    }
})



/* Punto 7. Obtencion de nombre de un producto por su id */

app.get('/productos/nombre/:id', async (req, res) => {
    try {
        const productoId = parseInt(req.params.id)
        const productoEncontrado = await productoId.findByPk(productoId);

        if (productoEncontrado) {
            res.status(200).json({ "nombre": productoEncontrado.nombre })
        } else {
            res.status(204).json({ "message": "No se encuentra el producto" })
        }

    } catch (error) {
        res.status(204).json({ "message": error })
    }
})



/* Productos por su id  */

app.get('/productos/:id', async (req, res) => {
    try {
        let productoId = parseInt(req.params.id)
        let productoEncontrado = await productoId.findByPk(productoId);

        res.status(200).json(productoEncontrado)

    } catch (error) {
        res.status(204).json({ "message": error })
    }
})


// Punto 1. Obtencion de listado completo de usuarios */

app.get('/usuarios/', async (req, res) => {
    try {
        const allUsuarios = await Usuarios.findAll();

        res.status(200).json(allUsuarios)

    } catch (error) {
        res.status(500).json({ "message": error })
    }
})



/* Punto 2. Devolucion de datos de un usuario en particular por id */

app.get('/usuarios/:id', async (req, res) => {
    try {
        const usuarioId = parseInt(req.params.id)
        const usuarioEncontrado = await usuarioId.findByPk(usuarioId);

        if (usuarioEncontrado) {
            res.status(200).json(usuarioEncontrado);
        } else {
            res.status(404).json({ "message": "No se ha encontrado al usuario con el ID dado" });
        }

    } catch (error) {
        res.status(204).json({ "message": error })
    }
})


/* Punto 8. Otener el teléfono de un usuario por su id */

app.get('/usuarios/telefono/:id', async (req, res) => {
    try {
        const usuarioId = parseInt(req.params.id)
        const usuarioEncontrado = await usuarioId.findByPk(usuarioId);

        if (usuarioEncontrado) {
            res.status(200).json({ "telefono": usuarioEncontrado.telefono })
        } else {
            res.status(204).json({ "message": "Usuario no encontrado" })
        }

    } catch (error) {
        res.status(204).json({ "message": error })
    }
})


/* Punto 9: Obtencion nombre de un usuario por su id */

app.get('/usuarios/nombre/:id', async (req, res) => {
    try {
        const usuarioId = parseInt(req.params.id)
        const usuarioEncontrado = await usuarioId.findByPk(usuarioId);

        if (usuarioEncontrado) {
            res.status(200).json({ "nombre": usuarioEncontrado.nombre })
        } else {
            res.status(204).json({ "message": "Usuario no encontrado" })
        }

    } catch (error) {
        res.status(204).json({ "message": error })
    }
})



/* Post */

/* Agregar producto */

app.post('/productos', (req, res) => {
    try {
        let bodyTemp = ''

        req.on('data', (chunk) => {
            bodyTemp += chunk.toString()
        })

        req.on('end', async () => {
            const data = JSON.parse(bodyTemp)
            req.body = data
            const productoAGuardar = new Producto
                (req.body)
            await productoAGuardar.save()
        })

        res.status(201).json({ "message": "success" })

    } catch (error) {
        res.status(204).json({ "message": "error" })
    }
})


/* Punto 3. Guardar nuevo usuario */

app.post('/usuarios', (req, res) => {
    try {
        let bodyTemp = ''

        req.on('data', (chunk) => {
            bodyTemp += chunk.toString()
        })

        req.on('end', async () => {
            const data = JSON.parse(bodyTemp)
            req.body = data
            const usuarioAGuardar = new Usuario(req.body)
            await usuarioAGuardar.save()
        })
        res.status(201).json({ "message": "success" })

    } catch (error) {
        res.status(204).json({ "message": "error" })
    }
})

/* Patch */

/* Modificacion de producto por id */

app.patch('/productos/:id', async (req, res) => {
    let idProductoAEditar = parseInt(req.params.id)
    let productoAActualizar = await Productos.findByPk(idProductoAEditar)

    if (!productoAActualizar) {
        res.status(204).json({ "message": "No se encuentra el producto" })
    }

    let bodyTemp = ''

    req.on('data', (chunk) => {
        bodyTemp += chunk.toString()
    })

    req.on('end', () => {
        const data = JSON.parse(bodyTemp)
        req.body = data

        if (data.nombre) {
            productoAActualizar.nombre = data.nombre
        }

        if (data.tipo) {
            productoAActualizar.tipo = data.tipo
        }

        if (data.precio) {
            productoAActualizar.precio = data.precio
        }

        res.status(200).send('Producto actualizado')
    })
})


/* Punto 4. Modificar algun atributo del usuario */

app.patch('/usuarios/:id', async (req, res) => {
    const idUsuarioAEditar = parseInt(req.params.id);

    try {
        const usuarioAActualizar = await Usuarios.findByPk(idUsuarioAEditar); // Busca el usuario por ID en la base de datos

        if (!usuarioAActualizar) {
            return res.status(404).json({ "message": "Usuario no encontrado" });
        }

        const data = req.body;

        if (data.nombre) {
            usuarioAActualizar.nombre = data.nombre;
        }

        if (data.edad) {
            usuarioAActualizar.edad = data.edad;
        }

        if (data.email) {
            usuarioAActualizar.email = data.email;
        }

        if (data.telefono) {
            usuarioAActualizar.telefono = data.telefono;
        }

        await usuarioAActualizar.save(); // Guarda los cambios en la base de datos

        res.status(200).json({ "message": "Usuario actualizado" });
    } catch (error) {
        res.status(500).json({ "message": "Error" });
    }
});


/* Delete */

/* Borrar producto por su id */

app.delete('/productos/:id', async (req, res) => {
    let idProductoABorrar = parseInt(req.params.id)
    let productoABorrar = await Productos.findByPk(idProductoABorrar)

    if (!productoABorrar) {
        res.status(204).json({ "message": "No se encuentra el producto" })
    }

    try {
        await productoABorrar.destroy()
        res.status(200).json({ "message": "success" })

    } catch (error) {
        res.status(204).json({ "message": "error" })
    }
})


/* Punto 5. Borrar usuario de los datos */

app.delete('/usuarios/:id', async (req, res) => {
    const idUsuarioABorrar = parseInt(req.params.id);

    if (!usuarioABorrar) {
        return res.status(404).json({ "message": "Usuario no encontrado" });
    }

    try {
        const usuarioABorrar = await Usuarios.findByPk(idUsuarioABorrar);
        if (!usuarioABorrar) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        await usuarioABorrar.destroy();

        return res.status(200).json({ "message": "Usuario eliminado con éxito" });
    } catch (error) {
        return res.status(500).json({ "message": "Error al eliminar el usuario" });
    }
})


//app use
app.use((req, res) => {
    res.status(404).send('<h1>404</h1>')
})

try {
    await db.authenticate (); 
    console.log ('Conexión con la base de datos establecida')
} catch(error){
    console.log('Error de conexión', error); 
}

//app listen

app.listen(exposedPort, () => {
    console.log('Servidor escuchando en http://localhost:' + exposedPort)
})


