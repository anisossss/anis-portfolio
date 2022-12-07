import { useState, useEffect, useRef } from "react";
import { MENULINKS, WORK } from "../../constants";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Fade } from "react-reveal";
import styles from "./Work.module.scss";
import Button from "../Button/Button";

const Work = ({ clientWidth }) => {
  const targetSection = useRef(null);
  const inputRef = useRef(null);
  const macRef = useRef(null);

  // Add more "false" elements when the job profiles increase. Rn it is only one -> [Spacenos]
  const [checked, setChecked] = useState([false]);
  const [isActive, setIsActive] = useState(false);
  const [gunStyle, setGunStyle] = useState({});

  // onClick -> option chosen from the nerf gun animation
  const [mockupStyle, setMockupStyle] = useState({});
  const [macTopStyle, setMacTopStyle] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    revealTl.from(
      targetSection.current.querySelectorAll(".seq"),
      { opacity: 0, duration: 0.5, stagger: 0.5 },
      "<"
    );

    ScrollTrigger.create({
      trigger: targetSection.current.querySelector(".work-wrapper"),
      start: "100px bottom",
      end: `center center`,
      animation: revealTl,
      scrub: 0,
    });
  }, [targetSection, isActive]);

  const handleChange = (position) => {
    const height = 0;
    height = inputRef.current.offsetTop - 15;
    checked[position] = true;
    setGunStyle({
      transform: "translateY(" + height + "px)",
      visibility: "visible",
    });
    setIsActive(true);

    checked[position] = false;

    setTimeout(() => {
      setMockupStyle({
        transform: "translate3d(0, 0, 0) rotateX(-90deg)",
        transition: "1s",
      });
      setMacTopStyle({
        transform: "translate3d(0, 0, 0) rotateX(-90deg)",
        transition: "1s",
      });
    }, 1500);

    setTimeout(() => {
      setIsActive(false);
      macRef.current.scrollIntoView({
        behavior: "smooth",
      });
      setGunStyle({
        transform: "translateY(500px)",
        visibility: "hidden",
      });
      setMockupStyle({
        transform: "translate3d(0, 0, 0) rotateX(0deg)",
        transition: "500ms",
      });
      setMacTopStyle({
        transform: "translate3d(0, 0, 0) rotateX(0deg)",
        transition: "500ms",
      });
    }, 3000);
  };

  return (



    <section
      className="w-full relative select-none xs:mt-40 sm:mt-72 mb-20"
      id={MENULINKS[3].ref}
      ref={targetSection}
    >
      <img
        src="/left-pattern.svg"
        className="absolute hidden left-0 -top-1/4 w-1/12 max-w-xs md:block"
        loading="lazy"
        height={700}
        width={320}
        alt=""
      />
      <div className="section-container py-16 flex flex-col justify-center">
        <div className="flex flex-col work-wrapper">
          <div className="flex flex-col">
            <p className="uppercase tracking-widest text-gray-light-1 seq">
              WORK
            </p>
            <h1 className="text-6xl mt-2 font-medium text-gradient w-fit seq">
              Experience
            </h1>
            <h2 className="text-[1.65rem] font-medium md:max-w-lg w-full mt-2 seq">
              A quick recap of where I&apos;ve worked.{" "}
            </h2>
          </div>
        </div>

        {clientWidth > 767 ? (
          <>
            <div className={`wrapper ${isActive ? "active" : ""}`}>
              <div className="page">
                <p>
                  Sousse,  
                  <span className="relative">
                     &nbsp;Tunisia
                    <span className="absolute h-3 w-3">
                      <span className="animate-ping absolute bottom-[2px] right-[2px] inline-flex h-3 w-3 rounded-full bg-purple opacity-75"></span>
                      <span className="relative flex justify-end rounded-full h-2 w-2 bg-purple"></span>
                    </span>
                  </span>
                </p>
                <div className="radio-wrapper">
                  {WORK &&
                    WORK.map((job, i) => {
                      const { company } = job;
                      return (
                        <>
                          <input
                            key={`choice-${i}`}
                            type="radio"
                            id={`choice-${i}`}
                            name="choices"
                            value={i}
                            ref={inputRef}
                            checked={checked[i]}
                            onChange={() => handleChange(i)}
                            className="link"
                          />
                          <label htmlFor={`choice-${i}`}>{company}</label>
                        </>
                      );
                    })}
                </div>
              </div>
              <div className="gun" style={gunStyle}>
                <div className="gun__main">
                  <div className="gun__handle">
                    <div className="bottom"></div>
                    <div className="middle"></div>
                    <div className="top">
                      <div className="line line-short"></div>
                      <div className="line line-long"></div>
                      <div className="line line-long"></div>
                      <div className="line line-short"></div>
                      <div className="line line-short"></div>
                    </div>
                  </div>
                  <div className="gun__accent-2"></div>
                  <div className="gun__accent-1"></div>
                  <div className="gun__yellow">
                    <div className="line"></div>
                  </div>
                  <div className="gun__trigger"></div>
                  <div className="gun__accent-3"></div>
                  <div className="gun__accent-4"></div>
                </div>
                <div className="bullet"></div>
              </div>
            </div>

            <div className={styles.container} ref={macRef}>
              <div
                className={`${styles.mockup} ${styles.loaded} ${styles.opened}`}
                style={mockupStyle}
              >
                <div
                  className={`${styles.part} ${styles.top}`}
                  style={macTopStyle}
                >
                  <img
                    src="/work/macbook-top.svg"
                    alt=""
                    className={styles.top}
                    loading="lazy"
                  />
                  <img
                    src="/work/macbook-cover.svg"
                    alt=""
                    className={styles.cover}
                    loading="lazy"
                  />

                  <video
                    autoPlay
                    muted
                    className="border-gray-dark-5 border-[4px] h-[400px] bg-gray-dark-5"
                  >
                    <source src="/work/screen.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className={`${styles.part} ${styles.bottom}`}>
                  <img
                    src="/work/macbook-cover.svg"
                    alt=""
                    className={styles.cover}
                    loading="lazy"
                  />
                  <img
                    src="/work/macbook-bottom.svg"
                    alt=""
                    className={styles.bottom}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Fade bottom distance={"4rem"}>
              <div className="grid grid-cols-12 gap-4 place-items-center">
                <div className="col-span-12 flex flex-col">
                  <div className="py-5 ">
                    {WORK.map((job, index) => {
                      const { company } = job;
                      return (
                        <div key={company}>
                          <Button
                            key={company}
                            classes={`link text-lg`}
                            href={`#${company.toLowerCase()}`}
                            type="primary"
                            onClick={() => {
                              setActiveIndex(index);
                            }}
                          >
                            {company}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="pt-10 col-span-12 flex flex-col justify-center items-center min-h-full">
                  <div className="bg-gray-dark-4 rounded-2xl px-10 py-10 w-72 h-full mx-16">
                    <p className="font-bold mb-2 text-2xl">
                      {WORK[activeIndex]?.company}
                    </p>
                    <p className="mb-1 text-lg">{WORK[activeIndex]?.title}</p>
                    <p className="italic text-sm font-thin">
                      {/* {company?.startDate} -{" "}
                    {company?.endDate ? company?.endDate : "Present"} */}
                      {WORK[activeIndex]?.range}
                    </p>
                    <ul className="text-base mt-6 list-disc ml-2 z-30">
                      {WORK[activeIndex]?.responsibilities.map((r) => {
                        return (
                          <li key={r} className="mt-2">
                            {r}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </Fade>
          </>
        )}
      </div>
    </section>
  );
};

export default Work;
