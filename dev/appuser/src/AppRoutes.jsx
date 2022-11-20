import React, { useContext, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/home/Home";
import { AuthProvider, AuthContext } from "./contexts/auth";
import WithNav from "./WithNav";
import WithoutNav from "./WithoutNav";
import Error404 from "./pages/error/404";

const MidiaAll = lazy(() => import("./pages/midiaAll/MidiaAllCon"));
const MidiaUsuarioAll = lazy(() =>
  import("./pages/midiaUsuarioAll/MidiaUsuarioAllCon")
);
const MidiaUsuarioFav = lazy(() =>
  import("./pages/midiaUsuarioFav/MidiaUsuarioFavCon")
);
const MidiaUsuarioInteresse = lazy(() =>
  import("./pages/midiaUsuarioInteresse/MidiaUsuarioInteresseCon")
);
const MidiaUsuarioAssistindo = lazy(() =>
  import("./pages/midiaUsuarioAssistindo/MidiaUsuarioAssistindoCon")
);
const MidiaUsuarioConcluido = lazy(() =>
  import("./pages/midiaUsuarioConcluido/MidiaUsuarioConcluidoCon")
);
const Login = lazy(() => import("./pages/login/LoginCon"));

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div>Carregando...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<div className="textWhite">Carregando...</div>}>
          <Routes>
            <Route element={<WithoutNav />}>
              <Route exact path="/login" element={<Login />} />
            </Route>

            <Route element={<WithNav />}>
              <Route
                exact
                path="/"
                element={
                  <Private>
                    <HomePage />
                  </Private>
                }
              />
              <Route
                exact
                path="/midias/all"
                element={
                  <Private>
                    <MidiaAll />
                  </Private>
                }
              />
              <Route
                exact
                path="/midiasUsuario/all"
                element={
                  <Private>
                    <MidiaUsuarioAll />
                  </Private>
                }
              />
              <Route
                path="/midiasUsuario/favoritos"
                element={
                  <Private>
                    <MidiaUsuarioFav />
                  </Private>
                }
              />
              <Route
                path="/midiasUsuario/interesses"
                element={
                  <Private>
                    <MidiaUsuarioInteresse />
                  </Private>
                }
              />
              <Route
                path="/midiasUsuario/assistindo"
                element={
                  <Private>
                    <MidiaUsuarioAssistindo />
                  </Private>
                }
              />
              <Route
                path="/midiasUsuario/concluidas"
                element={
                  <Private>
                    <MidiaUsuarioConcluido />
                  </Private>
                }
              />
              <Route
                path="*"
                element={
                  <Private>
                    <Error404 />
                  </Private>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
};
export default AppRoutes;
