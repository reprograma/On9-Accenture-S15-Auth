const app = require("./src/app")
const port = 8484


app.listen(port, function() {
  console.log(`app está rodando na porta ${port}`)
})
