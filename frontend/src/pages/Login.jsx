import {
  useState
} from "react"

import axios from "axios"

import {
  useNavigate
} from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [isRegister, setIsRegister] =
    useState(false)

  const [email, setEmail] = useState("")

  const [password, setPassword] =
    useState("")

  // =========================
  // LOGIN
  // =========================

  const login = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(

        "http:////ingete-backend.onrender.com",

        {
          email,
          password
        }

      )

      if (response.data.success) {

        localStorage.setItem(

          "token",

          response.data.token

        )

        localStorage.setItem(

          "user",

          JSON.stringify(
            response.data.user
          )

        )

        alert("Login correcto")

        navigate("/dashboard")

      }

    } catch (error) {

      alert("Credenciales incorrectas")

      console.log(error)

    }

  }

  // =========================
  // REGISTER
  // =========================

  const register = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(

        "https://ingete-backend.onrender.com/register",

        {
          email,
          password
        }

      )

      if (response.data.success) {

        alert(
          "Usuario registrado correctamente"
        )

        setIsRegister(false)

        setEmail("")
        setPassword("")

      }

    } catch (error) {

      alert("Error al registrar el usuario")

      console.log(error)

    }

  }

  return (

    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-600 flex items-center justify-center p-5">

      <form
        onSubmit={
          isRegister
            ? register
            : login
        }
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md"
      >

        <div className="text-center">

          <h1 className="text-5xl font-bold text-blue-800">
            Ingetec
          </h1>

          <p className="text-gray-500 mt-3 mb-8">

            {isRegister
              ? "Crear nueva cuenta"
              : "Sistema Web de Monitoreo y Control"
            }

          </p>

        </div>

        {/* EMAIL */}

        <div className="mb-5">

          <label className="block text-gray-700 mb-2">
            Correo electrónico
          </label>

          <input
            type="email"
            placeholder="Ingrese su correo"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-blue-600"
            required
          />

        </div>

        {/* PASSWORD */}

        <div className="mb-8">

          <label className="block text-gray-700 mb-2">
            Contraseña
          </label>

          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-blue-600"
            required
          />

        </div>

        {/* BOTÓN */}

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl text-lg font-bold transition duration-300"
        >

          {isRegister
            ? "Crear Cuenta"
            : "Iniciar Sesión"
          }

        </button>

        {/* CAMBIAR */}

        <p className="text-center mt-6 text-gray-600">

          {isRegister
            ? "¿Ya tienes cuenta?"
            : "¿No tienes cuenta?"
          }

          <button
            type="button"
            onClick={() =>
              setIsRegister(!isRegister)
            }
            className="text-blue-700 font-bold ml-2"
          >

            {isRegister
              ? "Iniciar sesión"
              : "Crear cuenta"
            }

          </button>

        </p>

      </form>

    </div>

  )

}

export default Login