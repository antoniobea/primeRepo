//Carga package en memoria
const express = require('express')
//asignamos la funcion a una variable
const app = express()
//asignacion puerto conexion sintaxis 1
//const {puerto = 3000} = process.env;  
//asignacion puerto conexion sintaxis 2
const puerto = process.env.PORT || 3000;
//importacion de los datos paraa la api 
const { clientes } = require('./datos/clientes.js')




app.get('/', (req, res) => {
    //enviar texto en la raiz del sitio
    //res.send('Hello World')
    //enviar fichero 
    res.sendFile('./static/index.html', { root: __dirname })
})

app.get('/clientes', (req, res) => {
    //enviar fichero 
    res.sendFile('./static/clientes.html', { root: __dirname })
})

app.get('/api/clientes', (req, res) => {
    //enviar fichero 
    res.sendFile(JSON.stringify(clientes))
})

app.get('/api/clientes/:nombreClienteParam', (req, res) => {
    const nombreCliente = req.params.nombreClienteParam
    console.log("nombre", nombreCliente);
    const resultado = clientes.filter(
        cliente => cliente.nombre === nombreCliente)
    console.log(resultado);
    //lo que viene despues del ?ordenar=ciudad ?asc=ciudad ?des=ciudad
    console.log(req.query.ordenar);
    if (req.query.ordenar === 'ciudad') {
        const resultadoOrdenadoCiudad = resultado.sort((a, b) => a.ciudad.localeCompare(b.ciudad))    
        //Para sort desc: if (req.query.des === 'ciudad') {
        //     const resultadoOrdenadoCiudad = resultado.sort((a, b) => b.ciudad.localeCompare(a.ciudad))
        //para numeros:  const resultadoOrdenadonumero = resultado.sort((a, b) => a.numero - b.numero)
        return res.send(JSON.stringify(resultadoOrdenadoCiudad));
    }
    //enviar fichero 
    res.send(JSON.stringify(resultado))
})

app.get('/api/clientes/:nombreClienteParam/:nombreCiudadParam', (req, res) => {
    const nombreCliente = req.params.nombreClienteParam
    const nombreCiudad = req.params.nombreCiudadParam

    console.log("nombre", nombreCliente);
    const resultado = clientes.filter(cliente =>
        (cliente.nombre === nombreCliente) &&
        (cliente.ciudad === nombreCiudad))
    console.log(resultado);

    if (resultado.length === 0) {
        console.log("no encontrado:", nombreCliente);
        res.send(JSON.stringify(nombreCliente))
    }
    else {
        console.log(resultado);
        res.send(JSON.stringify(resultado));
    }
    //enviar fichero 
});

//obtenemos directorio de ficheros estaticos: css,js,img...
app.use(express.static('static'));

app.use((req, res) => {
    //enviar fichero 
    res.status(404).sendFile('./static/404.html', { root: __dirname })
});

app.listen(puerto, () => {
    console.log(`Servidor escuchando por http://localhost:$puerto}`);
});