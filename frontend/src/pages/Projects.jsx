import { useEffect, useState } from "react"
import {
  useContext
} from "react"

import axios from "axios"

import {
  Link
} from "react-router-dom"

import {
  ThemeContext
} from "../context/ThemeContext"

function Projects() {

  const theme = useContext(ThemeContext)

  const darkMode = theme?.darkMode || false

  const [projects, setProjects] = useState([])

  const [search, setSearch] =
  useState("")

  const [editingId, setEditingId] = useState(null)

  const [form, setForm] = useState({

    nombre: "",
    responsable: "",
    estado: "",
    fecha: ""

  })

  // =========================
  // OBTENER PROYECTOS
  // =========================

  useEffect(() => {

    getProjects()

  }, [])

  const getProjects = async () => {

    try {

      const response = await axios.get(
        "https://ingete-backend.onrender.com/projects"
      )

      setProjects(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  // =========================
  // CAPTURAR INPUTS
  // =========================

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    })

  }

  // =========================
  // GUARDAR
  // =========================

  const saveProject = async () => {

    try {

      await axios.post(
        "https://ingete-backend.onrender.com/projects",
        form
      )

      alert("Proyecto guardado")

      getProjects()

      resetForm()

    } catch (error) {

      console.log(error)

    }

  }

  // =========================
  // PREPARAR EDICIÓN
  // =========================

  const startEdit = (project) => {

    setEditingId(project.id)

    setForm({

      nombre: project.nombre,
      responsable: project.responsable,
      estado: project.estado,
      fecha: project.fecha?.split("T")[0]

    })

  }

  // =========================
  // ACTUALIZAR
  // =========================

  const updateProject = async () => {

    try {

      await axios.put(

        `https://ingete-backend.onrender.com/projects/${editingId}`,

        form

      )

      alert("Proyecto actualizado")

      getProjects()

      resetForm()

    } catch (error) {

      console.log(error)

    }

  }

  // =========================
  // ELIMINAR
  // =========================

  const deleteProject = async (id) => {

    const confirmar = confirm(
      "¿Deseas eliminar este proyecto?"
    )

    if (!confirmar) return

    try {

      await axios.delete(
        `https://ingete-backend.onrender.com/projects/${id}`,
      )

      alert("Proyecto eliminado")

      getProjects()

    } catch (error) {

      console.log(error)

    }

  }

  // =========================
  // LIMPIAR FORMULARIO
  // =========================

  const resetForm = () => {

    setForm({

      nombre: "",
      responsable: "",
      estado: "",
      fecha: ""

    })

    setEditingId(null)

  }


  const filteredProjects =

  projects.filter((project) =>

    project.nombre
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
            <li className="bg-blue-700 p-3 rounded-lg">
              Proyectos
            </li>
          </Link>

          <Link to="/tasks">
            <li className="hover:bg-blue-700 p-3 rounded-lg">
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

      <div
        className={`

          flex-1 p-5 md:p-10

          ${darkMode
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-black"
          }

        `}
      >

        <h2 className="text-4xl font-bold mb-10">
          Gestión de Proyectos
        </h2>

        <div className="mt-6 mb-6">

  <input

    type="text"

    placeholder="Buscar proyecto..."

    value={search}

    onChange={(e) =>
      setSearch(e.target.value)
    }

    className="w-full border p-4 rounded-xl text-black"

  />

</div>

        {/* FORMULARIO */}

        <div
          className={`

            rounded-2xl shadow-xl p-6 mb-10

            ${darkMode
              ? "bg-gray-800"
              : "bg-white"
            }

          `}
        >

          <h3 className="text-2xl font-bold mb-6">

            {editingId
              ? "Editar Proyecto"
              : "Registrar Proyecto"
            }

          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre del proyecto"
              className="border p-3 rounded-xl text-black"
            />

            <input
              type="text"
              name="responsable"
              value={form.responsable}
              onChange={handleChange}
              placeholder="Responsable"
              className="border p-3 rounded-xl text-black"
            />

            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="border p-3 rounded-xl text-black"
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

              <option value="Completado">
                Completado
              </option>

            </select>

            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              className="border p-3 rounded-xl text-black"
            />

          </div>

          <div className="mt-6 flex gap-4">

            {editingId ? (

              <>
                <button
                  onClick={updateProject}
                  className="bg-yellow-500 text-white px-6 py-3 rounded-xl"
                >
                  Actualizar
                </button>

                <button
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-6 py-3 rounded-xl"
                >
                  Cancelar
                </button>
              </>

            ) : (

              <button
                onClick={saveProject}
                className="bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                Guardar Proyecto
              </button>

            )}

          </div>

        </div>

        {/* TABLA */}

        <div
          className={`

            rounded-2xl shadow-xl p-6 overflow-auto

            ${darkMode
              ? "bg-gray-800"
              : "bg-white"
            }

          `}
        >

          <table className="w-full">

            <thead>

              <tr className="bg-blue-700 text-white">

                <th className="p-3">ID</th>
                <th className="p-3">Proyecto</th>
                <th className="p-3">Responsable</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Acciones</th>

              </tr>

            </thead>

            <tbody>

              {filteredProjects.map((project) => (

                <tr
                  key={project.id}
                  className="border-b text-center"
                >

                  <td className="p-3">
                    {project.id}
                  </td>

                  <td className="p-3">
                    {project.nombre}
                  </td>

                  <td className="p-3">
                    {project.responsable}
                  </td>

                  <td className="p-3">
                    {project.estado}
                  </td>

                  <td className="p-3">
                    {project.fecha?.split("T")[0]}
                  </td>

                  <td className="p-3 space-x-2">

                    <button
                      onClick={() => startEdit(project)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => deleteProject(project.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Eliminar
                    </button>

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

export default Projects