import { HeaderAdm } from "@/components/gral/header/HeaderAdm";
import { ManagerService } from "@/service/ManagerService";
import { useEffect, useState } from "react";
import { Button } from "@/components/gral/buttons/Button"
import { Text } from "@/components/gral/texts/Text"
import { Input } from "@/components/gral/inputs/Input";
import { IconCheck, IconDelete, IconEllipsis, IconEyesOff, IconEyesOn, IconUpdate } from "@/components/icons/Icons"
import { useNavigate } from "react-router-dom";
import { AuthService } from "@/service/AuthService";
import { jwtDecode } from "jwt-decode";
import { MyPagination } from "@/components/gral/pagination/MyPagination";

const { getAllManagers, saveManager, updateManager, deleteManager } = ManagerService();


const getManagers = (setManagers) => {
  getAllManagers().then((response) => {
    setManagers(response.data.reverse())
  }).catch(error => {
    console.log(error);
  });
}

export const PanelManager = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [managers, setManagers] = useState(null);
  const [newManager, setNewManager] = useState({ name: '', lastName: '', email: '', password: '' });
  const [viewPassword, setViewPassword] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openPopUpDelete, setOpenPopUpDelete] = useState(false);
  const [managerToDelete, setManagerToDelete] = useState(null);
  const [managerInEdition, setManagerInEdition] = useState(null);
  const [formDataEdition, setFormDataEdition] = useState({});
  const [openActionsId, setOpenActionsId] = useState(null);
  const navigate = useNavigate();
  const [loggedManager, setLoggedManager] = useState(null);
  const [actualPage, setActualPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const totalPages = Math.ceil(managers?.length / itemsPerPage);


  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("datos de usuario logeado: " + decoded.id_manager);

        setLoggedManager(decoded);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setLoggedManager(null);
      }
    }
  }, []);

  const handleViewPassword = () => {
    setViewPassword(!viewPassword)
  }

  const handlePopUp = () => {
    setOpenPopUp(!openPopUp)
  }
  const handlePopUpDelete = (id_manager) => {
    setOpenPopUpDelete(!openPopUpDelete)
    const managerDelete = managers.find((m) => m.id_manager === id_manager)
    setManagerToDelete(managerDelete);
  }
  const handleClickActions = (id_manager) => {
    setOpenActionsId(openActionsId === id_manager ? null : id_manager);
    console.log("Manager: " + id_manager);
  }

  /* <--------------- METODOS PARA GUARDAR MANAGER ---------------> */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewManager(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleClickForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("Datos a enviar:", newManager);
    saveManager(newManager)
      .then((response) => {
        console.log("Manager guardado:", response.data);
        setSuccess(true);
        setError('');
        setNewManager({ name: '', lastName: '', email: '', password: '' }); // Limpiar el formulario
        setLoading(false);
        getManagers(setManagers);
      })
      .catch((error) => {
        console.error("Error al guardar el manager:", error);
        setError('Hubo un error al guardar. Por favor, inténtalo de nuevo.');
        setSuccess(false);
        setLoading(false);
      });
  };

  /* <--------------- METODOS PARA EDITAR MANAGER ---------------> */
  // Esta función se utiliza para actualizar los managers en la misma tabla
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataEdition({ ...formDataEdition, [name]: value });
  };
  const handleClickUpdate = (manager) => {
    setManagerInEdition(manager.id_manager);
    setFormDataEdition({ ...manager });
  }
  const handleSaveEdition = (id) => {
    updateManager(id, formDataEdition)
      .then((response) => {
        console.log('Manager actualizado:', response.data);
        // Actualizar la lista de managers en el estado
        setManagers(managers.map(m => (m.id_manager === id ? response.data : m)));
        handleAnullEdition(); // Salir del modo de edición
        getManagers(setManagers)
      })
      .catch((error) => {
        console.error('Error al actualizar el manager:', error);
        // Manejar el error
      });
  };
  const handleAnullEdition = () => {
    setOpenActionsId(null);
    setOpenPopUpDelete(false);
    setManagerInEdition(null);
    setFormDataEdition({});
  };

  /* <--------------- METODO PARA ELIMINAR MANAGER ---------------> */
  const handleClickDelete = (id_manager) => {
    deleteManager(id_manager).then(() => {
      getManagers(setManagers);
    }).catch(error => {
      console.log(error);
    });
    handlePopUpDelete(id_manager)
    setManagerToDelete(null);
    handleLogout();
  }
  const handleLogout = () => {
    AuthService.logoutManager(AuthService.getToken())
      .then(() => {
        AuthService.removeToken();
        navigate('/login');
      })
      .catch(error => {
        console.error("Error al cerrar sesión en el backend:", error);
        AuthService.removeToken();
        navigate('/login');
      });
  };
  //useEffect(() => {
  //  if (!AuthService.isAuthenticated()) {
  //    navigate('/login'); // Redirigir al login si no está autenticado
  //  }
  //}, [navigate]);
  const setPageSize = () => {
    const newItemsPerPage = window.innerWidth >= 768 ? 4 : 8;
    setItemsPerPage(newItemsPerPage);
    setActualPage(1);
  };
  const getPaginatedManagers = () => {
    const startIndex = (actualPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return managers?.slice(startIndex, endIndex);
  }
  const paginatedManagers = getPaginatedManagers();

  useEffect(() => {
    setPageSize();
    window.addEventListener("resize", setPageSize);
    return () => window.removeEventListener("resize", setPageSize);
  }, []);

  useEffect(() => getManagers(setManagers), [])
  return (
    <>
      <HeaderAdm />
      <main className="border-t-90 border-b-20 border-primary-s1 min-h-screen" style={{ marginBottom: 0, paddingTop: 0 }}>
        <section className="bg-secondary  flex flex-col gap-5 min-h-[calc(100vh-110px)] py-5">
          <article className="flex justify-between items-center w-9/10 mx-auto">
            <Text
              color_children={"text-white"}
              text_position={"text-left"}
              text_size={"text-lg md:text-xl xl:text-3xl"}
              text_case={"uppercase"}
            >
              Lista de Administradores
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
              Agregar manager
            </Button>
          </article>
          {openPopUp && (
            <>
              <section className="bg-white w-9/10 mx-auto sm:w-7/10 lg:w-6/10 xl:w-1/2 rounded-3xl flex flex-col items-center gap-5 py-3">

                <Text
                  text_size={"text-xl uppercase"}
                  margin_y={"my-0 mt-5"}
                >
                  Subir Managers
                </Text>
                <section className="w-9/10">
                  <form action={"POST"} className="flex flex-col items-center gap-3 mx-auto" onSubmit={handleClickForm}>
                    <Input
                      px={"px-2.5 md:px-4"}
                      py={"py-1 sm:py-1.5 md:py-2"}
                      text_size={"text-xs md:text-sm lg:text-base xl:text-lg"}
                      type="text" placeholder="Nombre *" name="name" autoComplete="on" required
                      value={newManager.name || ''} onChange={handleChange}
                    />
                    <Input
                      px={"px-2.5 md:px-4"}
                      py={"py-1 sm:py-1.5 md:py-2"}
                      text_size={"text-xs md:text-sm lg:text-base xl:text-lg"}
                      type="text" placeholder="Apellido *" name="lastName" autoComplete="on" required
                      value={newManager.lastName || ''} onChange={handleChange}
                    />
                    <Input
                      px={"px-2.5 md:px-4"}
                      py={"py-1 sm:py-1.5 md:py-2"}
                      text_size={"text-xs md:text-sm lg:text-base xl:text-lg"}
                      type="email" placeholder="Email *" name="email" autoComplete="on" required
                      value={newManager.email || ''} onChange={handleChange}
                    />
                    <Input
                      px={"px-2.5 md:px-4"}
                      py={"py-1 sm:py-1.5 md:py-2"}
                      text_size={"text-xs md:text-sm lg:text-base xl:text-lg"}
                      icon={viewPassword ? <IconEyesOn /> : <IconEyesOff />}
                      onClick={handleViewPassword}
                      type={viewPassword ? "text" : "password"} placeholder="Contraseña *" name="password" autoComplete="on" required
                      value={newManager.password || ''} onChange={handleChange}
                    />
                    {success && (
                      <span className="flex justify-center items-center gap-2.5 text-primary"><IconCheck /> ¡El manager fue creado con éxito!</span>
                    )}
                    {error && (
                      <span className="flex justify-center items-center gap-2.5 text-red-500">Error: {error}</span>
                    )}
                    <Button
                      width={"w-4/10"}
                      bg_color={"bg-blue-500"}
                      hover_bg={"hover:bg-blue-400"}
                      px={"px-5 md:px-8 xl:px-10"}
                      py={"py-2 sm:py-2.5 xl:py-3"}
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
            <table className="table-auto w-3/1 sm:w-full sm:mx-auto bg-white rounded-t-2xl text-white" style={{ boxShadow: "5px 5px 2px 0px rgba(0,0,0,0.2)" }}>
              <thead className="bg-primary h-10 text-sm font-oswald-light md:text-base">
                <tr>
                  <th className="rounded-tl-2xl uppercase">Nombre</th>
                  <th className="border-x border-gray-500 uppercase">Apellido</th>
                  <th className="border-x border-gray-500 uppercase">Email</th>
                  <th className="border-x border-gray-500 uppercase">Contraseña</th>
                  <th className="rounded-tr-2xl uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-xs relative text-gray-accent-light-2 md:text-base">
                {paginatedManagers?.map((manager) => (
                  <tr key={manager.id_manager} className={`text-center border-y border-gray-500 h-8 ${manager.id_manager === managerInEdition ? 'bg-primary-l1' : ''}`}>
                    <td>
                      {manager.id_manager === managerInEdition ? (
                        <input type="text" name="name" value={formDataEdition.name || ''} onChange={handleInputChange} className="overflow-hidden text-ellipsis line-clamp-3" />
                      ) : (
                        manager.name
                      )}
                    </td>
                    <td className="border-x border-gray-500">
                      {manager.id_manager === managerInEdition ? (
                        <input type="text" name="lastName" value={formDataEdition.lastName || ''} onChange={handleInputChange} />
                      ) : (
                        manager.lastName
                      )}
                    </td>
                    <td className="border-x border-gray-500 overflow-x-scroll">
                      {manager.id_managers === managerInEdition ? (
                        <input type="email" name="email" value={formDataEdition.email || ''} onChange={handleInputChange} />
                      ) : (
                        manager.email
                      )}
                    </td>
                    <td className="border-x border-gray-500 overflow-x-scroll">
                      {manager.id_manager === managerInEdition ? (
                        <input type="text" name="password" value={formDataEdition.password || ''} onChange={handleInputChange} />
                      ) : (
                        'Contraseña oculta'
                      )}
                    </td>
                    <td className="relative flex justify-center items-center sm:hidden h-8">
                      {manager.id_manager === managerInEdition ? (
                        <div className="flex justify-between gap-3">
                          <Button
                            bg_color={"bg-primary"}
                            hover_bg={"hover:bg-primary-s1"}
                            px={"px-1"} py={"py-1"}
                            text_size={"text-xs"}
                            onClick={() => handleSaveEdition(manager.id_manager)}
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
                          {openActionsId !== manager.id_manager &&
                            <div onClick={() => handleClickActions(manager.id_manager)}>
                              <IconEllipsis />
                            </div>
                          }
                          {openActionsId === manager.id_manager && ( // Verifica si el ID coincide
                            <div className="flex justify-between gap-3">
                              {loggedManager.id_manager === manager.id_manager && (
                                <Button
                                  bg_color={"bg-primary"}
                                  hover_bg={"hover:bg-primary-s1"}
                                  px={"px-1"} py={"py-1"}
                                  text_size={"text-xs"}
                                  onClick={() => handleClickUpdate(manager)}
                                >
                                  Editar
                                </Button>
                              )}
                              <Button
                                bg_color={"bg-red-500"}
                                hover_bg={"hover:bg-red-700"}
                                text_size={"text-xs"}
                                px={"px-1"} py={"py-1"}
                                onClick={() => handlePopUpDelete(manager.id_manager)}
                              >
                                Eliminar
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                    <td className="hidden sm:flex sm:justify-evenly sm:items-center h-8">
                      {manager.id_manager === managerInEdition ? (
                        <>
                          <Button
                            bg_color={"bg-primary"}
                            hover_bg={"hover:bg-primary-s1"}
                            px={"px-1"} py={"py-1"}
                            text_size={"text-xs"}
                            onClick={() => handleSaveEdition(manager.id_manager)}
                          >
                            Guardar
                          </Button>
                          <Button
                            bg_color={"bg-red-500"}
                            hover_bg={"hover:bg-red-700"}
                            text_size={"text-xs"}
                            px={"px-1"} py={"py-1"}
                            onClick={handleAnullEdition}
                          >
                            Cancelar
                          </Button>
                        </>
                      ) : (
                        <>
                          {loggedManager.id_manager === manager.id_manager && (
                            <Button
                              px={"px-0"}
                              py={"py-0"}
                              bg_color={"bg-transparent"}
                              hover_bg={"hover:bg-gray-accent-light-1"}
                              onClick={() => handleClickUpdate(manager)}
                            >
                              <IconUpdate />
                            </Button>
                          )}
                          <Button
                            px={"px-0"}
                            py={"py-0"}
                            bg_color={"bg-transparent"}
                            hover_bg={"hover:bg-gray-accent-light-1"}
                            onClick={() => handlePopUpDelete(manager.id_manager)}
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
                  ¿Estás seguro que deseas eliminar a {managerToDelete.name} {managerToDelete.lastName}?
                </Text>
                <article className="mt-5 flex justify-center items-center gap-3">
                  <Button
                    bg_color={"bg-primary-s2"}
                    hover_bg={"hover:bg-primary-s1"}
                    color={"text-white"}
                    px={"px-2"} py={"py-2"}
                    onClick={() => handlePopUpDelete()}
                  >
                    Cancelar
                  </Button>
                  <Button
                    bg_color={"bg-red-700"}
                    hover_bg={"hover:bg-red-600"}
                    color={"text-white"}
                    px={"px-2"} py={"py-2"}
                    onClick={() => handleClickDelete(managerToDelete.id_manager)}
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