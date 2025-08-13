import axiosInstance from "@/config/axiosConfig"

const API_NEWS = import.meta.env.VITE_API_NEWS
const API_MANAGER = import.meta.env.VITE_API_MANAGERS

export const NewsService = () => {
  const getAllNews = () => {
    return axiosInstance.get(API_NEWS)
  }
  const getNewsById = (id) => {
    return axiosInstance.get(`${API_NEWS}/${id}`)
  }
  const saveNews = (formData) => {
    return axiosInstance.post(`${API_MANAGER}/saveNews`, formData);
  }
  const updateNews = (id, news) => {
    return axiosInstance.put(`${API_MANAGER}/updateNews/${id}`, news);
  }
  const deleteNews = (id) => {
    return axiosInstance.delete(`${API_MANAGER}/deleteNews/${id}`)
  }

  return { getAllNews, getNewsById, saveNews, updateNews, deleteNews }
}