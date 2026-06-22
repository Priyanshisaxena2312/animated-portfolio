import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import '../../styles/sections/AboutSection.scss';
import foto1 from '../../assets/images/foto1.jpg';

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const useOrbCanvas = (canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return undefined;
    }

    let animationFrameId;
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const orbs = [
      { x: window.innerWidth * 0.1, y: window.innerHeight * 0.1, r: 150, color: 'rgba(100, 219, 255, 0.8)', vx: Math.random() - 0.5, vy: Math.random() - 0.5 },
      { x: window.innerWidth * 0.85, y: window.innerHeight * 0.6, r: 100, color: 'rgba(255, 119, 198, 0.6)', vx: Math.random() - 0.5, vy: Math.random() - 0.5 },
      { x: window.innerWidth * 0.2, y: window.innerHeight * 0.8, r: 75, color: 'rgba(120, 119, 198, 0.5)', vx: Math.random() - 0.5, vy: Math.random() - 0.5 }
    ];

    const drawOrbs = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb) => {
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawOrbs();
    };

    const animate = () => {
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x + orb.r > canvas.width || orb.x - orb.r < 0) orb.vx *= -1;
        if (orb.y + orb.r > canvas.height || orb.y - orb.r < 0) orb.vy *= -1;
      });

      drawOrbs();

      animationFrameId = window.requestAnimationFrame(animate);
    };

    const syncMotionPreference = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = undefined;

      if (reducedMotionQuery.matches) {
        drawOrbs();
        return;
      }

      animate();
    };

    window.addEventListener('resize', resizeCanvas);
    reducedMotionQuery.addEventListener('change', syncMotionPreference);
    resizeCanvas();
    syncMotionPreference();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      reducedMotionQuery.removeEventListener('change', syncMotionPreference);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef]);
};

const OrbBackground = () => {
  const canvasRef = useRef(null);

  useOrbCanvas(canvasRef);

  return (
    <div className="cosmic-background">
      <canvas ref={canvasRef} className="floating-orbs-canvas"></canvas>
      <div className="star-field"></div>
    </div>
  );
};

const AboutSection = ({ id }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={sectionRef} className="about-section">
      <OrbBackground />

      <div className="about-content">
        <motion.div 
          className="about-container"
          variants={staggerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={textVariants}>
            <h2 className="section-title">
              <span className="title-glow">{t('about.title')}</span>
            </h2>
            <div className="title-underline"></div>
          </motion.div>

          <div className="about-grid">
            <motion.div className="avatar-container" variants={textVariants}>
              <div className="hologram-avatar">
                <div className="avatar-glitch"></div>
                <div className="avatar-glow"></div>
                <img 
                  src={foto1} 
                  alt="Profile" 
                  className="avatar-image"
                />
              </div>
              <div className="avatar-orbits">
                <div className="orbit-ring ring-1"></div>
                <div className="orbit-ring ring-2"></div>
                <div className="orbit-ring ring-3"></div>
              </div>
            </motion.div>

            <motion.div className="bio-container" variants={textVariants}>
              <div className="bio-content">
                <h3 className="bio-greeting">
                  <Trans i18nKey="about.greeting">
                    Hello, I'm <span className="name-glow">Priyanshi</span> 👋
                  </Trans>
                </h3>
                
                <div className="bio-text">
                  <p>
                    <Trans i18nKey="about.bio_p1">
                      I'm a <span className="highlight">Computer Science engineering student</span> specializing in Artificial Intelligence and Machine Learning with a passion for technology and problem-solving. I enjoy building innovative applications and exploring ideas that bridge <span className="highlight">creativity and intelligence.</span>.
                    </Trans>
                  </p>
                  
              
<p>
  <Trans i18nKey="about.bio_p2">
    Currently pursuing a <span className="highlight">B.Tech in Computer Science Engineering (AI & ML)</span>, I'm continuously expanding my knowledge through academic coursework and personal projects while exploring new technologies and building practical solutions.
  </Trans>
</p>

<p>
  <Trans i18nKey="about.bio_p3">
    I'm working toward becoming a <span className="highlight">skilled AI engineer and software developer</span>. I believe in continuous learning and enjoy combining creativity with technology to create solutions that make a meaningful impact.
  </Trans>
</p>
```

                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;