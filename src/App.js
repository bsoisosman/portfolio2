import React, { useState, useEffect } from "react";

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [splitAnimation, setSplitAnimation] = useState(false);
  const [startFlyOff, setStartFlyOff] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Check if animation has been shown this session
    if (window.sessionAnimationShown) {
      setAnimationComplete(true);
      setShowHero(true);
      return;
    }

    // Spinning animation (slower)
    const spinInterval = setInterval(() => {
      setRotation((prev) => prev + 3);
    }, 16);

    // After 2 seconds, stop spinning
    const spinTimer = setTimeout(() => {
      clearInterval(spinInterval);

      // Pause briefly, then split
      setTimeout(() => {
        setSplitAnimation(true);

        // Start fading in content RIGHT AWAY when split begins
        setShowHero(true);

        // Small delay before flying off
        setTimeout(() => {
          setStartFlyOff(true);

          // Play whoosh sound
          const audio = new Audio(
            "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVKzo7rFgGQc+ltryxnMpBSp+zPLaizsIGGS56ueXSwwKT6bi8LJnHgU7k9jzyn0vBSh6yPDajkELEly16PCmWBULRp3e87pqJAUuhM/z1YU2Bhxqvu7mnEoODlOq5O+zYBoGPJPY88p9LgUofMny2Ys+CRdiv+zol04NCE+k4/C1aR4FO5HY88qALwUmeMjw244/CxFat+nvpVkVCkSb3fO7biMGLYHO89WGNwYbab3u5p1LDg1Rp+Pvs2IaBjuR1/PMfy4FJ3nH8dqLPgkWYb/s6ZdPDQdOouLwtmkeBS2Bze7ajTsHGmi77OicSQ0NUKXi77NiGgY7kdfy0H4uBSh4yPDajkELEVqz6fCnWRUKRJrc8r5tIwUugc3z1YU2BRxovO3mn0sODFCm4u+zYRoGOpHY88p/LgUoecjw2o5BCRJaserupVkUCkOa2/O+bSMGLYDO89WFNgYcaLzt5p1LDg1Qp+Lvs2IaBzqR2PPKfy4FKXnI8NqOQQsRWrLp76VZFApDmtvzvm0jBi2Azv"
          );
          audio.volume = 0.3;
          audio.play().catch(() => {});

          // Complete animation after split flies off
          setTimeout(() => {
            setAnimationComplete(true);
            window.sessionAnimationShown = true;
          }, 1700);
        }, 50);
      }, 300);
    }, 2000);

    return () => {
      clearInterval(spinInterval);
      clearTimeout(spinTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Loading Animation */}
      {!animationComplete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {!splitAnimation ? (
            // Complete spinning head before split
            <div
              className="w-96 h-96 flex items-center justify-center"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: "none",
              }}
            >
              <div className="w-96 h-96 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <div
                  className="text-[12rem]"
                  style={{ transform: `rotate(${-rotation}deg)` }}
                ></div>
              </div>
            </div>
          ) : (
            // Split halves flying off
            <>
              {/* Top Half */}
              <div
                className="absolute w-96 h-48 overflow-hidden"
                style={{
                  transform: startFlyOff
                    ? "translateY(-200vh)"
                    : "translateY(0)",
                  transition: startFlyOff ? "transform 1.5s ease-in" : "none",
                  top: "calc(50% - 192px)",
                  left: "calc(50% - 192px)",
                }}
              >
                <div className="w-96 h-96 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-[12rem]"></div>
                </div>
              </div>

              {/* Bottom Half */}
              <div
                className="absolute w-96 h-48 overflow-hidden"
                style={{
                  transform: startFlyOff
                    ? "translateY(200vh)"
                    : "translateY(0)",
                  transition: startFlyOff ? "transform 1.5s ease-in" : "none",
                  top: "calc(50%)",
                  left: "calc(50% - 192px)",
                }}
              >
                <div
                  className="w-96 h-96 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center"
                  style={{ marginTop: "-192px" }}
                >
                  <div className="text-[12rem]"></div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Main Content */}
      {showHero && (
        <div
          className={`transition-opacity duration-[3500ms] ease-in-out ${
            showHero ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentPage("home")}
                  className="text-xl font-bold text-white hover:text-gray-300 transition-colors"
                >
                  Portfolio
                </button>
                <div className="flex gap-8">
                  <button
                    onClick={() => setCurrentPage("projects")}
                    className={`${
                      currentPage === "projects" ||
                      currentPage === "project-detail"
                        ? "text-white"
                        : "text-gray-400"
                    } hover:text-white transition-colors`}
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => setCurrentPage("about")}
                    className={`${
                      currentPage === "about" ? "text-white" : "text-gray-400"
                    } hover:text-white transition-colors`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setCurrentPage("skills")}
                    className={`${
                      currentPage === "skills" ? "text-white" : "text-gray-400"
                    } hover:text-white transition-colors`}
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => setCurrentPage("contact")}
                    className={`${
                      currentPage === "contact" ? "text-white" : "text-gray-400"
                    } hover:text-white transition-colors`}
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Page Content with fade transition */}
          <div className="pt-20">
            {currentPage === "home" && <HomePage onNavigate={setCurrentPage} />}
            {currentPage === "projects" && !selectedProject && (
              <ProjectsPage
                onSelectProject={(project) => {
                  setSelectedProject(project);
                  setCurrentPage("project-detail");
                }}
              />
            )}
            {currentPage === "project-detail" && selectedProject && (
              <ProjectDetailPage
                project={selectedProject}
                onBack={() => {
                  setSelectedProject(null);
                  setCurrentPage("projects");
                }}
              />
            )}
            {currentPage === "about" && <AboutPage />}
            {currentPage === "skills" && <SkillsPage />}
            {currentPage === "contact" && <ContactPage />}
          </div>
        </div>
      )}
    </div>
  );
}

function HomePage({ onNavigate }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 animate-fadeIn">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
          Arjun Reddy
        </h1>
        <p className="text-2xl md:text-3xl text-gray-300 mb-8">
          Troy Tech High school student and IB Diploma Candidate
        </p>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Passionate about Aerospace, Robotics, Engineering, Physics and
          Astronomy.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onNavigate("projects")}
            className="px-8 py-3 bg-white hover:bg-gray-200 text-black font-semibold transition-colors"
          >
            View Projects
          </button>
          <button
            onClick={() => onNavigate("contact")}
            className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black font-semibold transition-colors"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectsPage({ onSelectProject }) {
  const projects = [
    {
      id: 1,
      title:
        "The Bottleneck of Innovation: Hardware, software and the Limits of Human Ingenuity",
      category: "Research",
      thumbnail: "📄",
      description: "Scholastic '24",
      hasCAD: false, // Show 3D viewer button
      hasDesignProcess: false, // Show design process section
      hasTechnologies: false, // Show technologies section
      hasFeatures: false, // Show key features section
      hasChallenges: false, // Show challenges & solutions
      hasGallery: false, // Show image gallery (auto-detects if images exist)
      hasPDFs: true, // Show PDF section (auto-detects if PDFs exist)
      fullDescription:
        "The limits of artificial intelligence are examined by contrasting computational accuracy with human creativity and adaptability. Examples from underwater exploration, medicine, and engineering illustrate how AI excels in structured, repeatable tasks, while humans perform better in uncertain and high-stakes environments. A proposed approach emphasizes integrating AI systems with human oversight to leverage computational efficiency while preserving adaptability and creative problem-solving.",
      images: [
        {
          url: "https://via.placeholder.com/800x600/333/fff?text=Image+1",
          caption: "Design concept",
        },
        {
          url: "https://via.placeholder.com/800x600/333/fff?text=Image+2",
          caption: "Prototype",
        },
        {
          url: "https://via.placeholder.com/800x600/333/fff?text=Image+3",
          caption: "Final product",
        },
      ],
      pdfs: [
        {
          name: "Arjun - Scholastic '24.pdf",
          url: "https://drive.google.com/file/d/1uc2ep6vfzeRKHL6XhR2nXwMgHz_cbXUg/view?usp=sharing",
        },
      ],
      stlFile: null,
    },
    {
      id: 2,
      title: "Drones: Evolution, Capabilities, and Future Applications",
      category: "Research",
      thumbnail: "📄",
      description: "OMNI BLOG",
      hasCAD: false, // Show 3D viewer button
      hasDesignProcess: false, // Show design process section
      hasTechnologies: false, // Show technologies section
      hasFeatures: false, // Show key features section
      hasChallenges: false, // Show challenges & solutions
      hasGallery: false, // Show image gallery (auto-detects if images exist)
      hasPDFs: true, // Show PDF section (auto-detects if PDFs exist)
      fullDescription: "place holder",
      images: [
        {
          url: "https://via.placeholder.com/800x600/333/fff?text=Image+1",
          caption: "Design concept",
        },
        {
          url: "https://via.placeholder.com/800x600/333/fff?text=Image+2",
          caption: "Prototype",
        },
        {
          url: "https://via.placeholder.com/800x600/333/fff?text=Image+3",
          caption: "Final product",
        },
      ],
      pdfs: [
        {
          name: "Drones: Evolution, Capabilities, and Future Applications.pdf",
          url: "https://drive.google.com/file/d/1zJbDGDNfPDP1882ryQu1TfbuajNmT6Nc/view?usp=sharing",
        },
      ],
      stlFile: null,
    },
    {
      id: 3,
      title:
        "Investigating the Relationship Between Initial Velocity and Stopping Distance of a Rolling Object",
      category: "Research",
      thumbnail: "📄",
      description: "IB PHYSICS IA",
      hasCAD: false, // Show 3D viewer button
      hasDesignProcess: false, // Show design process section
      hasTechnologies: false, // Show technologies section
      hasFeatures: false, // Show key features section
      hasChallenges: false, // Show challenges & solutions
      hasGallery: false, // Show image gallery (auto-detects if images exist)
      hasPDFs: true, // Show PDF section (auto-detects if PDFs exist)
      fullDescription: "place holder",
      images: [
        {
          url: "https://via.placeholder.com/800x600/333/fff?text=Image+1",
          caption: "Design concept",
        },
        {
          url: "https://via.placeholder.com/800x600/333/fff?text=Image+2",
          caption: "Prototype",
        },
        {
          url: "https://via.placeholder.com/800x600/333/fff?text=Image+3",
          caption: "Final product",
        },
      ],
      pdfs: [
        {
          name: "Investigating the Relationship Between Initial Velocity and Stopping Distance of a Rolling Object.pdf",
          url: "https://drive.google.com/file/d/1VB5-5el0c-3EaR5qWrfkCuQXEm6RiWg_/view?usp=sharing",
        },
      ],
      stlFile: null,
    },
    {
      id: 4,
      title:
        "Artificial Intelligence and the U.S. Economy: Five-Year Scenarios for Labor, Capital, and Ecological Impact",
      category: "Research",
      thumbnail: "📄",
      description: "Journal of Student Research Paper",
      hasCAD: false, // Show 3D viewer button
      hasDesignProcess: false, // Show design process section
      hasTechnologies: false, // Show technologies section
      hasFeatures: false, // Show key features section
      hasChallenges: false, // Show challenges & solutions
      hasGallery: false, // Show image gallery (auto-detects if images exist)
      hasPDFs: true, // Show PDF section (auto-detects if PDFs exist)
      fullDescription: "place holder",
      images: [
        {
          url: "https://via.placeholder.com/800x600/333/fff?text=Image+1",
          caption: "Design concept",
        },
        {
          url: "https://via.placeholder.com/800x600/333/fff?text=Image+2",
          caption: "Prototype",
        },
        {
          url: "https://via.placeholder.com/800x600/333/fff?text=Image+3",
          caption: "Final product",
        },
      ],
      pdfs: [
        {
          name: "JSR AI Manufacturing.pdf",
          url: "https://drive.google.com/file/d/1KNRMS5mNbsGIS5fnG3ODaCxrcZuZCm1E/view?usp=sharing",
        },
      ],
      stlFile: null,
    },
    {
      id: 5,
      title: "Lead Bending Press Modification for Legacy IC Packaging Systems",
      category: "Research",
      thumbnail: "📄",
      description: "Independent Publication",
      hasCAD: false, // Show 3D viewer button
      hasDesignProcess: false, // Show design process section
      hasTechnologies: false, // Show technologies section
      hasFeatures: false, // Show key features section
      hasChallenges: false, // Show challenges & solutions
      hasGallery: false, // Show image gallery (auto-detects if images exist)
      hasPDFs: true, // Show PDF section (auto-detects if PDFs exist)
      fullDescription: "place holder",
      images: [
        {
          url: "https://via.placeholder.com/800x600/333/fff?text=Image+1",
          caption: "Design concept",
        },
        {
          url: "https://via.placeholder.com/800x600/333/fff?text=Image+2",
          caption: "Prototype",
        },
        {
          url: "https://via.placeholder.com/800x600/333/fff?text=Image+3",
          caption: "Final product",
        },
      ],
      pdfs: [
        {
          name: "Lead_Bending_Design_Report.pdf",
          url: "https://drive.google.com/file/d/1ecIrSu92kPwKj21kk-grio0wYt_Amajp/view?usp=sharing",
        },
      ],
      stlFile: null,
    },
    {
      id: 6,
      title: "Design Tech",
      category: "International Baccalaureate",
      thumbnail: "📄",
      description: "",
      hasCAD: false, // Show 3D viewer button
      hasDesignProcess: false, // Show design process section
      hasTechnologies: false, // Show technologies section
      hasFeatures: false, // Show key features section
      hasChallenges: false, // Show challenges & solutions
      hasGallery: false, // Show image gallery (auto-detects if images exist)
      hasPDFs: true, // Show PDF section (auto-detects if PDFs exist)
      fullDescription: "place holder",
      images: [
        {
          url: "https://via.placeholder.com/800x600/333/fff?text=Image+1",
          caption: "Design concept",
        },
        {
          url: "https://via.placeholder.com/800x600/333/fff?text=Image+2",
          caption: "Prototype",
        },
        {
          url: "https://via.placeholder.com/800x600/333/fff?text=Image+3",
          caption: "Final product",
        },
      ],
      pdfs: [
        {
          name: "Criterion A.pdf",
          url: "https://drive.google.com/file/d/120MEMVQTDZwmLbI7UXh1tObnVo9g8Oh8/view?usp=sharing",
        },
        {
          name: "Criterion B.pdf",
          url: "https://drive.google.com/file/d/1TFutf1IV6aEk9rBKyBZmYup-SZQJsS4O/view?usp=sharing",
        },
        {
          name: "Criterion C.pdf",
          url: "https://drive.google.com/file/d/18MKyv0isHtHrdx7DgB2XeJQatSvrm_gK/view?usp=sharing",
        },
        {
          name: "Criterion D.pdf",
          url: "https://drive.google.com/file/d/1ePvsfa9M70u4tGl5_neJystbBHTGBQu1/view?usp=sharing",
        },
      ],
      stlFile: null,
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4">Projects</h1>
        <p className="text-xl text-gray-300 mb-12">
          Explore my work in STEM and making
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-gray-900 overflow-hidden border border-gray-800 hover:border-white transition-all duration-300 cursor-pointer transform hover:-translate-y-2 min-h-[400px]"
              onClick={() => onSelectProject(project)}
            >
              <div className="p-8">
                <div className="text-8xl mb-6 text-center">
                  {project.thumbnail}
                </div>
                <div className="text-sm text-gray-400 mb-2">
                  {project.category}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-400">{project.description}</p>
                <div className="mt-4 text-white group-hover:text-gray-300 transition-colors">
                  Click to view details →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in;
        }
        .duration-2000 {
          transition-duration: 2000ms;
        }
      `}</style>
    </div>
  );
}

function ProjectDetailPage({ project, onBack }) {
  const [viewerWindow, setViewerWindow] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [windowPos, setWindowPos] = useState({ x: 100, y: 100 });
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(
              (prev) => new Set([...prev, entry.target.dataset.section])
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-section]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleMouseDown = (e) => {
    if (e.target.classList.contains("drag-handle")) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - windowPos.x,
        y: e.clientY - windowPos.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setWindowPos({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const openViewer = () => {
    setViewerWindow(project);
    setWindowPos({
      x: window.innerWidth / 2 - 300,
      y: window.innerHeight / 2 - 250,
    });
  };

  return (
    <div className="min-h-screen px-6 py-12 animate-fadeIn">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 text-white hover:text-gray-300 flex items-center gap-2 transition-colors"
        >
          ← Back to Projects
        </button>

        {/* Project Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visibleSections.has("header")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          data-section="header"
        >
          <div className="text-9xl mb-6">{project.thumbnail}</div>
          <div className="text-sm text-gray-400 mb-2">{project.category}</div>
          <h1 className="text-5xl font-bold text-white mb-4">
            {project.title}
          </h1>
        </div>

        {/* Project Overview Card */}
        <div
          className={`bg-gray-900 p-8 border border-gray-800 mb-8 transition-all duration-700 delay-100 ${
            visibleSections.has("overview")
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-20"
          }`}
          data-section="overview"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            About This Project
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            {project.fullDescription}
          </p>

          {project.hasCAD && (
            <button
              onClick={openViewer}
              className="bg-white hover:bg-gray-200 text-black px-8 py-3 font-semibold transition-colors text-lg"
            >
              Open 3D Viewer
            </button>
          )}
        </div>

        {/* Design Process Card */}
        {project.hasDesignProcess && (
          <div
            className={`bg-gray-900 p-8 border border-gray-800 mb-8 transition-all duration-700 delay-200 ${
              visibleSections.has("process")
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-20"
            }`}
            data-section="process"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Design Process
            </h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-4">
                <div className="text-2xl">1️⃣</div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Concept & Research
                  </h3>
                  <p>Initial ideation and requirements gathering phase.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">2️⃣</div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Design & Prototyping
                  </h3>
                  <p>CAD modeling and initial prototype development.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">3️⃣</div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    Testing & Iteration
                  </h3>
                  <p>Real-world testing and design refinements.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Technical Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {project.hasTechnologies && (
            <div
              className={`bg-gray-900 p-6 border border-gray-800 transition-all duration-700 delay-300 ${
                visibleSections.has("tech")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
              data-section="tech"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                Technologies Used
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• CAD Software (Fusion 360, SolidWorks)</li>
                <li>• 3D Printing (FDM/SLA)</li>
                <li>• Microcontrollers (Arduino, ESP32)</li>
                <li>• Programming (Python, C++)</li>
              </ul>
            </div>
          )}

          {project.hasFeatures && (
            <div
              className={`bg-gray-900 p-6 border border-gray-800 transition-all duration-700 delay-400 ${
                visibleSections.has("features")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
              data-section="features"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                Key Features
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Custom engineered components</li>
                <li>• Optimized for performance</li>
                <li>• Modular design approach</li>
                <li>• Real-world tested solution</li>
              </ul>
            </div>
          )}
        </div>

        {/* Challenges & Solutions Card */}
        {project.hasChallenges && (
          <div
            className={`bg-gray-900 p-8 border border-gray-800 mb-8 transition-all duration-700 delay-500 ${
              visibleSections.has("challenges")
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-20"
            }`}
            data-section="challenges"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Challenges & Solutions
            </h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="font-semibold text-white mb-2">
                  Challenge: Design Constraints
                </h3>
                <p>
                  Solution: Iterative prototyping and testing led to an optimal
                  design balance.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">
                  Challenge: Manufacturing Complexity
                </h3>
                <p>
                  Solution: Simplified assembly process with modular components.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Image Gallery */}
        {project.hasGallery && project.images && project.images.length > 0 && (
          <div
            className={`mb-8 transition-all duration-700 delay-600 ${
              visibleSections.has("gallery")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
            data-section="gallery"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              Project Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.images.map((image, idx) => (
                <div
                  key={idx}
                  className="bg-gray-900 border-2 border-gray-800 overflow-hidden cursor-pointer hover:border-white transition-all duration-300 group relative"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                    <div className="text-white text-4xl">🔍</div>
                  </div>
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="p-4 bg-gray-900">
                    <p className="text-gray-300 text-sm">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PDF Documents */}
        {project.pdfs && project.pdfs.length > 0 && (
          <div
            className={`mb-8 transition-all duration-700 delay-700 ${
              visibleSections.has("docs")
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-20"
            }`}
            data-section="docs"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              Project Files
            </h2>
            <div className="space-y-3">
              {project.pdfs.map((pdf, idx) => (
                <a
                  key={idx}
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 border border-gray-800 p-4 hover:border-white transition-colors flex items-center justify-between group block"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">📄</div>
                    <div>
                      <p className="text-white font-semibold group-hover:text-gray-300 transition-colors">
                        {pdf.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Click to open in new tab
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-white transition-colors">
                    ↗
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 text-white text-5xl hover:text-gray-300 z-10 w-16 h-16 flex items-center justify-center border-2 border-white hover:bg-white hover:text-black transition-colors"
            >
              ×
            </button>
            <div className="flex items-center justify-center max-w-7xl max-h-[85vh]">
              <img
                src={selectedImage.url}
                alt={selectedImage.caption}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="mt-6 bg-black/80 px-8 py-4 border border-white">
              <p className="text-white text-xl">{selectedImage.caption}</p>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Click anywhere or press X to close
            </p>
          </div>
        </div>
      )}

      {/* Draggable 3D Viewer Window */}
      {viewerWindow && (
        <div
          className="fixed bg-gray-900 border-2 border-white shadow-2xl z-50"
          style={{
            left: `${windowPos.x}px`,
            top: `${windowPos.y}px`,
            width: "600px",
            height: "500px",
          }}
          onMouseDown={handleMouseDown}
        >
          {/* Window Header - Draggable */}
          <div className="drag-handle bg-black px-4 py-3 border-b border-gray-800 flex justify-between items-center cursor-move">
            <div>
              <h3 className="text-white font-semibold">{viewerWindow.title}</h3>
              <p className="text-xs text-gray-400">3D CAD Viewer</p>
            </div>
            <button
              onClick={() => setViewerWindow(null)}
              className="text-gray-400 hover:text-white text-2xl leading-none px-2"
            >
              ×
            </button>
          </div>

          {/* 3D Viewer Content */}
          <div className="p-4 h-[calc(100%-60px)]">
            <div className="w-full h-full bg-black flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-6xl mb-4">{viewerWindow.thumbnail}</div>
                <p>3D STL Viewer will be here</p>
                <p className="text-sm mt-2">
                  Drag the header to move this window
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in;
        }
        .drag-handle {
          user-select: none;
        }
      `}</style>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen px-6 py-12 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-8">About Me</h1>
        <p className="text-xl text-gray-300 leading-relaxed">
          Content about your background, interests, and passion for STEM and
          making will go here...
        </p>
      </div>
    </div>
  );
}

function SkillsPage() {
  return (
    <div className="min-h-screen px-6 py-12 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-8">Skills</h1>
        <p className="text-xl text-gray-300 mb-8">
          Technical skills and tools you work with...
        </p>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="min-h-screen px-6 py-12 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-8">Contact</h1>
        <p className="text-xl text-gray-300 mb-8">Get in touch with me...</p>
      </div>
    </div>
  );
}
