import {
  Navigate
} from "react-router-dom"

function ProtectedRoute({

  children

}) {

  const token =
    localStorage.getItem("token")

  // si no existe token
  if (!token) {

    return <Navigate to="/" />

  }

  // si existe token
  return children

}

export default ProtectedRoute