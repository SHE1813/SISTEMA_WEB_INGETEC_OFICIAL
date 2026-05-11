import {
  useContext,
  useEffect,
  useState
} from "react"

import axios from "axios"

import {
  Link
} from "react-router-dom"

import {
  ThemeContext
} from "../context/ThemeContext"

function Tasks() {

  const theme = useContext(ThemeContext)

  const darkMode =
    theme?.darkMode || false

  // =========================
  // STATES
  // =========================

  const [titulo, setTitulo] =
    useState("")

  const [responsable, setResponsable] =
    useState("")

  const [estado, setEstado] =
    useState("")

  const [fecha, setFecha] =
    useState("")

  const [tasks, setTasks] =
    useState([])
  const [search, setSearch] =
  useState("")
  
  const [editingId, setEditingId] =
    useState(null)

  // =========================
  // OBTENER TAREAS
  // =========================

  const getTasks = async () => {

    try {

      const response = await axios.get(
        "https://ingete-backend.onrender.com/register",
      )

      setTasks(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {

    getTasks()

  }, [])

  // =========================
  // GUARDAR TAREA
  // =========================

  const saveTask = async () => {

    try {

      await axios.post(

        "https://ingete-backend.onrender.com/register",

        {

          titulo,

          responsable,

          estado,

          fecha

        }

      )

      alert("Tarea guardada")

      setTitulo("")
      setResponsable("")
      setEstado("")
      setFecha("")

      getTasks()

    } catch (error) {

      console.log(error)

    }

  }

  // =========================
  // ELIMINAR TAREA
  // =========================

  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `https://ingete-backend.onrender.com/register/${id}`
      )

      getTasks()

    } catch (error) {

      console.log(error)

    }

  }


  const updateTask = async () => {

  try {

    await axios.put(

      `https://ingete-backend.onrender.com/register/${editingId}`,

      {

        titulo,

        responsable,

        estado,

        fecha

      }

    )

    alert("Tarea actualizada")

    setTitulo("")
    setResponsable("")
    setEstado("")
    setFecha("")

    setEditingId(null)

    getTasks()

  } catch (error) {

    console.log(error)

  }

}

  const editTask = (task) => {

  setTitulo(task.titulo)

  setResponsable(task.responsable)

  setEstado(task.estado)

  setFecha(task.fecha)

  setEditingId(task.id)

}

const filteredTasks =

  tasks.filter((task) =>

    task.titulo
      .toLowerCase()
      .includes(search.toLowerCase())

  )

  return (

    <div className="flex flex-col md:flex-row">

      {/* SIDEBAR */}

      <div className="w-full md:w-64 min-h-screen bg-blue-900 text-white p-5">

        <h1 className="text-3xl font-bold mb-10">
          Ingetec
        </h1>

        <ul className="space-y-4">

          <Link to="/dashboard">

            <li className="hover:bg-blue-700 p-3 rounded-lg">
              Dashboard
            </li>

          </Link>

          <Link to="/projects">

            <li className="hover:bg-blue-700 p-3 rounded-lg">
              Proyectos
            </li>

          </Link>

          <Link to="/tasks">

            <li className="bg-blue-700 p-3 rounded-lg">
              Tareas
            </li>

          </Link>

          <Link to="/reports">

            <li className="hover:bg-blue-700 p-3 rounded-lg">
              Reportes
            </li>

          </Link>

        </ul>

      </div>

      {/* CONTENIDO */}

      <div className={`

        flex-1 p-10

        ${darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
        }

      `}>

        <h2 className="text-4xl font-bold mb-10">
          Gestión de Tareas
        </h2>

        <div className="mt-6 mb-6">

  <input

    type="text"

    placeholder="Buscar tarea..."

    value={search}

    onChange={(e) =>
      setSearch(e.target.value)
    }

    className="w-full border p-4 rounded-xl text-black"

  />

</div>

        {/* FORMULARIO */}

        <div className={`

          p-8 rounded-3xl shadow-xl mb-10

          ${darkMode
            ? "bg-gray-800"
            : "bg-white"
          }

        `}>

          <h3 className="text-3xl font-bold mb-6">
            Registrar Tarea
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) =>
                setTitulo(e.target.value)
              }
              className="border p-4 rounded-xl text-black"
            />

            <input
              type="text"
              placeholder="Responsable"
              value={responsable}
              onChange={(e) =>
                setResponsable(e.target.value)
              }
              className="border p-4 rounded-xl text-black"
            />

            <select
              value={estado}
              onChange={(e) =>
                setEstado(e.target.value)
              }
              className="border p-4 rounded-xl text-black"
            >

              <option value="">
                Seleccione estado
              </option>

              <option value="Pendiente">
                Pendiente
              </option>

              <option value="En proceso">
                En proceso
              </option>

              <option value="Completada">
                Completada
              </option>

            </select>

            <input
              type="date"
              value={fecha}
              onChange={(e) =>
                setFecha(e.target.value)
              }
              className="border p-4 rounded-xl text-black"
            />

          </div>

          <button

  onClick={
    editingId
      ? updateTask
      : saveTask
  }

  className="bg-blue-700 text-white px-8 py-3 rounded-xl mt-6 hover:bg-blue-800"

>

  {editingId
    ? "Actualizar Tarea"
    : "Guardar Tarea"
  }

</button>

        </div>

        {/* TABLA */}

        <div className={`

          rounded-3xl shadow-xl overflow-x-auto

          ${darkMode
            ? "bg-gray-800"
            : "bg-white"
          }

        `}>

          <table className="w-full">

            <thead className="bg-blue-700 text-white">

              <tr>

                <th className="p-4">
                  ID
                </th>

                <th className="p-4">
                  Título
                </th>

                <th className="p-4">
                  Responsable
                </th>

                <th className="p-4">
                  Estado
                </th>

                <th className="p-4">
                  Fecha
                </th>

                <th className="p-4">
                  Acciones
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredTasks.map((task) => (

                <tr
                  key={task.id}
                  className="text-center border-b"
                >

                  <td className="p-4">
                    {task.id}
                  </td>

                  <td className="p-4">
                    {task.titulo}
                  </td>

                  <td className="p-4">
                    {task.responsable}
                  </td>

                  <td className="p-4">
                    {task.estado}
                  </td>

                  <td className="p-4">
                    {task.fecha}
                  </td>

                  <td className="p-4">

                    <td className="p-4 space-x-2">

  <button

    onClick={() =>
      editTask(task)
    }

    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"

  >
    Editar
  </button>

  <button

    onClick={() =>
      deleteTask(task.id)
    }

    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"

  >
    Eliminar
  </button>

</td>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )

}

export default Tasks