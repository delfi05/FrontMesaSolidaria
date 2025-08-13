import { Button } from "@/components/gral/buttons/Button"
import { HeaderAdm } from "@/components/gral/header/HeaderAdm"
import { Input } from "@/components/gral/inputs/Input"
import { Text } from "@/components/gral/texts/Text"
import { IconCheck, IconClose, IconDelete, IconEllipsis, IconUpdate } from "@/components/icons/Icons"
import { NewsService } from "@/service/NewsService"
import { useEffect, useState } from "react"
import { ManagerService } from "@/service/ManagerService"
import { useNavigate } from "react-router-dom"
import { AuthService } from "@/service/AuthService";
import { Image } from "@/components/gral/images/Image"
import { MyPagination } from "@/components/gral/pagination/MyPagination"
import useImageValidation from "@/components/gral/images/useImageValidation";
const { getAllNews } = NewsService();
const { saveNewsByManager, updateNewsByManager, deleteNewsByManager } = ManagerService();

const getNews = (setNews) => {
  getAllNews().then((response) => {
    setNews(response.data.reverse())
  }).catch(error => {
    console.log(error);
  });
}

export const PanelNews = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [newNews, setNewNews] = useState({ title: '', epigraph: '', summary: '', description: '', date: '', imageCaption: '' });
  const [imageUrl, setImageUrl] = useState('');
  const [nameImage, setNameImage] = useState('');
  const [typeImage, setTypeImage] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editNameImage, setEditNameImage] = useState('');
  const [editTypeImage, setEditTypeImage] = useState('');
  const [dataEdition, setDataEdition] = useState({});
  const [openPopUp, setOpenPopUp] = useState(false);
  const [newsInEdition, setNewsInEdition] = useState(null);
  const [openActionsId, setOpenActionsId] = useState(null);
  const [openPopUpDelete, setOpenPopUpDelete] = useState(false);
  const [openPopUpShowNews, setOpenPopUpShowNews] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [actualPage, setActualPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const { validateImage, error: imageValidationError } = useImageValidation();
  const navigate = useNavigate();

  /* <--------------- POP UPS ---------------> */
  const handlePopUp = () => {
    setOpenPopUp(!openPopUp)
  }
  const handlePopUpShowNews = (id) => {
    setOpenPopUpShowNews(!openPopUpShowNews)
    const selectedNews = news.find((n) => n.id_news === id)
    setSelectedNews(selectedNews);
  }
  const handleClickActions = (id_news) => {
    setOpenActionsId(openActionsId === id_news ? null : id_news);
    console.log("Noticia: " + id_news);
  }
  const handlePopUpDelete = (id_news) => {
    setOpenPopUpDelete(!openPopUpDelete)
    const newsDelete = news.find((v) => v.id_news === id_news)
    setNewsToDelete(newsDelete);
  }

  /* <--------------- METODOS PARA GUARDAR NOTICIA ---------------> */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewNews(prevState => ({
      ...prevState,
      [name]: value,
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
        title: newNews.title,
        epigraph: newNews.epigraph,
        summary: newNews.summary,
        description: newNews.description,
        date: '',
        image: imageUrl.split(',')[1],
        nameImage: nameImage,
        typeImage: typeImage
      };

      if (newNews.date) {
        const [year, month, day] = newNews.date.split('-').map(Number);
        const selectedLocalDate = new Date(year, month - 1, day);
        dataToSend.date = selectedLocalDate.toISOString();
      }
    }

    try {
      const response = await saveNewsByManager(dataToSend); // Ahora le pasamos formData
      console.log("Noticia guardada:", response.data);
      setSuccess(true);
      setNewNews({ title: '', epigraph: '', summary: '', description: '', date: '', imageCaption: '', image: null, typeImage: '' });
      setImageUrl('');
      getNews(setNews)
    } catch (err) {
      console.error("Error al guardar la noticia:", err);
      setError('Hubo un error al guardar. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  /* <--------------- METODOS PARA EDITAR NOTICIA ---------------> */
  // Esta función se utiliza para actualizar las noticias en la misma tabla
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataEdition({ ...dataEdition, [name]: value });
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
  const handleClickUpdate = (news) => {
    setNewsInEdition(news.id_news);
    const date = new Date(news.date);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    setDataEdition({
      ...news,
      date: formattedDate,
    });
  }
  const handleSaveEdition = (id) => {
    setLoading(true);
    setError(null);
    let dataToSend = { ...dataEdition };
    console.log(dataToSend);

    if (editImageUrl) {
      dataToSend = {
        ...dataToSend,
        image: editImageUrl.split(',')[1],
        nameImage: editNameImage,
        typeImage: editTypeImage
      };
    }
    updateNewsByManager(id, dataToSend)
      .then((response) => {
        console.log('Noticia actualizado:', response.data);
        // Actualizar la lista de noticias en el estado
        setNews(news.map(n => (n.id_news === id ? response.data : n)));
        handleAnullEdition();
        getNews(setNews)
      })
      .catch((error) => {
        console.error('Error al actualizar la noticia:', error);
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
    setNewsInEdition(null);
    setOpenActionsId(null);
    setOpenPopUpDelete(false);
    setDataEdition({});
    setOpenPopUpShowNews(false);
  };

  /* <--------------- METODO PARA ELIMINAR NOTICIA ---------------> */
  const handleClickDelete = (id_news) => {
    deleteNewsByManager(id_news).then(() => {
      getNews(setNews);
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

  // Formateador de fecha a tipo "Mes, dia, año" para la noticia clickeada
  const formattedDateSelectedNews = new Date(selectedNews?.date).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
    .replace(/(\d+) de (\w+) de (\d+)/, '$2 $1, $3')
    .replace(/^\w/, (char) => char.toUpperCase());
  // separar los parrafos de la descripción a través de los saltos de linea "\n"  
  const paragraphs = selectedNews?.description ? selectedNews.description.split(/\n+/) : [];

  // Ajustar itemsPerPage basado en el tamaño de la pantalla
  const setPageSize = () => {
    const newItemsPerPage = window.innerWidth >= 768 ? 4 : 8;
    setItemsPerPage(newItemsPerPage);
    setActualPage(1);
  };
  const getPaginatedNews = () => {
    const startIndex = (actualPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return news.slice(startIndex, endIndex);
  }
  const paginatedNews = getPaginatedNews();

  useEffect(() => {
    setPageSize();
    window.addEventListener("resize", setPageSize);
    return () => window.removeEventListener("resize", setPageSize);
  }, []);
  
  useEffect(() => { getNews(setNews) }, [])

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
              Lista de Noticias
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
              Agregar noticia
            </Button>
          </article>
          {openPopUp && (
            <>
              <section className="bg-white w-9/10 mx-auto sm:w-7/10 lg:w-6/10 xl:w-1/2 rounded-3xl flex flex-col items-center gap-5 py-3">
                <Text
                  text_size={"text-xl uppercase"}
                  margin_y={"my-0 mt-5"}
                >
                  Subir Noticias
                </Text>
                <section className="w-9/10">
                  <form action={"POST"} className="flex flex-col items-center gap-3 w-9/10 mx-auto" onSubmit={handleClickForm}>
                    <Input
                      text_label={"Título"}
                      type={"text"}
                      placeholder={"Ingrese el título"}
                      name={"title"}
                      text_size={"text-sm md:text-base"}
                      py={"py-1 md:py-2 xl:py-3"}
                      value={newNews.title}
                      onChange={handleChange}
                    />
                    <Input
                      text_label={"Imagen"}
                      type={"file"}
                      name={"image"}
                      text_size={"text-sm md:text-base"}
                      py={"py-1 md:py-2 xl:py-3"}
                      accept={".jpg,.jpeg,.png,.webp"}
                      onChange={handleImageChange}
                    />
                    <Input
                      text_label={"Resumen"}
                      type={"text"}
                      placeholder={"Ingrese el resumen"}
                      name={"summary"}
                      text_size={"text-sm md:text-base"}
                      py={"py-1 md:py-2 xl:py-3"}
                      value={newNews.summary}
                      onChange={handleChange}
                    />
                    <Input
                      text_label={"Epígrafe"}
                      type={"text"}
                      placeholder={"Ingrese el epigrafo"}
                      name={"epigraph"}
                      text_size={"text-sm md:text-base"}
                      py={"py-1 md:py-2 xl:py-3"}
                      value={newNews.epigraph}
                      onChange={handleChange}
                    />
                    <Input
                      text_label={"Fecha"}
                      type={"date"}
                      name={"date"}
                      text_size={"text-sm md:text-base"}
                      py={"py-1 md:py-2 xl:py-3"}
                      value={newNews.date}
                      onChange={handleChange}
                    />
                    <article className="w-full text-black text-sm font-roboto capitalize">
                      Descripción <span className="text-red-500 text-sm ml-2 font-roboto">*</span>
                      <textarea name="description" id="description" rows={5} placeholder="Ingrese la descripción" value={newNews.description} onChange={handleChange}
                        className="w-full px-2.5 py-1 rounded-md border border-gray-400 border-solid outline-secondary-s1 text-xs" />
                    </article>
                    {success && (
                      <span className="flex justify-center items-center gap-2.5 text-primary"><IconCheck /> ¡La noticia fue creada con éxito!</span>
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
            <table className="table-fixed w-4/1 sm:w-2/1 md:w-full sm:mx-auto bg-white rounded-t-2xl text-white" style={{ boxShadow: "5px 5px 2px 0px rgba(0,0,0,0.2)" }}>
              <thead className="bg-primary h-10 text-sm font-oswald-light md:text-base">
                <tr>
                  <th className="rounded-tl-2xl uppercase">Título</th>
                  <th className="border-x border-gray-500 uppercase">Imagen</th>
                  <th className="border-x border-gray-500 uppercase">Resumen</th>
                  <th className="border-x border-gray-500 uppercase">Epígrafe</th>
                  <th className="border-x border-gray-500 uppercase">Fecha</th>
                  <th className="border-x border-gray-500 uppercase">Descripción</th>
                  <th className="rounded-tr-2xl uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm relative text-gray-accent-light-2 lg:text-base">
                {paginatedNews?.map((news) => {
                  let formattedDate = '';
                  if (news?.date) {
                    const dateFromBackend = new Date(news.date);
                    const yearUTC = dateFromBackend.getUTCFullYear();
                    const monthUTC = dateFromBackend.getUTCMonth();
                    const dayUTC = dateFromBackend.getUTCDate();
                    const localDateForDisplay = new Date(yearUTC, monthUTC, dayUTC);

                    formattedDate = localDateForDisplay.toLocaleDateString('es-AR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                      .replace(/(\d+) de (\w+) de (\d+)/, '$2 $1, $3')
                      .replace(/^\w/, (char) => char.toUpperCase());
                  }
                  return (
                    <tr key={news.id_news} className={`cursor-pointer border-y border-gray-500 text-center ${news.id_news === newsInEdition ? 'bg-primary-l1' : 'hover:bg-gray-100'}`}>
                      <td className="overflow-x-hidden text-ellipsis p-3" onClick={() => handlePopUpShowNews(news.id_news)}>
                        {news.id_news === newsInEdition ? (
                          <input type="text" name="title" value={dataEdition.title || ''} onChange={handleInputChange} className="overflow-hidden" style={{ textAlign: 'center' }} />
                        ) : (
                          news.title.substring(0, 100)
                        )}
                      </td>
                      <td className="border-x border-gray-500 overflow-x-hidden text-ellipsis p-3" onClick={() => handlePopUpShowNews(news.id_news)}>
                        {news.id_news === newsInEdition ? (
                          <input type="file" name="image" onChange={handleImageChangeForEdit} />
                        ) : (
                          news.image.substring(0, 25)
                        )}
                      </td>
                      <td className="border-x border-gray-500 overflow-x-hidden text-ellipsis p-3" onClick={() => handlePopUpShowNews(news.id_news)}>
                        {news.id_news === newsInEdition ? (
                          <input type="text" name="summary" value={dataEdition.summary || ''} onChange={handleInputChange} />
                        ) : (
                          news.summary.substring(0, 100)
                        )}
                      </td>
                      <td className="border-x border-gray-500 overflow-x-hidden text-ellipsis p-3" onClick={() => handlePopUpShowNews(news.id_news)}>
                        {news.id_news === newsInEdition ? (
                          <input type="text" name="epigraph" value={dataEdition.epigraph || ''} onChange={handleInputChange} />
                        ) : (
                          news.epigraph.substring(0, 100)
                        )}
                      </td>
                      <td className="border-x border-gray-500 overflow-x-hidden text-ellipsis p-3" onClick={() => handlePopUpShowNews(news.id_news)}>
                        {news.id_news === newsInEdition ? (
                          <input type="date" name="date" value={dataEdition.date || ''} onChange={handleInputChange} />
                        ) : (
                          formattedDate
                        )}
                      </td>
                      <td className="border-x border-gray-500 overflow-x-hidden text-ellipsis p-3" onClick={() => handlePopUpShowNews(news.id_news)}>
                        {news.id_news === newsInEdition ? (
                          <textarea type="text" name="description" id="description" value={dataEdition.description || ''} onChange={handleInputChange} className="overflow-hidden"/>
                        ) : (
                          news.description.substring(0, 100)
                        )}
                      </td>
                      <td className="relative flex justify-center items-center py-3 sm:hidden">
                        {news.id_news === newsInEdition ? (
                          <div className="flex justify-between gap-3">
                            <Button
                              bg_color={"bg-primary"}
                              hover_bg={"hover:bg-primary-s1"}
                              px={"px-1"} py={"py-1"}
                              text_size={"text-xs"}
                              onClick={() => handleSaveEdition(news.id_news)}
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
                            {openActionsId !== news.id_news &&
                              <div onClick={() => handleClickActions(news.id_news)}>
                                <IconEllipsis />
                              </div>
                            }
                            {openActionsId === news.id_news && ( // Verifica si el ID coincide
                              <div className="flex justify-between gap-3">
                                <Button
                                  bg_color={"bg-primary"}
                                  hover_bg={"hover:bg-primary-s1"}
                                  px={"px-1"} py={"py-1"}
                                  text_size={"text-xs"}
                                  onClick={() => handleClickUpdate(news)}
                                >
                                  Editar
                                </Button>
                                <Button
                                  bg_color={"bg-red-500"}
                                  hover_bg={"hover:bg-red-700"}
                                  text_size={"text-xs"}
                                  px={"px-1"} py={"py-1"}
                                  onClick={() => handlePopUpDelete(news.id_news)}
                                >
                                  Eliminar
                                </Button>
                              </div>
                            )}
                          </>
                        )}
                      </td>
                      <td className="hidden sm:flex sm:justify-evenly sm:items-center py-6" onClick={() => handleClickActions(news.id_news)}>
                        {news.id_news === newsInEdition ? (
                          <>
                            <Button
                              bg_color={"bg-primary"}
                              hover_bg={"hover:bg-primary-s1"}
                              px={"px-1 lg:px-3"} py={"py-1 lg:py-2"}
                              text_size={"text-xs"}
                              onClick={() => handleSaveEdition(news.id_news)}
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
                              onClick={() => handleClickUpdate(news)}
                            >
                              <IconUpdate />
                            </Button>
                            <Button
                              px={"px-0"}
                              py={"py-0"}
                              bg_color={"bg-transparent"}
                              hover_bg={"hover:bg-gray-accent-light-1"}
                              onClick={() => handlePopUpDelete(news.id_news)}
                            >
                              <IconDelete />
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {openPopUpDelete && (
              <section className="fixed top-1/2 left-1/2 transform -translate-1/2 bg-neutral-700 rounded-xl p-5 z-5">
                <Text
                  color_children={"text-white"}
                >
                  ¿Estás seguro que deseas eliminar "{newsToDelete.title}"?
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
                    onClick={() => handleClickDelete(newsToDelete.id_news)}
                  >
                    Eliminar
                  </Button>
                </article>
              </section>
            )}
          </article>
          {newsInEdition == null && (
            <>
              {openPopUpShowNews && (
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
                      Noticia seleccionada
                    </Text>
                    <figure className="p-2 text-white hover:text-black hover:bg-gray-200 cursor-pointer rounded-full" onClick={() => { setOpenPopUpShowNews(false), setSelectedNews(null) }}>
                      <IconClose />
                    </figure>
                  </article>
                  <article className="flex flex-col gap-5 overflow-y-scroll p-5">
                    <Text
                      text_size={"text-base xl:text-2xl"}
                      text_position={"text-left"}
                    >
                      {selectedNews.title}
                    </Text>
                    <Text
                      text_size={"text-xs md:text-base"}
                      text_position={"text-left"}
                      variant={"paragraph"}
                    >
                      {formattedDateSelectedNews}
                    </Text>
                    <Image
                      image={selectedNews.image ? `data:${selectedNews.typeImage};base64,${selectedNews.image}` : null}
                      altImage={selectedNews.imageCaption}
                    />
                    <article className="bg-secondary rounded-lg p-2">
                      <Text
                        text_size={"text-sm md:text-base"}
                        text_position={"text-left"}
                        variant={"paragraph"}
                      >
                        {selectedNews.epigraph}
                      </Text>
                    </article>
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