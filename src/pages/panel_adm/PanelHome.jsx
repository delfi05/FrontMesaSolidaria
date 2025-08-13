import { useEffect, useState } from "react";
import { IconCheck, IconDelete, IconEllipsis, IconUpdate } from "@/components/icons/Icons";
import { _BarChart } from "@/components/gral/bar_chart/_BarChart";
import { Text } from "@/components/gral/texts/Text";
import { Button } from "@/components/gral/buttons/Button";
import { Input } from "@/components/gral/inputs/Input";
import { HeaderAdm } from "@/components/gral/header/HeaderAdm";
import { ManagerService } from "@/service/ManagerService";
import { MyPagination } from "@/components/gral/pagination/MyPagination";
const { getAllVoluntariesByManager, saveVoluntaryByManager, updateVoluntaryByManager, deleteVoluntaryByManager } = ManagerService();

const getVoluntaries = (setVoluntaries) => {
  getAllVoluntariesByManager(setVoluntaries)
}

export const PanelHome = () => {
  const [openActionsId, setOpenActionsId] = useState(null);
  const [voluntaryInEdition, setVoluntaryInEdition] = useState(null);
  const [formDataEdition, setFormDataEdition] = useState({});
  const [voluntaries, setVoluntaries] = useState(null);
  const [addVoluntary, setAddVoluntary] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newVoluntary, setNewVoluntary] = useState({ name: '', lastName: '', email: '', phone: '' });
  const [openPopUpDelete, setOpenPopUpDelete] = useState(false);
  const [voluntaryToDelete, setVoluntaryToDelete] = useState(null);
  //const navigate = useNavigate();

  const [actualPage, setActualPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const totalPages = Math.ceil(voluntaries?.length / itemsPerPage);

  const handleClickAddVoluntary = () => {
    setAddVoluntary(!addVoluntary)
  }

  const handleClickActions = (id_voluntary) => {
    setOpenActionsId(openActionsId === id_voluntary ? null : id_voluntary);
    console.log("Voluntario: " + id_voluntary);
  }

  const handlePopUpDelete = (id_voluntary) => {
    setOpenPopUpDelete(!openPopUpDelete)
    const voluntaryDelete = voluntaries.find((v) => v.id_voluntary === id_voluntary)
    setVoluntaryToDelete(voluntaryDelete);
  }
  /*const getById = (id_voluntary) => {
    getVoluntaryById(id_voluntary).then((response) => {
      // faltaría mostrarlo en algún popUp o algo de eso
      console.log(response.data);

    }).catch(error => {
      console.log(error);
    });
  }*/
  /* <--------------- METODOS PARA GUARDAR VOLUNTARIO ---------------> */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewVoluntary(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleClickForm = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("Datos a enviar:", newVoluntary);
    saveVoluntaryByManager(newVoluntary)
      .then((response) => {
        console.log("Voluntario guardado:", response.data);
        setSuccess(true);
        setError('');
        setNewVoluntary({ name: '', lastName: '', email: '', phone: '' }); // Limpiar el formulario
        setLoading(false);
        getVoluntaries(setVoluntaries);
      })
      .catch((error) => {
        console.error("Error al guardar el voluntario:", error);
        setError('Hubo un error al guardar. Por favor, inténtalo de nuevo.');
        setSuccess(false);
        setLoading(false);
      });
  };

  /* <--------------- METODOS PARA EDITAR VOLUNTARIO ---------------> */
  // Esta función se utiliza para actualizar los voluntarios en la misma tabla
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataEdition({ ...formDataEdition, [name]: value });
  };
  const handleClickUpdate = (voluntary) => {
    setVoluntaryInEdition(voluntary.id_voluntary);
    setFormDataEdition({ ...voluntary });
  }
  const handleSaveEdition = (id) => {
    updateVoluntaryByManager(id, formDataEdition)
      .then((response) => {
        console.log('Voluntario actualizado:', response.data);
        // Actualizar la lista de voluntarios en el estado
        setVoluntaries(voluntaries.map(v => (v.id_voluntary === id ? response.data : v)));
        handleAnullEdition(); // Salir del modo de edición
        getVoluntaries(setVoluntaries)
      })
      .catch((error) => {
        console.error('Error al actualizar el voluntario:', error);
        // Manejar el error
      });
  };
  const handleAnullEdition = () => {
    setOpenActionsId(null);
    setOpenPopUpDelete(false);
    setVoluntaryInEdition(null);
    setFormDataEdition({});
  };

  /* <--------------- METODO PARA ELIMINAR VOLUNTARIO ---------------> */
  const handleClickDelete = (id_voluntary) => {
    deleteVoluntaryByManager(id_voluntary).then(() => {
      getVoluntaries(setVoluntaries);
    }).catch(error => {
      console.log(error);
    });
    setOpenPopUpDelete(false);
  }
  /*
    useEffect(() => {
      if (!AuthService.isAuthenticated()) {
        navigate('/login'); // Redirigir al login si no está autenticado
      }
    }, [navigate]);
  */

  const setPageSize = () => {
    const newItemsPerPage = window.innerWidth >= 768 ? 4 : 8;
    setItemsPerPage(newItemsPerPage);
    setActualPage(1);
  };
  const getPaginatedVoluntaries = () => {
    const startIndex = (actualPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return voluntaries?.slice(startIndex, endIndex);
  }
  const paginatedVoluntaries = getPaginatedVoluntaries();

  useEffect(() => {
    setPageSize();
    window.addEventListener("resize", setPageSize);
    return () => window.removeEventListener("resize", setPageSize);
  }, []);

  useEffect(() => { getVoluntaries(setVoluntaries) }, [])

  return (
    <>
      <HeaderAdm />
      <main className="border-t-90 border-b-20 border-primary-s1" style={{ marginBottom: 0, paddingTop: 0 }}>
        <section className="mx-auto w-9/10 my-10">
          <article className="sm:w-1/2 lg:w-1/3 xl:w-1/4">
            <_BarChart />
          </article>
        </section>
        <section className="bg-secondary flex flex-col gap-5 py-5 min-h-[calc(100vh-90px)]">
          <article className="flex justify-between items-center w-9/10 mx-auto">
            <Text
              color_children={"text-white"}
              text_position={"text-left"}
              text_size={"text-lg md:text-xl xl:text-3xl"}
              text_case={"uppercase"}
            >
              Lista de Voluntarios
            </Text>
            <Button
              bg_color={"bg-blue-500"}
              hover_bg={"hover:bg-blue-400"}
              px={"px-3 sm:px-4 xl:px-5"}
              py={"py-1 sm:py-2 xl:py-3"}
              text_wrap={"text-wrap sm:text-nowrap"}
              text_size={"text-xs sm:text-sm xl:text-base"}
              width={"w-30 sm:w-min"}
              onClick={() => handleClickAddVoluntary()}
            >
              Agregar voluntario
            </Button>
          </article>
          {addVoluntary && (
            <>
              <section className="bg-white w-9/10 mx-auto sm:w-7/10 lg:w-6/10 xl:w-1/2 rounded-3xl flex flex-col items-center gap-5 py-3">
                <Text
                  text_size={"text-lg xl:text-2xl"}
                  color_children={"text-gray-accent-light-2"}
                >
                  AGREGAR VOLUNTARIO
                </Text>
                <article className="w-9/10">
                  <form className="flex flex-col justify-center items-center gap-2.5 md:gap-3 lg:gap-4 xl:gap-6"
                    onSubmit={handleClickForm}>
                    <Input
                      px={"px-2.5 md:px-4"}
                      py={"py-1 sm:py-1.5 md:py-2"}
                      text_size={"text-xs md:text-sm lg:text-base xl:text-lg"}
                      type="text" placeholder="Nombre *" name="name" autoComplete="on" required
                      value={newVoluntary.name} onChange={handleChange}
                    />
                    <Input
                      px={"px-2.5 md:px-4"}
                      py={"py-1 sm:py-1.5 md:py-2"}
                      text_size={"text-xs md:text-sm lg:text-base xl:text-lg"}
                      type="text" placeholder="Apellido *" name="lastName" autoComplete="on" required
                      value={newVoluntary.lastName} onChange={handleChange}
                    />
                    <Input
                      px={"px-2.5 md:px-4"}
                      py={"py-1 sm:py-1.5 md:py-2"}
                      text_size={"text-xs md:text-sm lg:text-base xl:text-lg"}
                      type="email" placeholder="Email *" name="email" autoComplete="on" required
                      value={newVoluntary.email} onChange={handleChange}
                    />
                    <Input
                      px={"px-2.5 md:px-4"}
                      py={"py-1 sm:py-1.5 md:py-2"}
                      text_size={"text-xs md:text-sm lg:text-base xl:text-lg"}
                      type="text" placeholder="Teléfono *" name="phone" autoComplete="on" required
                      value={newVoluntary.phone} onChange={handleChange}
                    />
                    {success && (
                      <span className="flex justify-center items-center gap-2.5 text-primary"><IconCheck /> ¡El voluntario se agregó correctamente!</span>
                    )}
                    {error && (
                      <span className="flex justify-center items-center gap-2.5 text-red-500">Error: {error}</span>
                    )}
                    <Button
                      bg_color={"bg-blue-500"}
                      hover_bg={"hover:bg-blue-600"}
                      px={"px-5 md:px-8 xl:px-10"}
                      py={"py-2 sm:py-2.5 xl:py-3"}
                      text_size={"text-xs md:text-sm xl:text-base"}
                      type={"submit"}
                    >
                      {loading ? "Enviando..." : "AGREGAR"}
                    </Button>
                  </form>
                </article>
              </section>
            </>
          )}
          <article className="overflow-x-scroll md:overflow-x-hidden w-9/10 mx-auto">
            <table className="table-auto min-w-full bg-white rounded-t-2xl text-white" style={{ boxShadow: "5px 5px 2px 0px rgba(0,0,0,0.2)" }}>
              <thead className="bg-primary h-10 text-sm font-oswald-light md:text-base">
                <tr>
                  <th scope="col" className="px-4 py-3 rounded-tl-2xl uppercase">Nombre</th>
                  <th scope="col" className="px-4 py-3 border-x border-gray-500 uppercase">Apellido</th>
                  <th scope="col" className="px-4 py-3 border-x border-gray-500 uppercase">Email</th>
                  <th scope="col" className="px-4 py-3 border-x border-gray-500 uppercase">Celular</th>
                  <th scope="col" className="px-4 py-3 rounded-tr-2xl uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-xs relative text-gray-accent-light-2 md:text-base">
                {paginatedVoluntaries?.map((voluntary) => (
                  <tr key={voluntary.id_voluntary} className={`text-center border-y border-gray-500 px-4 py-1 ${voluntary.id_voluntary === voluntaryInEdition ? 'bg-primary-l1' : ''}`}>
                    <td className="px-2 py-1">
                      {voluntary.id_voluntary === voluntaryInEdition ? (
                        <input type="text" name="name" value={formDataEdition.name || ''} onChange={handleInputChange} />
                      ) : (
                        voluntary.name
                      )}
                    </td>
                    <td className="border-x border-gray-500 px-4 py-1">
                      {voluntary.id_voluntary === voluntaryInEdition ? (
                        <input type="text" name="lastName" value={formDataEdition.lastName || ''} onChange={handleInputChange} />
                      ) : (
                        voluntary.lastName
                      )}
                    </td>
                    <td className="border-x border-gray-500 px-4 py-1 overflow-x-scroll">
                      {voluntary.id_voluntary === voluntaryInEdition ? (
                        <input type="email" name="email" value={formDataEdition.email || ''} onChange={handleInputChange} />
                      ) : (
                        voluntary.email
                      )}
                    </td>
                    <td className="border-x border-gray-500 px-4 py-1">
                      {voluntary.id_voluntary === voluntaryInEdition ? (
                        <input type="text" name="phone" value={formDataEdition.phone || ''} onChange={handleInputChange} />
                      ) : (
                        voluntary.phone
                      )}
                    </td>
                    <td className="relative flex flex-col gap-1 justify-center items-center sm:hidden px-4 py-1 cursor-pointer">
                      {voluntary.id_voluntary === voluntaryInEdition ? (
                        <div className="flex justify-between gap-3 p-3">
                          <Button
                            bg_color={"bg-primary"}
                            hover_bg={"hover:bg-primary-s1"}
                            px={"px-1"} py={"py-1"}
                            text_size={"text-xs"}
                            onClick={() => handleSaveEdition(voluntary.id_voluntary)}
                          >Guardar</Button>
                          <Button
                            bg_color={"bg-red-500"}
                            hover_bg={"hover:bg-red-700"}
                            text_size={"text-xs"}
                            px={"px-1"} py={"py-1"}
                            onClick={handleAnullEdition}
                          >Cancelar</Button>
                        </div>
                      ) : (
                        <>
                          {openActionsId !== voluntary.id_voluntary &&
                            <div onClick={() => handleClickActions(voluntary.id_voluntary)}>
                              <IconEllipsis />
                            </div>
                          }
                          {openActionsId === voluntary.id_voluntary && ( // Verifica si el ID coincide
                            <div className="flex justify-between gap-3">
                              <Button
                                bg_color={"bg-primary"}
                                hover_bg={"hover:bg-primary-s1"}
                                px={"px-1"} py={"py-1"}
                                text_size={"text-xs"}
                                onClick={() => handleClickUpdate(voluntary)}
                              >
                                Editar
                              </Button>
                              <Button
                                bg_color={"bg-red-500"}
                                hover_bg={"hover:bg-red-700"}
                                text_size={"text-xs"}
                                px={"px-1"} py={"py-1"}
                                onClick={() => handlePopUpDelete(voluntary.id_voluntary)}
                              >
                                Eliminar
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                    <td className="hidden sm:flex sm:justify-between sm:items-center px-4 py-1" onClick={() => handleClickActions(voluntary.id_voluntary)}>
                      {voluntary.id_voluntary === voluntaryInEdition ? (
                        <>
                          <Button
                            bg_color={"bg-primary"}
                            hover_bg={"hover:bg-primary-s1"}
                            px={"px-1"} py={"py-1"}
                            text_size={"text-xs"}
                            onClick={() => handleSaveEdition(voluntary.id_voluntary)}>Guardar</Button>
                          <Button
                            bg_color={"bg-red-500"}
                            hover_bg={"hover:bg-red-700"}
                            text_size={"text-xs"}
                            px={"px-1"} py={"py-1"}
                            onClick={handleAnullEdition}>Cancelar</Button>
                        </>
                      ) : (
                        <>
                          <Button
                            px={"px-0"}
                            py={"py-0"}
                            bg_color={"bg-transparent"}
                            hover_bg={"hover:bg-gray-accent-light-1"}
                            onClick={() => handleClickUpdate(voluntary)}><IconUpdate /></Button>
                          <Button
                            px={"px-0"}
                            py={"py-0"}
                            bg_color={"bg-transparent"}
                            hover_bg={"hover:bg-gray-accent-light-1"}
                            onClick={() => handlePopUpDelete(voluntary.id_voluntary)}><IconDelete /></Button>
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
                  ¿Estás seguro que deseas eliminar a {voluntaryToDelete.name} {voluntaryToDelete.lastName}?
                </Text>
                <article className="mt-5 flex justify-center items-center gap-3">
                  <Button
                    bg_color={"bg-primary-s2"}
                    hover_bg={"hover:bg-primary-s1"}
                    color={"text-white"}
                    px={"px-2"} py={"py-2"}
                    onClick={() => handleAnullEdition()}
                  >
                    Cancelar
                  </Button>
                  <Button
                    bg_color={"bg-red-700"}
                    hover_bg={"hover:bg-red-600"}
                    color={"text-white"}
                    px={"px-2"} py={"py-2"}
                    onClick={() => handleClickDelete(voluntaryToDelete.id_voluntary)}
                  >
                    Eliminar
                  </Button>
                </article>
              </section>
            )}
          </article>
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