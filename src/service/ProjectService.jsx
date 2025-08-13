import axiosInstance from "@/config/axiosConfig"

const API_PROJECTS = import.meta.env.VITE_API_PROJECTS
const API_MANAGERS = import.meta.env.VITE_API_MANAGERS

export const ProjectService = () => {
  const getAllProjects = () => {
    return axiosInstance.get(API_PROJECTS)
  }
  const getAvailableProjects = () => {
    return axiosInstance.get(`${API_PROJECTS}/getAvailable`)
  }
  const getProjectById = (id) => {
    return axiosInstance.get(`${API_PROJECTS}/${id}`)
  }
  const getAvailableProjectById = (id) => {
    return axiosInstance.get(`${API_PROJECTS}/getAvailableById/${id}`)
  }
  const saveProject = (data) => {
    return axiosInstance.post(`${API_MANAGERS}/saveProject`, data);
  };
  const updateProject = (id, project) => {
    return axiosInstance.put(`${API_MANAGERS}/updateProject/${id}`, project);
  }
  const deleteProject = (id) => {
    return axiosInstance.delete(`${API_MANAGERS}/deleteProject/${id}`)
  }

  return { getAllProjects, getAvailableProjects, getProjectById, getAvailableProjectById, saveProject, updateProject, deleteProject }
}