import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/gral/header/Header";
import { Text } from "@/components/gral/texts/Text";
//import { projects } from "@/mocks/project.json";
import { Image } from "@/components/gral/images/Image";
import { Footer } from "@/components/gral/footer/Footer";
import { useEffect, useState } from "react";
import { JoinCard } from "../join/JoinCard";
import { IconArrowLeft, IconArrowRight } from "@/components/icons/Icons";
import { ProjectService } from "@/service/ProjectService";

const { getAvailableProjectById, getAvailableProjects } = ProjectService();
const getProjects = (setProjects) => {
  getAvailableProjects()
    .then((response) => {
      setProjects(response.data);
    })
    .catch((error) => {
      console.log(error);
      setProjects([]);
    });
}
const getById = (id, setSelectedProject) => {
  getAvailableProjectById(id).then((response) => {
    setSelectedProject(response.data)
  }).catch(error => {
    console.log(error);
  });
}
export const ProjectUnique = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const paragraphs = selectedProject?.description?.split(/\n+/) || [];

  useEffect(() => {
    getById(id, setSelectedProject)
    getProjects(setProjects)
  }, [id])

  useEffect(() => {
    if (selectedProject && projects.length > 0) {
      const index = projects.findIndex(
        (project) => project.id_project === selectedProject.id_project
      );
      setCurrentIndex(index);
    } else {
      setCurrentIndex(-1);
    }
  }, [selectedProject, projects]);

  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 && currentIndex !== -1 ? projects[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [previousProject, nextProject]);

  return (
    <>
      <Header />
      <main>
        {selectedProject ? (
          <>
            <section className="relative h-27.5 md:h-30 xl:h-40 flex items-center">
              <Image
                image={selectedProject.image ? `data:${selectedProject.typeImage};base64,${selectedProject.image}` : null}
                altImage={selectedProject.altImage}
                height={"h-27.5 md:h-30 xl:h-40"}
                position={"absolute"}
                blur={"blur(3.5px)"}
              />
              <Text
                padding_x={"pl-4"}
                position={"absolute"}
                font_style={"font-oswald-bold"}
                color_children={"text-white"}
                text_position={"text-left"}
                text_size={"text-xl md:text-2xl xl:text-3xl"}
                text_case={"uppercase"}
                text_shadow={{ textShadow: "6px 4px 5px rgba(0,0,0,1)" }}
              >
                {selectedProject.title}
              </Text>
            </section>
            <section className="border-b mx-5 my-3 mb-5">
              <Text
                padding_y={"py-3"}
                text_position={"text-start"}
                text_case={"uppercase"}
                text_size={"text-lg md:text-xl xl:text-2xl"}
              >
                ¿En qué consiste?
              </Text>
            </section>
            <section className="flex flex-col justify-center md:justify-between gap-5 pb-5
                            md:gap-0 md:flex-row md:items-start md:pb-4">
              <section className="mx-5 md:mx-10 xl:mx-15">
                <article className="flex flex-col gap-2">
                  {paragraphs.map((paragraph, index) => (
                    <Text
                      key={index}
                      width={"w-full"}
                      margin_x={"mx-0"}
                      margin_y={"my-0"}
                      font_style={"font-roboto"}
                      text_position={"text-left"}
                      text_size={"text-sm sm:text-base md:text-lg"}
                      variant={"paragraph"}
                    >
                      {paragraph}
                    </Text>
                  ))}
                </article>
              </section>
              <JoinCard />
            </section>
            <section className={`w-full h-12.5 transition-height bg-primary-s2 flex md:h-16 lg:h-18 ${previousProject ? 'justify-start' : 'justify-end'}`}>
              {previousProject && (
                <Link to={`/projects/${previousProject.id_project}`} className="w-1/2 flex items-center pl-2 transition-colors duration-300 hover:bg-primary cursor-pointer">
                  <article className="flex items-center gap-1">
                    <figure>
                      <IconArrowLeft stroke={"#FFF"} />
                    </figure>
                    <Text
                      color_children={"text-white"}
                      text_size={"text-base lg:text-lg xl:text-xl"}
                      text_case={"uppercase"}
                      text_position={"text-left"}
                    >
                      {previousProject.title}
                    </Text>
                  </article>
                </Link>
              )}
              {nextProject && (
                <Link to={`/projects/${nextProject.id_project}`} className="w-1/2 flex items-center pr-2 transition-colors duration-300 justify-end cursor-pointer hover:bg-primary">
                  <article className="flex items-center gap-1">
                    <Text
                      color_children={"text-white"}
                      text_size={"text-base lg:text-lg xl:text-xl"}
                      text_case={"uppercase"}
                      text_position={"text-right"}
                    >
                      {nextProject.title}
                    </Text>
                    <figure>
                      <IconArrowRight stroke={"#FFF"} />
                    </figure>
                  </article>
                </Link>
              )}

            </section>
          </>
        ) : (
          <Text color_children={"text-red-500"}>
            Proyecto no encontrado
          </Text>
        )}
      </main>
      <Footer />
    </>
  );
};