import { createBrowserRouter } from "react-router-dom";
import App from "../../App.jsx"
import UserLogin from "../authForm/UserLogin.jsx";
import UserRegistration from "../authForm/UserRegistration.jsx";
import A_login from "../authForm/A_login.jsx";
import Error from "../error/Error.jsx";
import Admin from "../../Admin.jsx";
import Dashboard from "../main/Dashboard.jsx";
import A_allLessons from "../main/A_allLessons.jsx";
import A_allVocabularies from "../main/A_allVocabularies.jsx";
import A_allUsers from "../main/A_allUsers.jsx";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        errorElement: <Error />,
    },
    {
        path:'/login',
        element: <UserLogin />
    },
    {
        path:'/register',
        element: <UserRegistration />
    },

    // admin
    {
        path:'/admin',
        element:<Admin />,
        children:[
            {
                path:'/admin',
                element:<Dashboard></Dashboard>
            },
            {
                path:'/admin/allLessons',
                element:<A_allLessons />
            },
            {
                path:'/admin/allVocabularies',
                element:<A_allVocabularies />
            },
            {
                path:'/admin/allUsers',
                element:<A_allUsers />
            },
        ]
    },
    {
        path:'/admin/login',
        element: <A_login />
    },

    // error
    {
        path:"*",
        element: <Error />
    }
])