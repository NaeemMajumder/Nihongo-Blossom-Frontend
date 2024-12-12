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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/lessons",
        element: <UserAllLessons />,
        loader: () => fetch(`http://localhost:8080/lessons`),
      },
      {
        path: "/lessons/:id",
        element: <UserLessonDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:8080/lessons/${params.id}`),
      },
      {
        path: "/tutorials",
        element: <UserAllTutorials />,
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
    element: <Admin />,
    children: [
      {
        path: "/admin",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/admin/allLessons",
        element: <A_allLessons />,
        loader: () => fetch(`http://localhost:8080/lessons`),
      },
      {
        path: "/admin/allLessons/:id",
        element: <A_lessonDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:8080/admin/allLessons/${params.id}`),
      },
      {
        path: "/admin/allLessons/edit/:id",
        element: <A_editLesson />,
        loader: ({ params }) =>
          fetch(`http://localhost:8080/admin/allLessons/edit/${params.id}`),
      },
      {
        path: "/admin/allVocabularies",
        element: <A_allVocabularies />,
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
        element: <A_vocabDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:8080/admin/allVocabularies/${params.id}`),
      },
      {
        path: "/admin/allVocabularies/edit/:id",
        element: <A_editVocabulary />,
        loader: ({ params }) =>
          fetch(`http://localhost:8080/admin/allVocabularies/edit/${params.id}`),
      },
      {
        path: "/admin/allTutorials",
        element: <A_allTutorials />,
        loader: () => fetch(`http://localhost:8080/admin/allTutorials`),
      },
      {
        path: "/admin/allUsers",
        element: <A_allUsers />,
        loader: () => fetch(`http://localhost:8080/admin/allUsers`),
      },
      {
        path: "/admin/addLessons",
        element: <A_addLessons />,
      },
      {
        path: "/admin/addVocabulary",
        element: <A_addVocabulary />,
      },
      {
        path: "/admin/addTutorial",
        element: <A_addTutorial />,
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
