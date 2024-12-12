import { createBrowserRouter } from "react-router-dom";
import App from "../../App.jsx";
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
import UserAllTutorials from "../main/UserAllTutorials.jsx";
import A_allTutorials from "../main/A_allTutorials.jsx";
import A_addTutorial from "../main/A_addTutorial.jsx";
import UserLessonDetails from "../main/UserLessonDetails.jsx";
import A_vocabDetails from "../main/A_vocabDetails.jsx";
import A_editVocabulary from "../main/A_editVocabulary.jsx";
import A_lessonDetails from "../main/A_lessonDetails.jsx";
import A_editLesson from "../main/A_editLesson.jsx";
import A_editTutorial from "../main/A_editTutorial.jsx";
import PrivateRoute from "../provider/PrivateRoute.jsx";

import RouteAccess from "../provider/RouteAccess.jsx";
import MYProfile from "../header/MyProfile.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><App /></PrivateRoute>,
    errorElement: <Error />,
    children: [
      {
        path: "myProfile",
        element: <PrivateRoute><MYProfile /></PrivateRoute>,
      },
      {
        path: "/lessons",
        element:<PrivateRoute><UserAllLessons /></PrivateRoute>,
        loader: () => fetch(`http://localhost:8080/lessons`),
      },
      {
        path: "/lessons/:id",
        element: <PrivateRoute><UserLessonDetails /></PrivateRoute>,
        loader: ({ params }) =>
          fetch(`http://localhost:8080/lessons/${params.id}`),
      },
      {
        path: "/tutorials",
        element: <PrivateRoute><UserAllTutorials /></PrivateRoute>,
        loader: () => fetch(`http://localhost:8080/admin/allTutorials`),
      },
    ],
  },
  {
    path: "/login",
    element: <UserLogin />,
  },
  {
    path: "/register",
    element: <UserRegistration />,
  },

  // admin
  {
    path: "/admin",
    element: <PrivateRoute><RouteAccess><Admin /></RouteAccess></PrivateRoute>,
    children: [
      {
        path: "/admin",
        element: <PrivateRoute><RouteAccess><Dashboard></Dashboard></RouteAccess></PrivateRoute>,
        loader: async () => {
          // Fetch both vocabularies and lessons concurrently
          const [vocabulariesResponse, lessonsResponse, usersResponse] =
            await Promise.all([
              fetch("http://localhost:8080/admin/allVocabularies"),
              fetch("http://localhost:8080/admin/allLessons"),
              fetch("http://localhost:8080/admin/allUsers"),
            ]);
          // Wait for responses to be converted to JSON
          const vocabularies = await vocabulariesResponse.json();
          const lessons = await lessonsResponse.json();
          const users = await usersResponse.json();

          // Return the data so it can be accessed by the component
          return { vocabularies, lessons, users };
        },
      },
      {
        path: "/admin/allLessons",
        element: <PrivateRoute><RouteAccess><A_allLessons /></RouteAccess></PrivateRoute>,
        loader: () => fetch(`http://localhost:8080/lessons`),
      },
      {
        path: "/admin/allLessons/:id",
        element: <PrivateRoute><RouteAccess><A_lessonDetails /></RouteAccess></PrivateRoute>,
        loader: ({ params }) =>
          fetch(`http://localhost:8080/admin/allLessons/${params.id}`),
      },
      {
        path: "/admin/allLessons/edit/:id",
        element: <PrivateRoute><RouteAccess><A_editLesson /></RouteAccess></PrivateRoute>,
        loader: ({ params }) =>
          fetch(`http://localhost:8080/admin/allLessons/edit/${params.id}`),
      },
      {
        path: "/admin/allVocabularies",
        element: <PrivateRoute><RouteAccess><A_allVocabularies /></RouteAccess></PrivateRoute>,
        loader: async () => {
          // Fetch both vocabularies and lessons concurrently
          const [vocabulariesResponse, lessonsResponse] = await Promise.all([
            fetch("http://localhost:8080/admin/allVocabularies"),
            fetch("http://localhost:8080/admin/allLessons"),
          ]);

          // Parse both responses as JSON
          const allVocabularies = await vocabulariesResponse.json();
          const lessons = await lessonsResponse.json();

          // Return both vocabularies and lessons
          return { allVocabularies, lessons };
        },
      },
      {
        path: "/admin/allVocabularies/:id",
        element: <PrivateRoute><RouteAccess><A_vocabDetails /></RouteAccess></PrivateRoute>,
        loader: ({ params }) =>
          fetch(`http://localhost:8080/admin/allVocabularies/${params.id}`),
      },
      {
        path: "/admin/allVocabularies/edit/:id",
        element: <PrivateRoute><RouteAccess><A_editVocabulary /></RouteAccess></PrivateRoute>,
        loader: ({ params }) =>
          fetch(
            `http://localhost:8080/admin/allVocabularies/edit/${params.id}`
          ),
      },
      {
        path: "/admin/allTutorials",
        element: <PrivateRoute><RouteAccess><A_allTutorials /></RouteAccess></PrivateRoute>,
        loader: () => fetch(`http://localhost:8080/admin/allTutorials`),
      },
      {
        path: "/admin/allTutorials/edit/:id",
        element: <PrivateRoute><RouteAccess><A_editTutorial /></RouteAccess></PrivateRoute>,
        loader: ({ params }) =>
          fetch(`http://localhost:8080/admin/allTutorials/edit/${params.id}`),
      },
      {
        path: "/admin/allUsers",
        element: <PrivateRoute><RouteAccess><A_allUsers /></RouteAccess></PrivateRoute>,
        loader: () => fetch(`http://localhost:8080/admin/allUsers`),
      },
      {
        path: "/admin/addLessons",
        element: <PrivateRoute><RouteAccess><A_addLessons /></RouteAccess></PrivateRoute>,
      },
      {
        path: "/admin/addVocabulary",
        element: <PrivateRoute><RouteAccess><A_addVocabulary /></RouteAccess></PrivateRoute>,
      },
      {
        path: "/admin/addTutorial",
        element: <PrivateRoute><RouteAccess><A_addTutorial /></RouteAccess></PrivateRoute>,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <A_login />,
  },

  // error
  {
    path: "*",
    element: <Error />,
  },
]);
