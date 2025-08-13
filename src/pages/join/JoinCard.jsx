import { Link } from "react-router-dom"
import { Button } from "@/components/gral/buttons/Button"
import { Text } from "@/components/gral/texts/Text"

export const JoinCard = () => {
  return (
    <>
      <section
        className="w-full h-full mt-7 flex flex-col items-center justify-center md:mt-0 md:mr-8 md:w-80 md:h-90"
        style={{ boxShadow: "inset 0px 3px 2px rgba(0,0,0,0.2), inset 0px -3px 2px rgba(0,0,0,0.2)" }}
      >
        <Text
          width={"w-9/10"}
          margin_x={"mx-0"}
          padding_x={"pt-7"}
          text_size={"text-lg md:text-xl"}
        >
          ¡Vos también podés ser parte de este gran cambio!
          Sumate al proyecto de formación de oficio y ayudanos a que más personas puedan acceder a nuevas oportunidades.
        </Text>
        <Link to={"/join"}>
          <Button
            width={"w-60 sm:w-90 md:w-70"}
            margin_x={"mx-5"}
            margin_y={"my-5"}
          >
            sumate como voluntario
          </Button>
        </Link>
        <Link to={"/donate"}>
          <Button
            bg_color={"bg-primary-s1"}
            hover_bg={"hover:bg-primary"}
            width={"w-60 sm:w-90 md:w-70"}
            margin_y={"my-0 mb-5"}
          >
            Donar
          </Button>
        </Link>
      </section>
    </>
  )
}