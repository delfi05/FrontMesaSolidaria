import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/home/Home"
import { Projects } from "@/pages/project/Projects";
import { ProjectUnique } from "@/pages/project/ProjectUnique";
import { Join } from "@/pages/join/Join";
import { News } from "./pages/news/News";
import { NewsUnique } from "@/pages/news/NewsUnique";
import { Know } from "@/pages/know/Know";
import { Donate } from "@/pages/donate/Donate";
import { Login } from "@/pages/login/Login";
import { PanelHome } from "@/pages/panel_adm/PanelHome";
import { PanelNews } from "./pages/panel_adm/PanelNews";
import { PanelProjects } from "./pages/panel_adm/PanelProjects";
import { PanelManager } from "./pages/panel_adm/PanelManager";
import PrivateRoute from "./service/PrivateRoute";
import { useEffect, useState } from "react";
import { ProjectService } from "./service/ProjectService";
import { NewsService } from "./service/NewsService";

const { getAvailableProjects } = ProjectService();
const { getAllNews } = NewsService();

const getProjects = (setAvailableProjects, setLoadingProjects, setErrorProjects) => {
  getAvailableProjects()
    .then((response) => {
      setLoadingProjects(false);
      setAvailableProjects(response.data);
    })
    .catch((error) => {
      console.log(error);
      setErrorProjects('Hubo un error al cargar los proyectos. Por favor, intenta recargar la página.')
      setAvailableProjects([]);
    });
}

const getNews = (setNews, setLoadingNews, setErrorNews) => {
  getAllNews()
    .then((response) => {
      setLoadingNews(false);
      const news = response.data.sort((a, b) => new Date(b.date) - new Date(a.date))
      setNews(news);
    })
    .catch((error) => {
      console.log(error);
      setErrorNews('Hubo un error al cargar las noticias. Por favor, intenta recargar la página.');
      setNews([]);
    });
};

function App() {
  const [availableProjects, setAvailableProjects] = useState([]);
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [errorNews, setErrorNews] = useState(null);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [errorProjects, setErrorProjects] = useState(null);

  useEffect(() => {
    getProjects(setAvailableProjects, setLoadingProjects, setErrorProjects);
    getNews(setNews, setLoadingNews, setErrorNews);
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Home
            projects={availableProjects}
            loadingProjects={loadingProjects}
            errorProjects={errorProjects}
            news={news}
            loadingNews={loadingNews}
            errorNews={errorNews}
          />
        } />
        <Route path="/know" element={<Know />} />
        <Route path="/projects" element={<Projects projects={availableProjects} />} />
        <Route path="/projects/:id" element={<ProjectUnique />} />
        <Route path="/news" element={<News news={news} />} />
        <Route path="/news/:id" element={<NewsUnique />} />
        <Route path="/join" element={<Join />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/panelAdministration" element={<PrivateRoute><PanelHome /></PrivateRoute>} />
        <Route path="/panelAdministration/news" element={<PrivateRoute><PanelNews /></PrivateRoute>} />
        <Route path="/panelAdministration/projects" element={<PrivateRoute><PanelProjects /></PrivateRoute>} />
        <Route path="/panelAdministration/managers" element={<PrivateRoute><PanelManager /></PrivateRoute>} />

        {/* <Route path="/panelAdministration" element={<PanelHome />} /> */}
        {/* <Route path="/panelAdministration/news" element={<PanelNews />} /> */}
        {/* <Route path="/panelAdministration/projects" element={<PanelProjects />} /> */}
        {/* <Route path="/panelAdministration/managers" element={<PanelManager />} /> */}


      </Routes>
    </Router>
  )
}


export default App
