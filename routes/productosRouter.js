const express = require ('express')
const req = require('express/lib/request')

const productosRouter = express.Router ()

//let Contenedor = require('../components/contenedor')

let productos = [{"id":1,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops","price":109.95,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing","image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","rating":{"rate":3.9,"count":120}},{"id":2,"title":"Mens Casual Premium Slim Fit T-Shirts ","price":22.3,"description":"Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.","category":"men's clothing","image":"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg","rating":{"rate":4.1,"count":259}},{"id":3,"title":"Mens Cotton Jacket","price":55.99,"description":"great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.","category":"men's clothing","image":"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg","rating":{"rate":4.7,"count":500}},{"id":4,"title":"Mens Casual Slim Fit","price":15.99,"description":"The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.","category":"men's clothing","image":"https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg","rating":{"rate":2.1,"count":430}},{"id":5,"title":"John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet","price":695,"description":"From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.","category":"jewelery","image":"https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg","rating":{"rate":4.6,"count":400}}]

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
                       // console.log('producto eliminado')
                        const producto = await items.getByID (ID)
                        const index = products.indexOf(producto)
                        productos.splice (index, 1)
                 return resultado
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    async putByID(ID, newPrice) {
        try {
            let products = await items.getAll()
            //console.log(products)
            const encontrado = products.filter ((item) => item.id == ID);
            //console.log(encontrado)
            if (encontrado.length === 0) { 
                console.log('el producto no existe')
            }else{
                const respuesta = {}
                //console.log(respuesta)
                respuesta.anterior = encontrado
                //console.log(respuesta.anterior)
                
                //const indexElem = encontrado.findIndex(elem => elem === "price")
                //console.log (indexElem)
                let newProp = newPrice['price']
                //console.log(newProp)

                respuesta.actualizada = newPrice
                //console.log(respuesta.actualizada)

                const producto = await items.getByID (ID)
                const indexObjeto = products.indexOf(producto)
                productos.splice(indexObjeto, 1, newPrice)
                return respuesta




                /*const resultado = productos.filter ((item) => item.id !== ID)
                       // console.log('producto eliminado')
                        const producto = await items.getByID (ID)
                        const index = products.indexOf(producto)
                        productos.splice (index, 1)
                 return resultado
                 */
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
    //console.log(req.body)
    let newPrice = req.body
    //number = JSON.parse(req.params.ID)
    //console.log(number)
    let putProduct = await items.putByID(req.params.ID, newPrice)
    res.json(putProduct)
})

productosRouter.delete ("/:ID", async (req, res)=>{
    number = JSON.parse(req.params.ID)
    //console.log(number)
    let products = await items.deleteByID(number)
    //console.log(product)
    res.json(products)
})

//exportando el modulo
module.exports = productosRouter