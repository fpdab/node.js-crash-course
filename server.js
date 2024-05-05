import http from "http"
import fs from "fs/promises"
import path from "path"

const PORT = process.env.PORT

//Get current path
const __filename = import.meta.filename
const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
  //   res.setHeader("Content-Type", "text/plain")
  //   res.statusCode = 404

  //   res.writeHead(404, {
  //   "Content-Type": "text/html",
  //   })
  //   res.end(`404: Page Not Found`)

  try {
    //Check if GET request
    if (req.method === "GET") {
      let filePath
      if (req.url === "/") {
        filePath = path.join(__dirname, "public", "index.html")
      } else if (req.url === "/about") {
        filePath = path.join(__dirname, "public", "about.html")
      } else {
        filePath = path.join(__dirname, "public", "404.html")
        res.statusCode = 404
      }
      const data = await fs.readFile(filePath)
      res.setHeader("Content-Type", "text/html")
      res.write(data)
      res.end()
    } else {
      throw new Error("Incorrect method")
    }
  } catch (error) {
    res.writeHead(500, {
      "Content-Type": "text/plain",
    })
    res.end("Server Error")
  }
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
