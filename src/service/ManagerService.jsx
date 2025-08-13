import { NewsService } from "./NewsService";
import { ProjectService } from "./ProjectService";
import { VoluntaryService } from "./VoluntaryService";
import axiosInstance from "@/config/axiosConfig";

const API_MANAGERS = import.meta.env.VITE_API_MANAGERS
const API_AUTH = import.meta.env.VITE_API_AUTH

export const ManagerService = () => {
  const { saveNews, updateNews, deleteNews } = NewsService();
  const { saveProject, updateProject, deleteProject } = ProjectService();
  const { getAllVoluntaries, saveVoluntary, updateVoluntary, deleteVoluntary } = VoluntaryService();
  
  // CRUD
  const getAllManagers = () => {
    return axiosInstance.get(API_MANAGERS)
  }
  const getManagerById = (id) => {
    return axiosInstance.get(`${API_MANAGERS}/${id}`)
  }
  const getManagerByEmail = (email) => {
    return axiosInstance.get(`${API_MANAGERS}/findByEmail/${email}`)
  }
  const saveManager = (manager) => {
    return axiosInstance.post(`${API_AUTH}/register`, manager);
  }
  const updateManager = (id, manager) => {
    return axiosInstance.put(`${API_MANAGERS}/updateManager/${id}`, manager);
  }
  const deleteManager = (id) => {
    return axiosInstance.delete(`${API_MANAGERS}/deleteManager/${id}`)
  }

  // NOTICIAS
  const saveNewsByManager = (formData) => {
    return saveNews(formData);
  }
  const updateNewsByManager = (id, formDataEdition) => {
    return updateNews(id, formDataEdition);
  }
  const deleteNewsByManager = (id) => {
    return deleteNews(id);
  }

  // PROYECTOS
  const saveProjectByManager = (data) => {
    return saveProject(data);
  }
  const updateProjectByManager = (id, formDataEdition) => {
    return updateProject(id, formDataEdition);
  }
  const deleteProjectByManager = (id) => {
    return deleteProject(id);
  }

  // VOLUNTARIOS
  const getAllVoluntariesByManager = (setVoluntaries) => {
    getAllVoluntaries().then((response) => {
      setVoluntaries(response.data.reverse())
    }).catch(error => {
      console.log(error);
    });
  }
  const saveVoluntaryByManager = (voluntary) => {
    return saveVoluntary(voluntary)
  }
  const updateVoluntaryByManager = (id, formDataEdition) => {
    return updateVoluntary(id, formDataEdition);
  }
  const deleteVoluntaryByManager = (id) => {
    return deleteVoluntary(id);
  }

  return {
    getAllManagers, getManagerById, getManagerByEmail, saveManager, updateManager, deleteManager,
    saveNewsByManager, updateNewsByManager, deleteNewsByManager,
    saveProjectByManager, updateProjectByManager, deleteProjectByManager,
    getAllVoluntariesByManager, saveVoluntaryByManager, updateVoluntaryByManager, deleteVoluntaryByManager
  }
}