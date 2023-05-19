const database = require("./data")// requerimos la funcionaidad de data
const process = require('process');// requerimos la propiedad argv
const accion = process.argv[2];
const marca = process.argv[3];
const categoria = process.argv[4];
const precio = process.argv[5];
//let productos = database.listarProductos();
/*  for (let i = 0; i < productosParseados.length; i++){
  console.log(productosParseados[i].marca)
 }
 */


switch (accion) {
    case "listar":
         //productos = database.listarProductos();
        console.log("LISTADO DE PRODUCTOS");

      database.listarProductos()
        break;
    case "agregar":
        

        if([marca,categoria,precio].includes(undefined)){
            console.log("faltan datos!!");

        }else{
            const nuevoProducto = {
                marca,
                categoria, 
                precio,
                stock:true
            }
           database.guardarProductos(nuevoProducto)

        }
        ;
        break;
     case "filtrar":
       const resultado = database.filtrarProductos(marca);

       if(resultado.length){
        console.log("FILTRADO DE PRODUCTOS");

       for (let i = 0; i < resultado.length; i++){
        console.log(`${i+ 1}.-${resultado[i].categoria} ${resultado[i].marca} => ${resultado[i].precio}`)}
       }
       else{
        console.log(`No hay resultado para: ${marca}`)
       }
        break;
    case "editar":
        
        const productosActualizados = database.editarProducto(process.argv[3],process.argv[4],process.argv[5])

        database.listarProductos (productosActualizados);

        break;
    case "eliminar":
        const productosFiltrados = database.eliminarProductos(process.argv[3]);

       database.listarProductos(productosFiltrados)
        break;
    case undefined:
        console.log("debes indicar una accion")
        break;
    default:
        console.log("Accion incorrecta");
    
}

 //console.log(database.listarProductos());