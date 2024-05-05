import { error } from "console"
import { createServer } from "http"
const PORT = process.env.PORT

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Joe Doe" },
  { id: 3, name: "Jane Doe" },
]

// Logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
}

//JSON middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json")
  next()
}

//Route handler for GET /api/users
const getUsersHandler = (req, res) => {
  res.write(JSON.stringify(users))
  res.end()
}

//Route handler for POST /api/users
const createUserHandler = (req, res) => {
  let body = ""
  //Listen for data, convert binary stream chunks into strings
  req.on("data", (chunk) => {
    body += chunk.toString()
  })
  //Convert finished stream into json type object
  req.on("end", () => {
    const newUser = JSON.parse(body)
    users.push(newUser)
    res.statusCode = 201
    res.write(JSON.stringify(newUser))
    res.end()
    console.log(users)
  })
}

//Route handler for GET /api/users/:id
const getUserHandler = (req, res) => {
  const id = parseInt(req.url.split("/")[3])
  const user = users.find((user) => user.id === id)
  if (user) {
    res.write(JSON.stringify(user))
    res.end()
  } else {
    res.write(JSON.stringify({ message: "User Not Found" }))
    res.end()
  }
}

//Route handler for Not-Found
const notFoundHandler = (req, res) => {
  res.write(JSON.stringify({ message: "Route Not Found" }))
  res.end()
}

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      req.on("error", (err) => {
        console.error(err)
      })
      res.on("error", (err) => {
        console.error(err)
      })
      if (req.method === "GET" && req.url == `/api/users`) {
        getUsersHandler(req, res)
      } else if (
        req.method === "GET" &&
        req.url.match(/\/api\/users\/[1-9]+/)
      ) {
        getUserHandler(req, res)
      } else if (req.method === "POST" && req.url == `/api/users`) {
        createUserHandler(req, res)
      } else {
        notFoundHandler(req, res)
      }
    })
  })
})

server.listen(PORT, () => {
  console.log(`Server2 running on port ${PORT}`)
})
