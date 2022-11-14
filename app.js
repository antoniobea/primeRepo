// Antonio Beaumont
// Nombre del producto (como h2)
// Precio del producto (texto en color azul)
// Descripción (texto en color negro)
// http://localhost:4500/scraper
// Envía los enlaces a tus repositorios en Github con:

const divOrdenador = document.getElementById('computers')

const URL = 'http://localhost:4500/scraper'

fetch(URL)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        data.forEach(ordenador => {
            var articulo
            const { nombre, precio, descr } = ordenador

                articulo = '<div><h2>' + nombre + '</h2><p>'
                    + precio + ' <style> color: blue </style> </p><span>' + descr + ' <style> color: black </style> </span></div>'
            
            divOrdenador.insertAdjacentHTML('beforeend', articulo)
        });
    })
    .catch (err => console.log(err))