import React, { useState, Component } from "react";
import { Switch, Route,  Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";



import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import Dash from "./Dashboard";
import CoasterDetails from "./CoasterDetails";
import Productos from "./Productos";

import Prueba3d from "./components/Scene3d.component";
import Modelado from "./3dmodels";

// function App () {
//   const [state, setState] = useState({
//         showModeratorBoard: false,
//         showAdminBoard: false,
//         currentUser: undefined,
//   })

//   const user = AuthService.getCurrentUser();
  
//     if (user) {
//       setState({
//         currentUser: user,
//         showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
//         showAdminBoard: user.roles.includes("ROLE_ADMIN"),
//       });
//     }
    
//     EventBus.on("logout", () => {
//       logOut();
//     });
  

//   EventBus.remove("logout");

//   const logOut = () => {
//     AuthService.logout();
//     setState({
//       showModeratorBoard: false,
//       showAdminBoard: false,
//       currentUser: undefined,
//   });
//   return (
//     <div>
//         <nav className="navbar navbar-expand navbar-dark bg-dark">
//           <Link to={"/"} className="navbar-brand">
//             AWF
//           </Link>
//           <div className="navbar-nav mr-auto">
//             <li className="nav-item">
//               <Link to={"/home"} className="nav-link">
//                 Home
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/objeto3d"} className="nav-link">
//                 Visor 3d
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/modelado"} className="nav-link">
//                 Modelado
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/products"} className="nav-link">
//                 Productos
//               </Link>
//             </li>

//             {state.showModeratorBoard && (
//               <li className="nav-item">
//                 <Link to={"/mod"} className="nav-link">
//                   Moderator Board
//                 </Link>
//               </li>
//             )}

//             {state.showAdminBoard && (
//               <li className="nav-item">
//                 <Link to={"/admin"} className="nav-link">
//                   Admin Board
//                 </Link>
//               </li>
//             )}

//             {state.currentUser && (
//               <li className="nav-item">
//                 <Link to={"/user"} className="nav-link">
//                   User
//                 </Link>
//               </li>
//             )}

// {state.currentUser && (
//               <li className="nav-item">
//                 <Link to={"/dash"} className="nav-link">
//                   Dashboard
//                 </Link>
//               </li>
//             )}
//           </div>

//           {state.currentUser ? (
//             <div className="navbar-nav ml-auto">
//               <li className="nav-item">
//                 <Link to={"/profile"} className="nav-link">
//                   {state.currentUser.username}
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <a href="/login" className="nav-link" onClick={logOut}>
//                   LogOut
//                 </a>
//               </li>
//             </div>
//           ) : (
//             <div className="navbar-nav ml-auto">
//               <li className="nav-item">
//                 <Link to={"/login"} className="nav-link">
//                   Login
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <Link to={"/register"} className="nav-link">
//                   Sign Up
//                 </Link>
//               </li>
//             </div>
//           )}
//         </nav>

//         <div className="container mt-3">
//           <Switch>
//             <Route exact path={["/", "/home"]} component={Home} />
//             <Route exact path="/login" component={Login} />
//             <Route exact path="/register" component={Register} />
//             <Route exact path="/profile" component={Profile} />
//             <Route path="/user" component={BoardUser} />
//             <Route path="/mod" component={BoardModerator} />
//             <Route path="/admin" component={BoardAdmin} />
//             <Route path="/products" component={Products}/>
//             <Route path="/dash" component={Dash}/>
//             <Route path="/modelado" component={Modelado}/>
//             <Route exact path="/objeto3d" component={Prueba3d}/>
//           </Switch>
//         </div>

//         { /*<AuthVerify logOut={this.logOut}/> */ }
//       </div>
//   )
// }
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }
  
  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    console.log(currentUser)
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            AWF
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/objeto3d"} className="nav-link">
                Visor 3d
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/modelado"} className="nav-link">
                Modelado
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/products"} className="nav-link">
                Productos
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}

{currentUser && (
              <li className="nav-item">
                <Link to={"/dash"} className="nav-link">
                  Dashboard
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        {
          AuthService.getCurrentUser() ? null : <Redirect to="/login" />
          
        }

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/products" component={Productos}/>
            <Route path="/details" component={CoasterDetails}/>
            <Route path="/dash" component={Dash}/>
            <Route path="/modelado" component={Modelado}/>
            <Route exact path="/objeto3d" component={Prueba3d}/>
          </Switch>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
    );
  }
}

export default App;
