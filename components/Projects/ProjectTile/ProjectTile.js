import { useEffect, useRef } from "react";
import Image from "next/image";
import VanillaTilt from "vanilla-tilt";
import styles from "./ProjectTile.module.scss";

const ProjectTile = ({ project, classes, isDesktop }) => {
  const { name, image, blurImage, description, gradient, url, tech } = project;
  const projectCard = useRef(null);
  let additionalClasses = "";
  if (classes) {
    additionalClasses = classes;
  }

  const options = {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    gyroscope: false,
  };

  useEffect(() => {
    VanillaTilt.init(projectCard.current, options);
  }, [projectCard]);

  return (
    <a
      href={url}
      className={`overflow-hidden rounded-3xl ${additionalClasses}`}
      ref={projectCard}
      target="_blank"
      rel="noreferrer"
      style={{
        maxWidth: isDesktop ? "calc(100vw - 2rem)" : "calc(100vw - 4rem)",
        flex: "1 0 auto",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
      }}
    >
      <div
        className={`h-[25rem] w-[38rem] bg-black ${styles.ProjectTile} rounded-3xl relative p-6 flex flex-col justify-between max-w-full`}
        style={{
          background: `linear-gradient(90deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
        }}
      >
        <img
          src="/project-bg.svg"
          alt="project"
          className="absolute w-full h-full top-0 left-0 object-cover opacity-30"
        />
        <Image src={image} alt={name} layout="fill" />

        {/* <div
          className={`
            ${styles.techIcons} w-1/2 h-full absolute left-24 top-0 sm:flex items-center hidden
          `}
        >
          <div className="flex flex-col pb-8">
            {project.tech.map((el, i) => (
              <img
                className={`${i % 2 === 0 && "ml-16"} mb-4`}
                src={`/projects/tech/${el}.svg`}
                alt={el}
                height={45}
                width={45}
                key={el}
              />
            ))}
          </div>
        </div> */}
      </div>
    </a>
  );
};

export default ProjectTile;
