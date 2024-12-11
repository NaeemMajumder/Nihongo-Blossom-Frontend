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
import A_addLessons from "../main/A_addLessons.jsx";
import A_addVocabulary from "../main/A_addVocabulary.jsx";
import UserAllLessons from "../main/UserAllLessons.jsx";
import Demo from "../../demo.jsx";
import UserAllTutorials from "../main/UserAllTutorials.jsx";
import A_allTutorials from "../main/A_allTutorials.jsx";


export const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        errorElement: <Error />,
        children:[
            {
                path:'/lessons',
                element:<UserAllLessons />
            },
            {
                path:'/tutorials',
                element:<UserAllTutorials />
            },
            {
                path:'/demo',
                element: <Demo />
            },
        
        ]
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
                path:'/admin/allTutorials',
                element:<A_allTutorials />
            },
            {
                path:'/admin/allUsers',
                element:<A_allUsers />
            },
            {
                path:'/admin/addLessons',
                element:<A_addLessons />
            },
            {
                path:'/admin/addVocabulary',
                element:<A_addVocabulary />
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