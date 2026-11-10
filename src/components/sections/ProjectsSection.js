
import React, { useMemo, memo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Music,
  Star,
  Moon,
  Zap,
  Orbit,
  Component,
  ExternalLink,
} from "lucide-react";

import "../../styles/sections/ProjectsSection.scss";

import forum from "../../assets/images/forumhub.png";
import maleria from "../../assets/images/maleria.png";
import gallery from "../../assets/images/image.png";
import traffic from "../../assets/images/traffic.png";

const ProjectsSection = ({ id }) => {
  const { t } = useTranslation();

  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "Forum Hub",
        subtitle: "PHP • MySQL • XAMPP • HTML • CSS • JavaScript",
        description: t("project_items.p1.desc"),
        isPlaceholder: false,
        image: forum,
        color: "#f9a8d4",
        context: t("project_items.p1.context"),
      },
      {
        id: 2,
        title: "Image Gallery",
        subtitle: "React.js • Tailwind CSS • Vercel",
        description: t("project_items.p2.desc"),
        isPlaceholder: false,
        image: gallery,
        color: "#86efac",
        link: "https://image-gallery-chi-three.vercel.app/",
        context: t("project_items.p2.context"),
      },
      {
        id: 3,
        title: "Parasite Detection ML",
        subtitle: "Python • TensorFlow • Streamlit",
        description: t("project_items.p3.desc"),
        isPlaceholder: false,
        image: maleria,
        color: "#fde68a",
        context: t("project_items.p3.context"),
      },
      {
        id: 4,
        title: "Smart Traffic Management System",
        subtitle: "AI • Machine Learning • Computer Vision",
        description: t("project_items.p4.desc"),
        isPlaceholder: false,
        image: traffic,
        color: "#c4b5fd",
        link: "https://smart-traffic-prediction-eta.vercel.app/",
        context: t("project_items.p4.context"),
      },
    ],
    [t]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const doodleField = useMemo(() => {
    const icons = [Music, Star, Moon, Zap, Orbit, Component];
    const colors = ["#a5f3fc", "#e9d5ff", "#ffbd7a"];

    return [...Array(12)].map((_, i) => {
      const zones = [
        { t: [5, 15], l: [5, 15] },
        { t: [5, 15], l: [85, 95] },
        { t: [40, 60], l: [2, 8] },
        { t: [40, 60], l: [92, 98] },
        { t: [80, 90], l: [10, 20] },
        { t: [80, 90], l: [80, 90] },
      ];

      const zone = zones[i % zones.length];
      const clr = colors[Math.floor(Math.random() * colors.length)];

      return {
        id: i,
        Icon: icons[Math.floor(Math.random() * icons.length)],
        top: `${zone.t[0] + Math.random() * (zone.t[1] - zone.t[0])}%`,
        left: `${zone.l[0] + Math.random() * (zone.l[1] - zone.l[0])}%`,
        size: Math.random() * 7 + 10,
        color: clr,
        textShadow: `0 0 12px white, 0 0 6px ${clr}`,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 5,
      };
    });
  }, []);

  const stars = useMemo(() => {
    return [...Array(160)].map((_, i) => {
      const size = i % 10 === 0 ? 3 : i % 5 === 0 ? 2 : 1;

      return {
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${size}px`,
        duration: Math.random() * 3 + 2 + "s",
        delay: Math.random() * 5 + "s",
        opacity:
          size === 1
            ? Math.random() * 0.3 + 0.1
            : Math.random() * 0.5 + 0.3,
        blur: i % 15 === 0 ? "1px" : "0px",
      };
    });
  }, []);

  return (
    <section id={id} className="projects-section">
      <div className="stars-container">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              "--duration": star.duration,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {doodleField.map((d) => (
        <motion.div
          key={d.id}
          className="sparkle-doodle"
          initial={{ opacity: 0.18, scale: 0.7 }}
          animate={{
            opacity: [0.18, 0.6, 0.18],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            delay: d.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: d.top,
            left: d.left,
            color: d.color,
            filter: `drop-shadow(0 0 8px ${d.color})`,
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <d.Icon size={d.size} strokeWidth={2.1} />
        </motion.div>
      ))}

      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="section-title">
          <span className="title-glow">{t("projects")}</span>
        </h2>
        <div className="title-underline"></div>
      </motion.div>

      <div className="section-content">
        <motion.div
          className="projects-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {projects.map((project) => {
            const isClickable = Boolean(project.link);
            const CardElement = isClickable ? motion.a : motion.div;
            const linkProps = isClickable
              ? {
                  href: project.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": `${project.title} - View Live Project`,
                }
              : {};

            return (
              <CardElement
                key={project.id}
                className={`music-card ${isClickable ? "is-clickable" : ""}`}
                variants={cardVariants}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3 },
                }}
                {...linkProps}
              >
                <div className="card-hardware">
                  <div className="album-art">
                    {project.isClassified ? (
                      <div className="classified-overlay">
                        <span>{t("classified")}</span>
                      </div>
                    ) : project.isPlaceholder ? (
                      <div
                        className="placeholder-art"
                        style={{
                          width: "100%",
                          height: "100%",
                          background: `linear-gradient(135deg, ${project.color}33, ${project.color}88)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "8px",
                        }}
                      >
                        <Component
                          size={40}
                          color={project.color}
                          strokeWidth={1.5}
                        />
                      </div>
                    ) : (
                      <>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="art-img"
                        />
                        <div className="screen-glare"></div>
                      </>
                    )}
                  </div>

                  <div className="card-info">
                    <h3 className="project-name">{project.title}</h3>

                    <div className="project-tech-stack">
                      {project.subtitle.split(" • ").map((tech) => (
                        <span
                          key={tech}
                          className="tech-tag"
                          style={{ color: project.color }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <p className="project-desc">{project.description}</p>

                    {project.link && (
                      <div className="project-live-link">
                        <span>View Live Project</span>
                        <ExternalLink size={14} className="external-link-icon" />
                      </div>
                    )}
                  </div>

                  <div className="playback-unit">
                    <div className="playback-bar">
                      <div className="progress-bg">
                        <motion.div
                          className="progress-fill"
                          style={{
                            backgroundColor: project.color,
                            boxShadow: `0 0 10px ${project.color}`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardElement>
            );
          })}
        </motion.div>
      </div>

      <div className="audio-visualizer">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="bar"
            initial={{ height: 0 }}
            whileInView={{ height: [5, 30, 15, 35, 5] }}
            transition={{
              repeat: Infinity,
              duration: 1 + Math.random(),
              delay: i * 0.05,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default memo(ProjectsSection);
