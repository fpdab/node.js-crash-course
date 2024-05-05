//import fs from 'fs'
import fs from 'fs/promises'

//readfile() - callback
// fs.readFile('./test.txt', 'utf-8', (err, data)=>{
//     if(err) { throw err}
//     console.log(data)
// })

//readFileSync() - synchronous version
// const data = fs.readFileSync('./test.txt', 'utf-8')
// console.log(data)

//readFile() - promise version .then()
// fs.readFile('./test.txt', 'utf-8')
//     .then(data=>console.log(data))
//     .catch(err=>console.log(err))

//readFile() - promise version async await
const readfile = async () => {
    try {
        const data = await fs.readFile('./test.txt', 'utf-8')
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

//writeFile()

const writeFile = async () => {
    try {
        await fs.writeFile('./test.txt', 'I write to this file, Hi')
        console.log('File written')
    } catch (error) {
        console.log(error)
    }
}

//appendFile()

const appendFile = async () => {
try {
    await fs.appendFile('./test.txt', ' Hi')
    console.log('File appended')
} catch (error) {
    console.log(error)
}
}

writeFile()
appendFile()
readfile()