const fs = require("fs");
const { receiveMessageOnPort } = require("worker_threads");

const leerJSON = function(){
    const productos = fs.readFileSync("./data/productos.json","utf-8")// file system siempre busca en la carpeta raiz(clase12), llamamos data para entrar en JSON
    return productos
}

const parsearJson = function (json){
    const jsonParseado = JSON.parse(json)
    return jsonParseado
}
const escribirJSON = function(productos){
    const productosString = JSON.stringify(productos,null,3)

    fs.writeFileSync("./data/productos.json",productosString,"utf-8");

    productos = parsearJson(leerJSON());

    return productos
}

module.exports = {
    listarProductos : (array) =>{ 
        
        const productos = array ? array :parsearJson(leerJSON());

        for (let i = 0; i < productos.length; i++){
            console.log(`${i+ 1}.-${productos[i].categoria} ${productos[i].marca} => ${productos[i].precio}`)}

       return productos;
},
    guardarProductos : (nuevoProducto) => {


        //const productos = this.listarProdcutos() // el this no se lleva bien con arrow function(no lo lee)
        const productos = parsearJson(leerJSON())

        const ultimoID = productos[productos.length - 1].ID

        productos.push ({
            ID : ultimoID + 1,
            ...nuevoProducto
        });

        return escribirJSON(productos)

     
        //console.log(productos);
    },
    filtrarProductos : (criterio) => {
        const productos = parsearJson(leerJSON())
        let resultado =[];
        for( let i = 0; i < productos.length; i++){
            if(productos[i].marca.includes(criterio)){
                resultado.push(productos[i])
                
            }
    }
    return resultado
},
    editarProducto : (id,propiedad,nuevoValor) =>{
        const productos = parsearJson(leerJSON());
        for (let i = 0; i < productos.length; i++) {
            if(productos[i].ID === +id){
                switch (propiedad) {
                    case "precio":
                        productos[i].precio = +nuevoValor                        
                        break;
                
                    default:
                        break;
                }
            }
            
        }
        return escribirJSON (productos)
    },
    eliminarProductos : (id) =>{
        const productos = parsearJson(leerJSON());
        const productosFiltrados = [];

        for (let i = 0; i < productos.length; i++) {
            if (productos[i].ID !== +id){
                productosFiltrados.push(productos[i])
            }
            
        }
        return escribirJSON (productosFiltrados)
    },

    }

