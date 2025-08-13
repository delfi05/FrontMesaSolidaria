import { useEffect, useState } from "react"
import { Header } from "@/components/gral/header/Header"
import { Input } from "@/components/gral/inputs/Input"
import { Text } from "@/components/gral/texts/Text"
import { Button } from "@/components/gral/buttons/Button"
import { Footer } from "@/components/gral/footer/Footer"
import { IconCheck, IconCloudGreen, IconCloudGreenLG, IconCloudOrange, IconCloudOrangeLG } from "../../components/icons/Icons"
import { VoluntaryService } from "@/service/VoluntaryService"

export const Join = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newVoluntary, setNewVoluntary] = useState({name: '', lastName: '', email: '', phone: ''});
  const { saveVoluntary } = VoluntaryService();
  const [phoneNumberValid, setPhoneNumberValid] = useState(null);
  const [errorPhoneValid, setErrorPhoneValid] = useState(null);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewVoluntary(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickForm = (event) => {
    event.preventDefault();
    setLoading(true); // Si planeas usar un estado de carga
    console.log("Datos a enviar:", newVoluntary);
    const phoneNumber = event.target.phone.value;
   const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const isPhoneValid = phoneRegex.test(phoneNumber) && phoneNumber.length >= 8;
    setPhoneNumberValid(isPhoneValid ? true : false);
    if (!isPhoneValid) {
        setErrorPhoneValid("El formato del teléfono no es válido.");
        setLoading(false);
        return;
    } else {
        setErrorPhoneValid(null); // Limpiamos el error de teléfono si es válido
    }
    saveVoluntary(newVoluntary)
      .then((response) => {
        console.log("Voluntario guardado:", response.data);
        setSuccess(true);
        setError('');
        setNewVoluntary({ name: '', lastName: '', email: '', phone: '' }); // Limpiar el formulario
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al guardar el voluntario:", error);
        setError('El email ya se encuentra registrado como voluntario! Envia email a federacion.mesasolidariatandil@gmail.com.');
        setErrorPhoneValid("El numero no corresponde a un formato de telefono valido")
        setSuccess(false);
        setLoading(false);
      });
  };

  setTimeout(() => {
    if(success)
      setSuccess(false);
  }, 3000);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <section className="bg-[url(../img/gral/hands-united.webp)] bg-right bg-contain bg-no-repeat
                            min-h-41 flex flex-col justify-center items-start
                            sm:h-[220px]
                            md:bg-[url(../img/gral/2xl_hands_united.webp)] md:h-[328px]
                            lg:h-[438px] lg:gap-5
                            xl:h-[616px] xl:gap-10">
          <section className="w-full lg:w-[508px] lg:ml-12 xl:w-[666px] xl:ml-15">
            <Text
              color_children={"text-gray-accent-light-1"}
              width={"w-1/2 lg:w-full"}
              text_size={"text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl"}
              margin_x={"mx-2 sm:ml-3 lg:ml-0"}
              margin_y={"my-0"}
            >
              Formá parte de <span className="text-secondary-s1">Mesa Solidaria</span> y hacé la diferencia en tu comunidad.
            </Text>
            <Text
              color_children={"text-gray-accent-light-1"}
              width={"w-1/2 lg:w-full"}
              text_size={"text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl"}
              margin_x={"mx-2 sm:ml-3 lg:ml-0"}
              margin_y={"my-0 xl:mt-2"}

            >
              En Mesa Solidaria creemos que cada persona tiene algo valioso para aportar.
            </Text>
          </section>
          {/* Section Cloud Orange Desktop */}
          <section className="hidden lg:flex lg:relative lg:w-[508px] lg:h-45 lg:ml-12 xl:ml-35">
            <article>
              <figure className="absolute">
                <IconCloudOrangeLG xl_scale={"xl:scale-124"} />
              </figure>
              <article className="absolute top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-2/5 w-full">
                <Text
                  color_children={"text-primary-s2"}
                  margin_x={"mx-auto lg:ml-0"}
                  text_size={"lg:text-xl xl:text-2xl"}
                  font_style={"xl:font-oswald-bold"}
                  text_case={"uppercase"}
                >
                  Sumate a nuestro equipo de voluntarios
                </Text>
                <Text
                  color_children={"text-accent-light-2"}
                  width={"lg:w-9/10 xl:w-5/6"}
                  margin_y={"my-auto xl:mt-2"}
                  text_size={"lg:text-lg xl:text-xl"}
                  variant={"paragraph"}
                >
                  y construyamos juntos un futuro mejor.
                  Cada aporte, por pequeño que parezca, transforma realidades.
                </Text>
              </article>
            </article>
          </section>
        </section>
        {/* Section Cloud Orange Mobile */}
        <section className="my-5 md:my-10 relative w-full h-31.5 lg:hidden">
          <article className="w-full h-full">
            <figure className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full">
              <IconCloudOrange xs_scale={"scale-90"} sm_scale={"sm:scale-120"} md_scale={"md:scale-140"} lg_scale={"lg:scale-180"} />
            </figure>
            <article className="absolute top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-2/5 w-87 sm:w-105">
              <Text
                color_children={"text-primary-s2"}
                text_size={"text-sm sm:text-base md:text-lg"}
                margin_x={"mx-auto md:ml-0"}
                text_case={"uppercase"}
                font_style={"font-oswald-bold"}
              >
                Sumate a nuestro equipo de voluntarios
              </Text>
              <Text
                color_children={"text-accent-light-2"}
                text_size={"text-sm sm:text-base"}
                width={"w-9/10 md:w-full"}
                margin_x={"mx-auto md:ml-0"}
                variant="paragraph"
              >
                y construyamos juntos un futuro mejor.
                Cada aporte, por pequeño que parezca, transforma realidades.
              </Text>
            </article>
          </article>
        </section>
        {/* Section Form */}
        <section>
          <article className="flex flex-col justify-center items-center gap-1 lg:gap-3">
            <Text
              color_children={"text-secondary"}
              text_size={"text-lg lg:text-2xl xl:text-3xl"}
              margin_x={"ml-0"}
              font_style={"xl:font-oswald-bold"}
            >
              ¡Gracias por querer ser parte!
            </Text>
            <Text
              color_children={"text-gray-accent-light-1"}
              text_size={"text-sm sm:text-base xl:text-xl"}
              width={"w-9/10 sm:w-2/3 md:w-1/2"}
              margin_x={"mx-auto"}
            >
              Te invitamos a <span className="text-gray-accent-light-2">completar el siguiente formulario </span>
              para que puedas unirte a nuestro equipo de voluntarios
            </Text>
          </article>
          <form className="flex flex-col justify-center items-center gap-2.5
                           mx-auto my-7.5 w-9/10 sm:w-2/3 md:gap-3 md:w-2/3 lg:gap-4 lg:w-1/2 xl:gap-6 xl:w-2/5"
                onSubmit={handleClickForm}>
            <Input
              px={"px-2.5 md:px-4"}
              py={"py-1 sm:py-1.5 md:py-2 xl:py-3"}
              text_size={"text-xs md:text-sm lg:text-base xl:text-lg"}
              type="text" placeholder="Nombre *" name="name" autoComplete="on" required
              value={newVoluntary.name} onChange={handleChange}
            />
            <Input
              px={"px-2.5 md:px-4"}
              py={"py-1 sm:py-1.5 md:py-2 xl:py-3"}
              text_size={"text-xs md:text-sm lg:text-base xl:text-lg"}
              type="text" placeholder="Apellido *" name="lastName" autoComplete="on" required
              value={newVoluntary.lastName} onChange={handleChange}
            />
            <Input
              px={"px-2.5 md:px-4"}
              py={"py-1 sm:py-1.5 md:py-2 xl:py-3"}
              text_size={"text-xs md:text-sm lg:text-base xl:text-lg"}
              type="email" placeholder="Email *" name="email" autoComplete="on" required
              value={newVoluntary.email} onChange={handleChange}
            />
            <Input
              px={"px-2.5 md:px-4"}
              py={"py-1 sm:py-1.5 md:py-2 xl:py-3"}
              text_size={"text-xs md:text-sm lg:text-base xl:text-lg"}
              type="tel" placeholder="Teléfono (xxx) xxx-xxxxxx *" name="phone" autoComplete="on" required
              value={newVoluntary.phone} onChange={handleChange}
            />
            {!errorPhoneValid && !error && success && (
              <span className="flex justify-center items-center gap-2.5 text-primary"><IconCheck /> ¡Tu formulario fue enviado con éxito!</span>
            )}
            {!errorPhoneValid && error && (
              <span className="flex justify-center text-center items-center gap-2.5 text-red-500">{error}</span>
            )}
            {!error && errorPhoneValid &&(
              <span className="flex justify-center text-center items-center gap-2.5 text-red-500">{errorPhoneValid}</span>
            )}
            <Button
              bg_color={"bg-primary-s1"}
              hover_bg={"hover:bg-primary"}
              px={"px-7 md:px-8 xl:px-10"}
              py={"py-2 sm:py-2.5 xl:py-4"}
              text_size={"text-xs md:text-sm xl:text-base"}
              type={"submit"}
            >
            {loading ? "Enviando..." : "SUMARME"}
            </Button>
          </form>
        </section>
        {/* Section Cloud Green */}
        <section className="sm:my-15 md:my-20 relative w-full h-31.5 sm:h-36 lg:my-30 xl:my-50">
          <article className="w-full h-full">
            <figure className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:hidden">
              <IconCloudGreen xs_scale={"scale-90"} sm_scale={"sm:scale-130"} md_scale={"md:scale-140"} />
            </figure>
            <figure className="hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:flex">
              <IconCloudGreenLG xl_scale={"xl:scale-137"} />
            </figure>
            <article className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-87 sm:w-105 lg:w-190 lg:top-1/5 lg:-translate-y-1/5">
              <Text
                color_children={"text-white"}
                text_size={"text-base md:text-lg lg:text-xl xl:text-3xl"}
                margin_y={"-mt-2 sm:mt-1 xl:-mt-3"}
              >
                ¡Ya estás a un paso!
              </Text>
              <Text
                color_children={"text-white"}
                width={"w-9/10 sm:w-full"}
                margin_y={"my-auto sm:mt-1 lg:mt-3 xl:mt-3"}
                text_size={"text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl"}
                variant="paragraph"
              >
                <span className="text-secondary-s1">Después de inscribirte</span> nos pondremos en contacto con vos para conocerte mejor y evaluar juntos las mejores opciones para sumarte.
              </Text>
            </article>
          </article>
        </section>
      </main >
      <Footer />
    </>
  )
}