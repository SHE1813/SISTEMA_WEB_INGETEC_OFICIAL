const express = require("express")
const cors = require("cors")
const bcrypt = require("bcryptjs")

const db = require("./db")

const app = express()

app.use(cors())
app.use(express.json())

// ==========================
// LOGIN
// ==========================

app.post("/login", (req, res) => {

  const { email, password } = req.body

  const sql =
    "SELECT * FROM users WHERE email = ?"

  db.query(sql, [email], async (err, result) => {

    if (err) {
      return res.status(500).json(err)
    }

    if (result.length === 0) {

      return res.json({
        success: false,
        message: "Usuario no encontrado"
      })

    }

    const user = result[0]

    const validPassword = await bcrypt.compare(
      password,
      user.password
    )

    if (!validPassword) {

      return res.json({
        success: false,
        message: "Credenciales incorrectas"
      })

    }

    res.json({
      success: true,
      user
    })

  })

})

// ==========================
// REGISTRO
// ==========================

app.post("/register", async (req, res) => {

  const {
    email,
    password
  } = req.body

  try {

    const hashedPassword =
      await bcrypt.hash(password, 10)

    const sql = `

      INSERT INTO users
      (email, password)

      VALUES (?, ?)

    `

    db.query(

      sql,

      [
        email,
        hashedPassword
      ],

      (error, result) => {

        if (error) {

          console.log(error)

          return res.status(500).json({

            success: false,
            message: "Error al registrar usuario"

          })

        }

        res.json({

          success: true,
          message: "Usuario registrado correctamente"

        })

      }

    )

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false
    })

  }

})

// ==========================
// OBTENER PROYECTOS
// ==========================

app.get("/projects", (req, res) => {

  const sql =
    "SELECT * FROM projects"

  db.query(sql, (error, results) => {

    if (error) {

      return res.status(500).json(error)

    }

    res.json(results)

  })

})

// ==========================
// GUARDAR PROYECTO
// ==========================

app.post("/projects", (req, res) => {

  const {
    nombre,
    responsable,
    estado,
    fecha
  } = req.body

  const sql = `

    INSERT INTO projects
    (nombre, responsable, estado, fecha)

    VALUES (?, ?, ?, ?)

  `

  db.query(

    sql,

    [
      nombre,
      responsable,
      estado,
      fecha
    ],

    (error, result) => {

      if (error) {

        console.log(error)

        return res.status(500).json(error)

      }

      res.json({

        success: true,
        mensaje: "Proyecto guardado"

      })

    }

  )

})

// ==========================
// ACTUALIZAR PROYECTO
// ==========================

app.put("/projects/:id", (req, res) => {

  const { id } = req.params

  const {
    nombre,
    responsable,
    estado,
    fecha
  } = req.body

  const sql = `

    UPDATE projects

    SET
      nombre = ?,
      responsable = ?,
      estado = ?,
      fecha = ?

    WHERE id = ?

  `

  db.query(

    sql,

    [
      nombre,
      responsable,
      estado,
      fecha,
      id
    ],

    (error, result) => {

      if (error) {

        return res.status(500).json(error)

      }

      res.json({

        success: true,
        mensaje: "Proyecto actualizado"

      })

    }

  )

})

// ==========================
// ELIMINAR PROYECTO
// ==========================

app.delete("/projects/:id", (req, res) => {

  const { id } = req.params

  const sql =
    "DELETE FROM projects WHERE id = ?"

  db.query(sql, [id], (error, result) => {

    if (error) {

      return res.status(500).json(error)

    }

    res.json({

      success: true,
      mensaje: "Proyecto eliminado"

    })

  })

})

// ==========================
// OBTENER TAREAS
// ==========================

app.get("/tasks", (req, res) => {

  const sql =
    "SELECT * FROM tasks"

  db.query(sql, (error, results) => {

    if (error) {

      return res.status(500).json(error)

    }

    res.json(results)

  })

})

// ==========================
// GUARDAR TAREA
// ==========================

app.post("/tasks", (req, res) => {

  const {
    titulo,
    responsable,
    estado,
    fecha
  } = req.body

  const sql = `

    INSERT INTO tasks
    (titulo, responsable, estado, fecha)

    VALUES (?, ?, ?, ?)

  `

  db.query(

    sql,

    [
      titulo,
      responsable,
      estado,
      fecha
    ],

    (error, result) => {

      if (error) {

        console.log(error)

        return res.status(500).json(error)

      }

      res.json({

        success: true,
        mensaje: "Tarea guardada"

      })

    }

  )

})

// ==========================
// ACTUALIZAR TAREA
// ==========================

app.put("/tasks/:id", (req, res) => {

  const { id } = req.params

  const {
    titulo,
    responsable,
    estado,
    fecha
  } = req.body

  const sql = `

    UPDATE tasks

    SET
      titulo = ?,
      responsable = ?,
      estado = ?,
      fecha = ?

    WHERE id = ?

  `

  db.query(

    sql,

    [
      titulo,
      responsable,
      estado,
      fecha,
      id
    ],

    (error, result) => {

      if (error) {

        return res.status(500).json(error)

      }

      res.json({

        success: true,
        mensaje: "Tarea actualizada"

      })

    }

  )

})

// ==========================
// ELIMINAR TAREA
// ==========================

app.delete("/tasks/:id", (req, res) => {

  const { id } = req.params

  const sql =
    "DELETE FROM tasks WHERE id = ?"

  db.query(sql, [id], (error, result) => {

    if (error) {

      return res.status(500).json(error)

    }

    res.json({

      success: true,
      mensaje: "Tarea eliminada"

    })

  })

})

// ==========================
// DASHBOARD
// ==========================

app.get("/dashboard", (req, res) => {

  const sqlProjects =
    "SELECT COUNT(*) AS total FROM projects"

  const sqlTasks =
    "SELECT COUNT(*) AS total FROM tasks"

  const sqlPending =
    "SELECT COUNT(*) AS total FROM tasks WHERE estado = 'Pendiente'"

  const sqlDelayedTasks = `

    SELECT * FROM tasks

    WHERE estado = 'Pendiente'
    AND fecha < CURDATE()

  `

  const sqlDelayedProjects = `

    SELECT * FROM projects

    WHERE estado != 'Completado'
    AND fecha < CURDATE()

  `

  db.query(sqlProjects, (error, projectResult) => {

    if (error) {

      return res.status(500).json(error)

    }

    db.query(sqlTasks, (error, taskResult) => {

      if (error) {

        return res.status(500).json(error)

      }

      db.query(sqlPending, (error, pendingResult) => {

        if (error) {

          return res.status(500).json(error)

        }

        db.query(sqlDelayedTasks, (error, delayedTasks) => {

          if (error) {

            return res.status(500).json(error)

          }

          db.query(sqlDelayedProjects, (error, delayedProjects) => {

            if (error) {

              return res.status(500).json(error)

            }

            res.json({

              proyectos:
                projectResult[0].total,

              tareas:
                taskResult[0].total,

              pendientes:
                pendingResult[0].total,

              retrasadas:
                delayedTasks.length,

              tareasRetrasadas:
                delayedTasks,

              proyectosRetrasados:
                delayedProjects.length,

              listaProyectosRetrasados:
                delayedProjects,

              reportes: 8

            })

          })

        })

      })

    })

  })

})

// ==========================
// SERVIDOR
// ==========================

const PORT =
  process.env.PORT || 3000

app.listen(PORT, () => {

  console.log(
    `Servidor ejecutándose en puerto ${PORT}`
  )

})