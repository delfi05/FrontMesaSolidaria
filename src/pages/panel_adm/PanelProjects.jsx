import { HeaderAdm } from "@/components/gral/header/HeaderAdm";
import { Button } from "@/components/gral/buttons/Button"
import { Text } from "@/components/gral/texts/Text"
import { ManagerService } from "@/service/ManagerService";
import { ProjectService } from "@/service/ProjectService";
import { useEffect, useState } from "react";
import { IconCheck, IconClose, IconDelete, IconEllipsis, IconUpdate } from "@/components/icons/Icons"
import { Input } from "@/components/gral/inputs/Input";
import { AuthService } from "@/service/AuthService";
import { useNavigate } from "react-router-dom";
import useImageValidation from "@/components/gral/images/useImageValidation";
import { Image } from "@/components/gral/images/Image";
import { MyPagination } from "@/components/gral/pagination/MyPagination";
const { getAllProjects } = ProjectService();
const { saveProjectByManager, updateProjectByManager, deleteProjectByManager } = ManagerService();

const getProjects = (setProjects) => {
  getAllProjects().then((response) => {
    setProjects(response.data.reverse())
  }).catch(error => {
    console.log(error);
  });
}

export const PanelProjects = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', image: '', available: false});
  const [imageUrl, setImageUrl] = useState('');
  const [nameImage, setNameImage] = useState('');
  const [typeImage, setTypeImage] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editNameImage, setEditNameImage] = useState('');
  const [editTypeImage, setEditTypeImage] = useState('');
  const [openPopUp, setOpenPopUp] = useState(false);
  const [projectInEdition, setProjectInEdition] = useState(null);
  const [dataEdition, setDataEdition] = useState({});
  const [openActionsId, setOpenActionsId] = useState(null);
  const navigate = useNavigate();
  const [openPopUpDelete, setOpenPopUpDelete] = useState(false);
  const [openPopUpShowProject, setOpenPopUpShowProject] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [actualPage, setActualPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const { validateImage, error: imageValidationError } = useImageValidation();

  const handlePopUp = () => {
    setOpenPopUp(!openPopUp)
  }
  const handlePopUpShowProjects = (id) => {
    setOpenPopUpShowProject(!openPopUpShowProject)
    const selectedProject = projects.find((p) => p.id_project === id)
    setSelectedProject(selectedProject);
  }
  const handleClickActions = (id_project) => {
    setOpenActionsId(openActionsId === id_project ? null : id_project);
    console.log("Proyecto: " + id_project);
  }
  const handlePopUpDelete = (id_project) => {
    setOpenPopUpDelete(!openPopUpDelete)
    const projectDelete = projects.find((p) => p.id_project === id_project)
    setProjectToDelete(projectDelete);
  }

  /* <--------------- METODOS PARA GUARDAR PROYECTO ---------------> */
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewProject(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleImageChange = (event) => {
    validateImage()
    const file = event.target.files[0];
    if (file) {
      if (validateImage(file)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result);
          setNameImage(file.name);
          setTypeImage(file.type);
        };
        reader.readAsDataURL(file);
        setError(null);
      } else {
        setImageUrl('');
        setError(imageValidationError);
      }
    } else {
      setImageUrl('');
    }
  };

  const handleClickForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    let dataToSend;

    if (imageUrl) {
      dataToSend = {
        title: newProject.title,
        description: newProject.description,
        image: imageUrl.split(',')[1],
        nameImage: nameImage,
        typeImage: typeImage,
        available: newProject.available
      };
    }
    try {
      const response = await saveProjectByManager(dataToSend);
      console.log("Proyecto guardado:", response.data);
      setSuccess(true);
      setNewProject({ title: '', description: '', image: null, nameImage: '', typeImage: '', available: false });
      setImageUrl('');
      getProjects(setProjects)
    } catch (err) {
      console.error("Error al guardar el proyecto:", err);
      setError('Hubo un error al guardar. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  /* <--------------- METODOS PARA EDITAR PROYECTO ---------------> */
  // Esta función se utiliza para actualizar los proyectos en la misma tabla
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDataEdition({ ...dataEdition, [name]: type === 'checkbox' ? checked : value, });
  };
  const handleImageChangeForEdit = (event) => {
    const file = event.target.files[0];
    if (file && validateImage(file)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImageUrl(reader.result);
        setEditNameImage(file.name);
        setEditTypeImage(file.type);
      };
      reader.readAsDataURL(file);
      // Puedes manejar errores de validación aquí también
    } else {
      setEditImageUrl('');
      setEditNameImage('');
      setEditTypeImage('');
    }
  };
  const handleClickUpdate = (project) => {
    setProjectInEdition(project.id_project);
    setDataEdition({ ...project });
  }
  const handleSaveEdition = (id) => {
    setLoading(true);
    setError(null);

    let dataToSend = { ...dataEdition };

    if (editImageUrl) {
      dataToSend = {
        ...dataToSend,
        image: editImageUrl.split(',')[1],
        nameImage: editNameImage,
        typeImage: editTypeImage
      };
    }
    updateProjectByManager(id, dataToSend)
      .then((response) => {
        console.log('Proyecto actualizado:', response.data);
        setProjects(projects.map(p => (p.id_project === id ? response.data : p)));
        handleAnullEdition();
        getProjects(setProjects);
      })
      .catch((error) => {
        console.error('Error al actualizar el proyecto:', error);
        setError('Hubo un error al actualizar. Por favor, inténtalo de nuevo.');
      })
      .finally(() => {
        setLoading(false);
        setEditImageUrl('');
        setEditNameImage('');
        setEditTypeImage('');
      });
  };
  const handleAnullEdition = () => {

    setOpenActionsId(null);
    setProjectInEdition(null);
    setOpenPopUpDelete(false);
    setOpenPopUpShowProject(false);
    setDataEdition({});
  };

  /* <--------------- METODO PARA ELIMINAR PROYECTO ---------------> */
  const handleClickDelete = (id_project) => {
    deleteProjectByManager(id_project).then(() => {
      getProjects(setProjects);
    }).catch(error => {
      console.log(error);
    });
    setOpenPopUpDelete(false);
  }

  //useEffect(() => {
  //  if (!AuthService.isAuthenticated()) {
  //    navigate('/login'); // Redirigir al login si no está autenticado
  //  }
  //}, [navigate]);

  // Ajustar itemsPerPage basado en el tamaño de la pantalla
  const setPageSize = () => {
    const newItemsPerPage = window.innerWidth >= 768 ? 4 : 8;
    setItemsPerPage(newItemsPerPage);
    setActualPage(1);
  };
  const getPaginatedProjects = () => {
    const startIndex = (actualPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return projects.slice(startIndex, endIndex);
  }
  const paginatedProjects = getPaginatedProjects();
  // separar los parrafos de la descripción a través de los saltos de linea "\n"  
  const paragraphs = selectedProject?.description ? selectedProject.description.split(/\n+/) : [];

  useEffect(() => {
    setPageSize();
    window.addEventListener("resize", setPageSize);
    return () => window.removeEventListener("resize", setPageSize);
  }, []);
  useEffect(() => { getProjects(setProjects) }, [])
  return (
    <>
      <HeaderAdm />
      <main className="border-t-90 border-b-20 border-primary-s1 min-h-screen" style={{ marginBottom: 0, paddingTop: 0 }}>
        <section className="bg-secondary flex flex-col gap-5 min-h-[calc(100vh-110px)] py-5">
          <article className="flex justify-between items-center w-9/10 mx-auto">
            <Text
              color_children={"text-white"}
              text_position={"text-left"}
              text_size={"text-lg md:text-xl xl:text-3xl"}
              text_case={"uppercase"}
            >
              Lista de Proyectos
            </Text>
            <Button
              bg_color={"bg-blue-500"}
              hover_bg={"hover:bg-blue-400"}
              px={"px-3 sm:px-4 xl:px-5"}
              py={"py-1 sm:py-2 xl:py-3"}
              text_wrap={"text-wrap sm:text-nowrap"}
              text_size={"text-xs sm:text-sm xl:text-base"}
              width={"w-30 sm:w-min"}
              onClick={handlePopUp}
            >
              Agregar proyecto
            </Button>
          </article>
          {openPopUp && (
            <>
              <section className="bg-white w-9/10 mx-auto sm:w-7/10 lg:w-6/10 xl:w-1/2 rounded-3xl flex flex-col items-center gap-5 py-3">
                <Text
                  text_size={"text-xl uppercase"}
                  margin_y={"my-0 mt-5"}
                >
                  Subir Proyecto
                </Text>
                <section className="w-9/10">
                  <form className="flex flex-col items-center gap-3 w-9/10 mx-auto"
                    onSubmit={handleClickForm}>
                    <Input
                      px={"px-2.5 md:px-4"}
                      py={"py-1 sm:py-1.5 md:py-2"}
                      text_label={"Título"}
                      type={"text"}
                      placeholder={"Ingrese el título"}
                      name={"title"}
                      value={newProject.title}
                      onChange={handleChange}
                    />
                    <Input
                      px={"px-2.5 md:px-4"}
                      py={"py-1 sm:py-1.5 md:py-2"}
                      text_label={"Imagen"}
                      type={"file"}
                      name={"image"}
                      accept={".jpg,.jpeg,.png,.webp"}
                      value={newProject.image || null}
                      onChange={handleImageChange}
                    />
                    <article className="w-full text-black text-sm font-roboto capitalize">
                      Descripción <span className="text-red-500 text-sm ml-2 font-roboto">*</span>
                      <textarea name="description" id="description" rows={5} placeholder="Ingrese la descripción" value={newProject.description} onChange={handleChange}
                        className="w-full px-2.5 py-1 rounded-md border border-gray-400 border-solid outline-secondary-s1 text-xs" />
                    </article>
                    <label htmlFor="available" className="w-full flex gap-3">
                      Disponible: <span className="text-red-500">*</span>
                      <input
                        type={"checkbox"}
                        name={"available"}
                        onChange={handleChange}
                        checked={newProject.available}
                      />
                    </label>
                    {success && (
                      <span className="flex justify-center items-center gap-2.5 text-primary"><IconCheck /> ¡El proyecto fue creado con éxito!</span>
                    )}
                    {error && (
                      <span className="flex justify-center items-center gap-2.5 text-red-500">Error: {error}</span>
                    )}
                    <Button
                      width={"w-4/10"}
                      bg_color={"bg-blue-500"}
                      hover_bg={"hover:bg-blue-400"}
                      px={"px-3"}
                      py={"py-2"}
                      type={"submit"}
                      disabled={loading}
                    >
                      {loading ? "Enviando..." : "Agregar"}
                    </Button>
                  </form>
                </section>
              </section>
            </>
          )}
          <article className="overflow-x-scroll md:overflow-x-hidden w-9/10 mx-auto">
            <table className="table-fixed w-2/1 sm:w-full sm:mx-auto bg-white rounded-t-2xl text-white" style={{ boxShadow: "5px 5px 2px 0px rgba(0,0,0,0.2)" }}>
              <thead className="bg-primary h-10 text-sm font-oswald-light md:text-base">
                <tr>
                  <th className="rounded-tl-2xl uppercase">Título</th>
                  <th className="border-x border-gray-500 uppercase">Descripción</th>
                  <th className="border-x border-gray-500 uppercase">Imagen</th>
                  <th className="border-x border-gray-500 uppercase">Disponible</th>
                  <th className="rounded-tr-2xl uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-xs relative text-gray-accent-light-2 md:text-base">
                {paginatedProjects?.map((project) => (
                  <tr key={project.id_project} className={`border-y border-gray-500 text-center cursor-pointer ${project.id_project === projectInEdition ? 'bg-primary-l1' : 'hover:bg-gray-100'}`}>
                    <td className="overflow-x-hidden text-ellipsis p-3" onClick={() => handlePopUpShowProjects(project.id_project)}>
                      {project.id_project === projectInEdition ? (
                        <input className="w-full text-center" type="text" name="title" value={dataEdition.title || ''} onChange={handleInputChange} />
                      ) : (
                        project.title.substring(0, 100)
                      )}
                    </td>
                    <td className="border-x border-gray-500 p-3 overflow-x-hidden text-ellipsis" onClick={() => handlePopUpShowProjects(project.id_project)}>
                      {project.id_project === projectInEdition ? (
                        <textarea className="w-full" type="text" name="description" id="description" value={dataEdition.description || ''} onChange={handleInputChange} />
                      ) : (
                        project.description.substring(0, 100)
                      )}
                    </td>
                    <td className="border-x border-gray-500 p-3 overflow-x-hidden text-ellipsis" onClick={() => handlePopUpShowProjects(project.id_project)}>
                      {project.id_project === projectInEdition ? (
                        <input className="w-full" type="file" name="image" onChange={handleImageChangeForEdit} />
                      ) : (
                        project.image.substring(0, 25)
                      )}
                    </td>
                    <td className="border-x border-gray-500 p-3 overflow-x-hidden text-ellipsis" onClick={() => handlePopUpShowProjects(project.id_project)}>
                      {project.id_project === projectInEdition ? (
                        <input className="w-full" type="checkbox" name="available" onChange={handleInputChange} checked={dataEdition.available || false} />
                      ) : (
                        project.available ? 'Sí' : 'No'
                      )}
                    </td>
                    <td className="relative flex justify-center items-center sm:hidden p-3">
                      {project.id_project === projectInEdition ? (
                        <div className="flex justify-between gap-3">
                          <Button
                            bg_color={"bg-primary"}
                            hover_bg={"hover:bg-primary-s1"}
                            px={"px-1"} py={"py-1"}
                            text_size={"text-xs"}
                            onClick={() => handleSaveEdition(project.id_project)}>Guardar</Button>
                          <Button
                            bg_color={"bg-red-500"}
                            hover_bg={"hover:bg-red-700"}
                            text_size={"text-xs"}
                            px={"px-1"} py={"py-1"}
                            onClick={handleAnullEdition}>Cancelar</Button>
                        </div>
                      ) : (
                        <>
                          {openActionsId !== project.id_project &&
                            <div onClick={() => handleClickActions(project.id_project)}>
                              <IconEllipsis />
                            </div>
                          }
                          {openActionsId === project.id_project && ( // Verifica si el ID coincide
                            <div className="flex justify-between gap-3">
                              <Button
                                bg_color={"bg-primary"}
                                hover_bg={"hover:bg-primary-s1"}
                                px={"px-1"} py={"py-1"}
                                text_size={"text-xs"}
                                onClick={() => handleClickUpdate(project)}
                              >
                                Editar
                              </Button>
                              <Button
                                bg_color={"bg-red-500"}
                                hover_bg={"hover:bg-red-700"}
                                text_size={"text-xs"}
                                px={"px-1"} py={"py-1"}
                                onClick={() => handlePopUpDelete(project.id_project)}
                              >
                                Eliminar
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                    <td className="hidden sm:flex sm:justify-evenly sm:items-center py-6" onClick={() => handleClickActions(project.id_project)}>
                      {project.id_project === projectInEdition ? (
                        <>
                          <Button
                            bg_color={"bg-primary"}
                            hover_bg={"hover:bg-primary-s1"}
                            px={"px-1 lg:px-3"} py={"py-1 lg:py-2"}
                            text_size={"text-xs"}
                            onClick={() => handleSaveEdition(project.id_project)}
                          >
                            Guardar
                          </Button>
                          <Button
                            bg_color={"bg-red-500"}
                            hover_bg={"hover:bg-red-700"}
                            text_size={"text-xs"}
                            px={"px-1 lg:px-3"} py={"py-1 lg:py-2"}
                            onClick={handleAnullEdition}
                          >
                            Cancelar
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            px={"px-0"}
                            py={"py-0"}
                            bg_color={"bg-transparent"}
                            hover_bg={"hover:bg-gray-accent-light-1"}
                            onClick={() => handleClickUpdate(project)}
                          >
                            <IconUpdate />
                          </Button>
                          <Button
                            px={"px-0"}
                            py={"py-0"}
                            bg_color={"bg-transparent"}
                            hover_bg={"hover:bg-gray-accent-light-1"}
                            onClick={() => handlePopUpDelete(project.id_project)}
                          >
                            <IconDelete />
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {openPopUpDelete && (
              <section className="fixed top-1/2 left-1/2 transform -translate-1/2 bg-neutral-700 rounded-xl p-5 z-5">
                <Text
                  color_children={"text-white"}
                >
                  ¿Estás seguro que deseas eliminar "{projectToDelete.title}"?
                </Text>
                <article className="mt-5 flex justify-center items-center gap-3">
                  <Button
                    bg_color={"bg-primary-s2"}
                    hover_bg={"hover:bg-primary-s1"}
                    color={"text-white"}
                    px={"px-2"} py={"py-2"}
                    onClick={handleAnullEdition}
                  >
                    Cancelar
                  </Button>
                  <Button
                    bg_color={"bg-red-700"}
                    hover_bg={"hover:bg-red-600"}
                    color={"text-white"}
                    px={"px-2"} py={"py-2"}
                    onClick={() => handleClickDelete(projectToDelete.id_project)}
                  >
                    Eliminar
                  </Button>
                </article>
              </section>
            )}
          </article>
          {projectInEdition == null && (
            <>
              {openPopUpShowProject && (
                <section className="fixed top-1/2 left-1/2 transform -translate-1/2 z-10
                                          w-9/10 md:w-1/2 mx-auto rounded-xl
                                          flex flex-col gap-3 bg-gray-300 max-h-[calc(100dvh-100px)] overflow-x-hidden">
                  <article className="flex justify-between bg-primary px-5 py-3">
                    <Text
                      text_size={"text-lg"}
                      text_position={"text-left"}
                      text_case={"uppercase"}
                      color_children={"text-white"}
                    >
                      Proyecto seleccionado
                    </Text>
                    <figure className="p-2 text-white hover:text-black hover:bg-gray-200 cursor-pointer rounded-full" onClick={() => { setOpenPopUpShowProject(false), setSelectedProject(null) }}>
                      <IconClose />
                    </figure>
                  </article>
                  <article className="flex flex-col gap-5 overflow-y-scroll p-5">
                    <Button
                      width={"w-max"}
                      px={"px-3"} py={"py-2"}
                      bg_color={selectedProject.available ? "bg-primary" : "bg-red-600"}
                      hover_bg={selectedProject.available ? "hover:bg-primary-s2" : "hover:bg-red-700"}

                    >
                      {selectedProject.available ? 'Disponible' : 'No disponible'}
                    </Button>
                    <Text
                      text_size={"text-base xl:text-2xl"}
                      text_position={"text-left"}
                    >
                      {selectedProject.title}
                    </Text>
                    <Image
                      image={selectedProject.image ? `data:${selectedProject.typeImage};base64,${selectedProject.image}` : null}
                      altImage={selectedProject.imageCaption}
                    />
                    {paragraphs.map((paragraph, index) => (
                      <Text
                        key={index}
                        color_children={"text-gray-accent-light-2"}
                        text_position={"text-left"}
                        text_size={"text-sm md:text-base"}
                        font_style={"font-roboto"}
                        variant={"paragraph"}
                      >
                        {paragraph}
                      </Text>
                    ))}
                  </article>
                </section>
              )}
            </>
          )}
          <article className="-mt-5">
            <MyPagination
              totalPages={totalPages}
              currentPage={actualPage}
              onPageChange={(page) => {
                setActualPage(page)
              }}
            />
          </article>
        </section>
      </main>
    </>
  )
}