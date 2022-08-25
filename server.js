const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./src/db')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./src/graphql/schema')
const path = require('path')
const initializeRoutes = require('./src/routes')

dotenv.config()

const app = express()

connectDB()


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/src/templates/views'))

const cookieParser = require('cookie-parser')
app.use(cookieParser())


app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
    
}))

app.use(express.urlencoded({extended:true}))

const {authenticate} = require('./src/middleware/auth')
app.use(authenticate)
initializeRoutes(app)

app.get("/", (req, res)=>{
    res.send("hello World!")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server listening on ${process.env.PORT}`)
})