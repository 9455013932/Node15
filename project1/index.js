const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.get('/about', (req, res) => {
    res.status(200).send('About page')
})

app.get('*', (req, res) => {
    res.status(404).send("Error 404: Page not found")
})
// app.use((req, res,next) => {
//     res.status(404).send('Page not found on the server')
// })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})