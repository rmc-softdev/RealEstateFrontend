import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// import Users from "./user/pages/Users";
// import NewPlace from "./places/pages/NewPlace";
// import UserPlaces from "./places/pages/UserPlaces";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import { useMap } from "./shared/hooks/map-hook";
import { MapContext } from "./shared/context/googleMaps-context";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import Home from "./shared/Home";
import HomesShowCase from "./places/pages/HomesShowCase";
import EachHome from "./places/pages/EachHome";

const Users = React.lazy(() => import("./user/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

const App = () => {
  const { token, login, logout, userId, userAvatar } = useAuth();
  const { locations, getLocations } = useMap();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/agents" exact>
          <Users />
        </Route>
        <Route path="/homes/new" exact>
          <HomesShowCase />
        </Route>
        <Route path="/homes/:homeId" component={EachHome} />
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/agents" exact>
          <Users />
        </Route>
        <Route path="/homes/new" exact>
          <HomesShowCase />
        </Route>
        <Route path="/homes/:homeId" component={EachHome} />
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
        userAvatar: userAvatar,
      }}
    >
      <MapContext.Provider
        value={{
          locations: locations,
          getLocations: getLocations,
        }}
      >
        <Router>
          <MainNavigation />
          <main>
            <Suspense
              fallback={
                <div className="center">
                  <LoadingSpinner />
                </div>
              }
            >
              {routes}
            </Suspense>
          </main>
        </Router>
      </MapContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
