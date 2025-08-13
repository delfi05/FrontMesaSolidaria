import axiosInstance from "@/config/axiosConfig"

const API_VOLUNTARIES = import.meta.env.VITE_API_VOLUNTARIES
const API_MANAGERS = import.meta.env.VITE_API_MANAGERS

export const VoluntaryService = () => {
  const getAllVoluntaries = () => {
    return axiosInstance.get(`${API_MANAGERS}/getVoluntaries`)
  }
  const getVoluntaryById = (id) => {
    return axiosInstance.get(`${API_MANAGERS}/${id}`)
  }
  const getVoluntaryByEmail = (email) => {
    return axiosInstance.get(`${API_MANAGERS}/getVoluntaryByEmail/${email}`)
  }
  const saveVoluntary = (voluntary) => {
    return axiosInstance.post(API_VOLUNTARIES, voluntary);
  }
  const updateVoluntary = (id, voluntary) => {
    return axiosInstance.put(`${API_MANAGERS}/updateVoluntary/${id}`, voluntary);
  }
  const deleteVoluntary = (id) => {
    return axiosInstance.delete(`${API_MANAGERS}/deleteVoluntary/${id}`)
  }

  return { getAllVoluntaries, getVoluntaryById, getVoluntaryByEmail, saveVoluntary, updateVoluntary, deleteVoluntary }
}