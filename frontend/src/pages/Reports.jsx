import {
  useEffect,
  useState,
  useRef,
  useContext
} from "react"

import axios from "axios"

import {

  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer

} from "recharts"

import {
  Link
} from "react-router-dom"

import {
  ThemeContext
} from "../context/ThemeContext"

function Reports() {

  const theme = useContext(ThemeContext)

  const darkMode =
    theme?.darkMode || false

  const reportRef = useRef()

  const [projects, setProjects] =
    useState([])

  const [tasks, setTasks] =
    useState([])

  // =========================
  // OBTENER DATOS
  // =========================

  const getData = async () => {

    try {

      const projectsResponse =
        await axios.get(
          "https://ingete-backend.onrender.com/register"
        )

      const tasksResponse =
        await axios.get(
          "https://ingete-backend.onrender.com/register"
        )

      setProjects(projectsResponse.data)

      setTasks(tasksResponse.data)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {

    getData()

  }, [])

  // =========================
  // IMPRIMIR PDF
  // =========================

  const generatePDF = () => {

    window.print()

  }

  // =========================
  // DATOS DEL GRÁFICO
  // =========================

  const chartData = [

    {
      nombre: "Proyectos",
      total: projects.length
    },

    {
      nombre: "Tareas",
      total: tasks.length
    }

  ]

  return (

    <div className="flex flex-col md:flex-row">

      {/* SIDEBAR */}

      <div className="w-full md:w-64 min-h-screen bg-blue-900 text-white p-5 print:hidden">

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

            <li className="hover:bg-blue-700 p-3 rounded-lg">
              Tareas
            </li>

          </Link>

          <Link to="/reports">

            <li className="bg-blue-700 p-3 rounded-lg">
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

        {/* CABECERA */}

        <div className="flex justify-between items-center mb-10 print:hidden">

          <h2 className="text-4xl font-bold">
            Reportes del Sistema
          </h2>

          <button
            onClick={generatePDF}
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700"
          >
            Imprimir PDF
          </button>

        </div>

        {/* REPORTE */}

        <div
          ref={reportRef}
          className={`

            p-10 rounded-3xl shadow-xl

            ${darkMode
              ? "bg-gray-800 text-white"
              : "bg-white text-black"
            }

          `}
        >

          <h1 className="text-4xl font-bold text-center mb-4">
            INGETEC
          </h1>

          <p className="text-center mb-10 text-lg">

            Reporte General del Sistema Web

          </p>

          <p className="mb-10">

            Fecha:
            {" "}
            {new Date().toLocaleDateString()}

          </p>

          {/* TARJETAS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

            <div className="bg-blue-100 p-6 rounded-2xl">

              <h3 className="text-2xl font-bold text-blue-800">
                Total Proyectos
              </h3>

              <p className="text-5xl mt-4 font-bold text-black">
                {projects.length}
              </p>

            </div>

            <div className="bg-green-100 p-6 rounded-2xl">

              <h3 className="text-2xl font-bold text-green-800">
                Total Tareas
              </h3>

              <p className="text-5xl mt-4 font-bold text-black">
                {tasks.length}
              </p>

            </div>

          </div>

          {/* GRÁFICO */}

          <div className="bg-white p-8 rounded-2xl shadow-xl mt-10 mb-10">

            <h2 className="text-3xl font-bold mb-6 text-black">

              Estadísticas del Sistema

            </h2>

            <ResponsiveContainer
              width="100%"
              height={400}
            >

              <BarChart data={chartData}>

                <XAxis dataKey="nombre" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="total"
                  fill="#1D4ED8"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* TABLA PROYECTOS */}

          <h3 className="text-3xl font-bold mb-5">
            Lista de Proyectos
          </h3>

          <div className="overflow-x-auto">

            <table className="w-full border mb-10">

              <thead className="bg-blue-700 text-white">

                <tr>

                  <th className="p-3">
                    Nombre
                  </th>

                  <th className="p-3">
                    Responsable
                  </th>

                  <th className="p-3">
                    Estado
                  </th>

                  <th className="p-3">
                    Fecha
                  </th>

                </tr>

              </thead>

              <tbody>

                {projects.map((project) => (

                  <tr
                    key={project.id}
                    className="border-b text-center"
                  >

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
                      {project.fecha}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* TABLA TAREAS */}

          <h3 className="text-3xl font-bold mb-5">
            Lista de Tareas
          </h3>

          <div className="overflow-x-auto">

            <table className="w-full border">

              <thead className="bg-green-700 text-white">

                <tr>

                  <th className="p-3">
                    Título
                  </th>

                  <th className="p-3">
                    Responsable
                  </th>

                  <th className="p-3">
                    Estado
                  </th>

                  <th className="p-3">
                    Fecha
                  </th>

                </tr>

              </thead>

              <tbody>

                {tasks.map((task) => (

                  <tr
                    key={task.id}
                    className="border-b text-center"
                  >

                    <td className="p-3">
                      {task.titulo}
                    </td>

                    <td className="p-3">
                      {task.responsable}
                    </td>

                    <td className="p-3">
                      {task.estado}
                    </td>

                    <td className="p-3">
                      {task.fecha}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  )

}

export default Reports