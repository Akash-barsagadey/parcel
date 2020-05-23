const path = require('path')
const fs = require('fs')
const express = require('express')
const expressStaticGzip = require('express-static-gzip')

const app = express()

app.get('/', function (req, res) {
	const absolutePathTOHtmlFile = path.resolve(__dirname, '../dist/index.html')
	const contentsOfHtmlFile = fs.readFileSync(absolutePathTOHtmlFile, 'utf-8')
	res.send(contentsOfHtmlFile)
})

/* app.use('/static', express.static(path.resolve(__dirname, '../dist'))) */

app.use(
	'/static',
	expressStaticGzip(path.resolve(__dirname, '../dist'), {
		enableBrotli: true,
		orderPreference: ['br', 'gz'],
	})
)

app.listen(3050, () => console.log('Listening'))
