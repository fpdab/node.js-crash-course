import getPosts, { getPostsLength } from "./postController.js"
import { createRandomNumber } from "./utils.js"

console.log(getPosts())

console.log(`Posts list's length: ${getPostsLength()}`)

console.log(`Random number ${createRandomNumber()}`)
