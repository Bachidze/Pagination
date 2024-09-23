const http = require("http")
const url = require("url")
const fs = require("fs/promises")
const queryString = require("querystring")


const server = http.createServer(async(req,res) => {
    const parsedURL = url.parse(req.url)
    const queryParams = queryString.parse(parsedURL.query)
    if(parsedURL.pathname === "/api"){
        const data = await fs.readFile("data.json","utf-8")
        const parsedData = JSON.parse(data)
        const page = queryParams.page
        const take = queryParams.take
        if(take > 30){
            res.end("take should be less than 30")
        }
        const resp = parsedData.slice((page-1)*take,take*page)
        res.setHeader("Content-type","application/json")
        return res.end(JSON.stringify(resp))
    }
})

server.listen(3000,"localhost",() => {
    console.log("server running 3000 port")
})