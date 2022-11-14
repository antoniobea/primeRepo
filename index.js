// Antonio Beaumont
const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const { join } = require('path')
const cors = require('cors')

const app = express()
const PORT = 4500
const URL = 'https://webscraper.io/test-sites/e-commerce/allinone/computers'

app.use(cors())
app.use(express.static(join(__dirname, '')))

app.get('/scraper', (req, res) => {

    axios(URL)
        .then(response => {
            //console.log(response.data);
            const html = response.data;

            const $ = cheerio.load(html)

            const ordenador = []
            $('.caption', html).each(function () {
                const precio = $(this).find('.pull-right.price').text()
                // console.log(precio);
                const nombre = $(this).find('a').attr('title')
                // console.log(nombre);
                var descr = $(this).find('p').text()
                //  console.log(descr);
                ordenador.push({
                    nombre,
                    precio,
                    descr
                })
            })

            res.json(ordenador)
        })
        .catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`))