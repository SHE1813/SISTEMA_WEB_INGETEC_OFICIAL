const bcrypt = require("bcryptjs")
const mysql = require("mysql2")

const db = mysql.createConnection({

  host: "localhost",
  user: "root",
  password: "",
  database: "ingetec_db"

})

async function createUser() {

  const hashedPassword = await bcrypt.hash(
    "123456",
    10
  )

  const sql = `
    INSERT INTO users (email, password)
    VALUES (?, ?)
  `

  db.query(

    sql,

    [
      "admin@ingetec.com",
      hashedPassword
    ],

    (error, result) => {

      if (error) {
        console.log(error)
      } else {
        console.log("Usuario creado")
      }

      db.end()

    }

  )

}

createUser()