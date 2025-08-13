import { useEffect } from "react";
import { ProjectCard } from "./ProjectCard";
import { Link } from "react-router-dom";

export const ProjectsCards = ({ projects }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <article className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5">
      {projects?.map((projectItem) => (
        <Link
          to={`/projects/${projectItem.id_project}`}
          key={projectItem.id_project}
          className="w-48/100 sm:w-32/100 xl:w-24/100"
        >
          <ProjectCard
            height_image={"h-35.5 sm:h-50 md:h-57 lg:h-68"}
            height={"h-44 sm:h-60 md:h-70 lg:h-82 xl:h-85"}
            padding_y={"py-1.5 sm:py-2 md:py-3 xl:py-4"}
            {...projectItem} />
        </Link>
      ))}
    </article>
  );
};