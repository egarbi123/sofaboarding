import React from "react";
import { Route, Switch, Router, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from '../constants/chat_constants';
import { ProtectedRoute, AuthRoute } from '../util/protected_route';
import CreateUserContainer from './users/create_user_container';
import UserProfileContainer from './users/user_profile_container';
import UserIndexContainer from './users/user_index_container';
import LoginUserContainer from './users/login_user_container';
import SplashContainer from './splash/splash_container';
// import MessageFormContainer from './chat/message_form_container';
import NavBar from './navbar/navbar_container';
import ChatBlockContainer from './chat/chat_block_container';


const customHistory = createBrowserHistory();
const App = () => (
    <div>
        <Router history={customHistory}>
            <BrowserRouter>
                <ActionCableProvider url={API_WS_ROOT}>
                    <NavBar />
                    <Switch history={customHistory}>
                        <AuthRoute exact path="/login" component={LoginUserContainer} />
                        <AuthRoute exact path="/signup" component={CreateUserContainer} />
                        {/* <Route exact path="/newmessage" component={MessageFormContainer} /> */}
                        <Route exact path="/users" component={UserIndexContainer} />
                        <ProtectedRoute exact path="/profile" component={UserProfileContainer} />
                        <ProtectedRoute exact path="/" component={SplashContainer} />
                        <ProtectedRoute exact path="/chat" component={ChatBlockContainer} />
                    </Switch>
                </ActionCableProvider>
            </BrowserRouter>
        </Router>
    </div>
);

export default App;