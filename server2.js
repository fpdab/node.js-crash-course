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
      if (req.method === "GET" && req.url == `/api/users`) {
        getUsersHandler(req, res)
      } else if (
        req.method === "GET" &&
        req.url.match(/\/api\/users\/[1-9]+/)
      ) {
        getUserHandler(req, res)
      } else {
        notFoundHandler(req, res)
      }
    })
  })
})

server.listen(PORT, () => {
  console.log(`Server2 running on port ${PORT}`)
})
