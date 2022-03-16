const express = require ('express')

const productosRouter = express.Router ()

//let Contenedor = require('../components/contenedor')

const productos = []

const newObjeto = {
    "title":"Pez Globo",                                                                                                                          
    "price": 345.67,                                                                                                                                     
    "thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"                                   
}

class Contenedor {
       
    constructor ( productos, newObjeto){
        this.listaProductos = productos
        this.objeto = newObjeto
        };

    async getAll() {
            try {

                if (this.listaProductos !== []) {
                    //console.log(productosParse)
                    return productos;
                } else {
                    throw 'no hay productos para mostrar'
                }

            } catch (error) {
                console.log(`Error: ${error}`);
            }
        }

    async save(producto) {
        try {
            producto ["id"] = productos.length + 1
            //console.log(producto)
            productos.push(producto)
            console.log(`el nuevo objeto fue guardado con el id ${producto.id}`)
        }
        catch (err) {
            console.log('no se pudo agregar');
        }
    }

    async getByID(ID) {
        try {
            let products = await items.getAll()
            //console.log(products)
            let buscarProductoXId = products.find(elem => elem.id == ID);
            //console.log(buscarProductoXId)
            if (buscarProductoXId == null){                
                console.log('no se ubica el producto');
            }else{
                //console.log(buscarProductoXId);
                return (buscarProductoXId)
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    async deleteByID(ID) {
        try {
            let products = await items.getAll()
            //console.log(products)
            const eliminado = products.filter ((item) => item.id == ID);
            //console.log(eliminado)
            if (eliminado.length === 0) { 
                console.log('el producto no existe')
            }else{
                const resultado = productos.filter ((item) => item.id !== ID)
                        console.log('producto eliminado')
                //console.log (resultado)
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    async deleteAll() { 
        this.listaProductos = [];
        await fs.writeFile('./productos.txt', JSON.stringify(this.listaProductos, null, 4), error =>{
            if(error){
            } else {
            console.log("Se eliminaron todos los productos del contenedor.")
            }
        });
    }

}

const items = new Contenedor ('productos.json');


//---------------------------------------------------------creacion de las rutas--------------------------------------------------------------------------
productosRouter.get ('/', async (req, res)=>{
    let products = await items.getAll()
    res.json(products)
})

productosRouter.get ('/:ID', async (req, res)=>{
    number = JSON.parse(req.params.ID)
    //console.log(number)
    let product = await items.getByID(number)
    res.json(product)
})

productosRouter.post('/', async (req, res)=>{
  console.log(req.body)
  let newProduct = await items.save (req.body)
  //productos.push(req.body)
  res.json({mensaje: 'se agrego correctamente '})
})

productosRouter.put ('/:ID', async (req, res)=>{
    number = JSON.parse(req.params.ID)
    //console.log(number)
    let product = await items.getByID(number)
    res.json(product)
})

productosRouter.delete ("/:ID", async (req, res)=>{
    number = JSON.parse(req.params.ID)
    console.log(number)
    let product = await items.deleteByID(number)
    res.json(product)
})

//exportando el modulo
module.exports = productosRouter