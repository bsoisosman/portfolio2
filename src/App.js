import React, { useState, useEffect, useRef } from "react";

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    setAnimationComplete(true);
    setShowHero(true);
    window.sessionAnimationShown = true;
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {showHero && (
        <div className="opacity-100">
          <nav className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setCurrentPage("home");
                  }}
                  className="text-xl font-bold text-white hover:text-gray-300 transition-colors"
                >
                  Portfolio
                </button>
                <div className="flex gap-8">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setCurrentPage("writing");
                    }}
                    className={`${
                      currentPage === "writing" ||
                      currentPage === "writing-detail"
                        ? "text-white"
                        : "text-gray-400"
                    } hover:text-white transition-colors`}
                  >
                    Writing
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setCurrentPage("projects");
                    }}
                    className={`${
                      currentPage === "projects" ||
                      currentPage === "projects-detail"
                        ? "text-white"
                        : "text-gray-400"
                    } hover:text-white transition-colors`}
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setCurrentPage("internship");
                    }}
                    className={`${
                      currentPage === "internship" ||
                      currentPage === "internship-detail"
                        ? "text-white"
                        : "text-gray-400"
                    } hover:text-white transition-colors`}
                  >
                    Internship
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setCurrentPage("rocketry");
                    }}
                    className={`${
                      currentPage === "rocketry" ||
                      currentPage === "rocketry-detail"
                        ? "text-white"
                        : "text-gray-400"
                    } hover:text-white transition-colors`}
                  >
                    Rocketry
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      setCurrentPage("contact");
                    }}
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

          <div className="pt-20">
            {currentPage === "home" && <HomePage onNavigate={setCurrentPage} />}
            {currentPage === "writing" && (
              <WritingPage
                onSelectProject={(p) => {
                  setSelectedProject(p);
                  setCurrentPage("writing-detail");
                }}
              />
            )}
            {currentPage === "writing-detail" && selectedProject && (
              <ProjectDetailPage
                project={selectedProject}
                onBack={() => {
                  setSelectedProject(null);
                  setCurrentPage("writing");
                }}
              />
            )}
            {currentPage === "projects" && (
              <ProjectsPage
                onSelectProject={(p) => {
                  setSelectedProject(p);
                  setCurrentPage("projects-detail");
                }}
              />
            )}
            {currentPage === "projects-detail" && selectedProject && (
              <ProjectDetailPage
                project={selectedProject}
                onBack={() => {
                  setSelectedProject(null);
                  setCurrentPage("projects");
                }}
              />
            )}
            {currentPage === "internship" && (
              <InternshipPage
                onSelectProject={(p) => {
                  setSelectedProject(p);
                  setCurrentPage("internship-detail");
                }}
              />
            )}
            {currentPage === "internship-detail" && selectedProject && (
              <ProjectDetailPage
                project={selectedProject}
                onBack={() => {
                  setSelectedProject(null);
                  setCurrentPage("internship");
                }}
              />
            )}
            {currentPage === "rocketry" && (
              <RocketryPage
                onSelectProject={(p) => {
                  setSelectedProject(p);
                  setCurrentPage("rocketry-detail");
                }}
              />
            )}
            {currentPage === "rocketry-detail" && selectedProject && (
              <ProjectDetailPage
                project={selectedProject}
                onBack={() => {
                  setSelectedProject(null);
                  setCurrentPage("rocketry");
                }}
              />
            )}
            {currentPage === "about" && <AboutPage />}
            {currentPage === "contact" && <ContactPage />}
          </div>
        </div>
      )}
    </div>
  );
}

function HomePage({ onNavigate }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-4xl">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
          Arjun Reddy
        </h1>
        <p className="text-2xl md:text-3xl text-gray-300 mb-8">
          Troy Tech High School Student & IB Diploma Candidate
        </p>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Passionate about Aerospace, Robotics, Engineering, Physics and
          Astronomy
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onNavigate("writing")}
            className="px-8 py-3 bg-white hover:bg-gray-200 text-black font-semibold transition-colors"
          >
            View Writing
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

const writingProjects = [
  {
    id: 1,
    title:
      "The Bottleneck of Innovation: Hardware, Software and the Limits of Human Ingenuity",
    category: "Research",
    thumbnail: "📄",
    description: "Scholastic '24",
    fullDescription:
      "The limits of artificial intelligence are examined by contrasting computational accuracy with human creativity and adaptability.",
    pdfs: [
      {
        name: "Arjun - Scholastic '24.pdf",
        url: "https://drive.google.com/file/d/1uc2ep6vfzeRKHL6XhR2nXwMgHz_cbXUg/view?usp=sharing",
      },
    ],
  },
  {
    id: 2,
    title: "Drones: Evolution, Capabilities, and Future Applications",
    category: "Research",
    thumbnail: "📄",
    description: "OMNI BLOG",
    fullDescription:
      "An exploration of drone technology, from historical development to modern applications.",
    pdfs: [
      {
        name: "Drones Paper.pdf",
        url: "https://drive.google.com/file/d/1zJbDGDNfPDP1882ryQu1TfbuajNmT6Nc/view?usp=sharing",
      },
    ],
  },
  {
    id: 3,
    title:
      "Investigating the Relationship Between Initial Velocity and Stopping Distance",
    category: "Research",
    thumbnail: "📄",
    description: "IB Physics IA",
    fullDescription:
      "A physics investigation examining how initial velocity affects stopping distance.",
    pdfs: [
      {
        name: "Physics IA.pdf",
        url: "https://drive.google.com/file/d/1VB5-5el0c-3EaR5qWrfkCuQXEm6RiWg_/view?usp=sharing",
      },
    ],
  },
  {
    id: 4,
    title: "AI and the U.S. Economy: Five-Year Scenarios",
    category: "Research",
    thumbnail: "📄",
    description: "Journal of Student Research",
    fullDescription:
      "Analysis of AI's impact on labor, capital, and ecological factors.",
    pdfs: [
      {
        name: "JSR AI Manufacturing.pdf",
        url: "https://drive.google.com/file/d/1KNRMS5mNbsGIS5fnG3ODaCxrcZuZCm1E/view?usp=sharing",
      },
    ],
  },
  {
    id: 5,
    title: "Lead Bending Press Modification for Legacy IC Packaging",
    category: "Research",
    thumbnail: "📄",
    description: "Independent Publication",
    fullDescription: "Engineering design report for IC packaging systems.",
    pdfs: [
      {
        name: "Lead Bending Report.pdf",
        url: "https://drive.google.com/file/d/1ecIrSu92kPwKj21kk-grio0wYt_Amajp/view?usp=sharing",
      },
    ],
  },
];

function WritingPage({ onSelectProject }) {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4">Writing</h1>
        <p className="text-xl text-gray-300 mb-12">
          Research papers and publications
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {writingProjects.map((p) => (
            <div
              key={p.id}
              className="group bg-gray-900 border border-gray-800 hover:border-white transition-all duration-300 cursor-pointer transform hover:-translate-y-2 min-h-[400px]"
              onClick={() => onSelectProject(p)}
            >
              <div className="p-8">
                <div className="text-8xl mb-6 text-center">{p.thumbnail}</div>
                <div className="text-sm text-gray-400 mb-2">{p.category}</div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-gray-400">{p.description}</p>
                <div className="mt-4 text-white group-hover:text-gray-300 transition-colors">
                  Click to view details →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsPage({ onSelectProject }) {
  const projects = [
    {
      id: 1,
      title: "Design Technology Portfolio",
      category: "IB",
      thumbnail: "📄",
      description: "IB Design Tech",
      fullDescription:
        "IB Design Technology coursework and project documentation.",
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
      show3DViewer: false,
    },
    {
      id: 2,
      title: "OMNI Drones",
      thumbnail: "🕹️",
      description: "Drone Design - 3D Models",
      fullDescription: "CAD models and 3D designs for OMNI Drone Initiative.",
      pdfs: [],
      show3DViewer: true,
      models3D: [
        {
          title: "Full Drone Assembly OMNI",
          modelUrl:
            "https://sketchfab.com/models/4a00106acf1949aa8a40e82bf2904fb5/embed",
          viewUrl:
            "https://sketchfab.com/3d-models/full-drone-assembly-omni-4a00106acf1949aa8a40e82bf2904fb5",
        },
        {
          title: "Drone Camera Enclosure OMNI",
          modelUrl:
            "https://sketchfab.com/models/778a201700d2444ba27c51e32da2f03c/embed",
          viewUrl:
            "https://sketchfab.com/3d-models/drone-camera-enclosure-omni-778a201700d2444ba27c51e32da2f03c",
        },
        {
          title: "Drone Assembly OMNI",
          modelUrl:
            "https://sketchfab.com/models/850a45417d7d43d184fa0b1caba203ac/embed",
          viewUrl:
            "https://sketchfab.com/3d-models/drone-assembly-omni-850a45417d7d43d184fa0b1caba203ac",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4">Projects</h1>
        <p className="text-xl text-gray-300 mb-12">
          Engineering and technical projects
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <div
              key={p.id}
              className="group bg-gray-900 border border-gray-800 hover:border-white transition-all duration-300 cursor-pointer transform hover:-translate-y-2 min-h-[400px]"
              onClick={() => onSelectProject(p)}
            >
              <div className="p-8">
                <div className="text-8xl mb-6 text-center">{p.thumbnail}</div>
                <div className="text-sm text-gray-400 mb-2">{p.category}</div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-gray-400">{p.description}</p>
                <div className="mt-4 text-white group-hover:text-gray-300">
                  Click to view details →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InternshipPage({ onSelectProject }) {
  const projects = [
    {
      id: 1,
      title: "3D Models",
      category: "Internship",
      thumbnail: "🖥️",
      description: "CAD Designs for Chip Apparatus",
      fullDescription: "3D CAD models for IC packaging and die attachment apparatus.",
      pdfs: [],
      show3DViewer: true,
      models3D: [
        {
          title: "Flat Lead Package Die Attachments",
          modelUrl:
            "https://sketchfab.com/models/1c5a25dc4b254c40a9e914413f0c9f87/embed",
          viewUrl:
            "https://sketchfab.com/3d-models/68-flat-lead-package-die-attachments-1c5a25dc4b254c40a9e914413f0c9f87",
        },
        {
          title: "MALE DIE MASTER",
          modelUrl:
            "https://sketchfab.com/models/f3751214c800481ab3478c3836003257/embed",
        },
        {
          title: "FEMALE DIE MASTER",
          modelUrl:
            "https://sketchfab.com/models/61c14cc3853e4f31b214502a4530e802/embed",
        },
        {
          title: "MALE DIE (68 FLAT)",
          modelUrl:
            "https://sketchfab.com/models/c296583d43204232a836701282f64470/embed",
        },
        {
          title: "MALE DIE (64 FLAT)",
          modelUrl:
            "https://sketchfab.com/models/a7950a0fa85e41db92452de2158f9178/embed",
        },
        {
          title: "MALE DIE (Ceramic Double)",
          modelUrl:
            "https://sketchfab.com/models/b2e2320350bc445598ed16a91267a460/embed",
        },
        {
          title: "MALE DIE (84 FLAT)",
          modelUrl:
            "https://sketchfab.com/models/d8c43c453c9c4cb6bcb4262c1092739c/embed",
        },
        {
          title: "FEMALE DIE (Ceramic Dual)",
          modelUrl:
            "https://sketchfab.com/models/909ef00379ec45929e5a58e000d75a36/embed",
        },
        {
          title: "FEMALE DIE (64 FLAT)",
          modelUrl:
            "https://sketchfab.com/models/7111e012bf284cb7995b3d485b4aeeee/embed",
        },
        {
          title: "FEMALE DIE (68 FLAT)",
          modelUrl:
            "https://sketchfab.com/models/0441093bf907459989044f8a3a499aff/embed",
        },
        {
          title: "FEMALE DIE (84 FLAT)",
          modelUrl:
            "https://sketchfab.com/models/acdbbb86c2f442429fe786ba80db2900/embed",
        },
      ],
    },
    {
      id: 2,
      title: "Technical Drawings",
      category: "Internship",
      thumbnail: "📐",
      description: "technical drawings (die stamp)",
      fullDescription: "technical drawings (die stamp)",
      showImageGallery: true,
      images: [
        {
          url: "https://drive.google.com/thumbnail?id=1wLGH6kt2pzSLFJH6vKKcWjU3CVcpMtad&sz=w1000",
          caption: "Female Die 64 Flat",
        },
        {
          url: "https://drive.google.com/thumbnail?id=15yFGFkw-DqvB_AEFcpBGCQuhhDPP7b5K&sz=w1000",
          caption: "Female Die 68 Flat",
        },
        {
          url: "https://drive.google.com/thumbnail?id=16og2R0FHP_8L9uRPw-nsotTkZWURDJi7&sz=w1000",
          caption: "Female Die 84 Flat",
        },
        {
          url: "https://drive.google.com/thumbnail?id=1VLLQJZdwd02MuKadIW9SGhQZv68fbCEB&sz=w1000",
          caption: "Female Die Ceramic Dual",
        },
        {
          url: "https://drive.google.com/thumbnail?id=1XMPUvhr3FpODvkCVmuLbwwizBgnrsPMW&sz=w1000",
          caption: "Male Die 64 Flat",
        },
        {
          url: "https://drive.google.com/thumbnail?id=1anwYGh_rf2TUa1pGsZ1IqxwyD3SlDjAT&sz=w1000",
          caption: "Male Die 68 Flat",
        },
        {
          url: "https://drive.google.com/thumbnail?id=1gjLrHp7T4VCKV0I_s7RPLuu8aFCuL2jH&sz=w1000",
          caption: "Male Die 84 Flat",
        },
        {
          url: "https://drive.google.com/thumbnail?id=1hP8BgmiHfxqUW-RzTUN-THACVdcJALPR&sz=w1000",
          caption: "Male Die Ceramic Dual",
        },
      ],
      show3DViewer: false,
    },
    {
      id: 3,
      title: "PCB Design",
      category: "Intership",
      thumbnail: "🔌",
      description: "Primary Connection for UVEX Project",
      fullDescription: "PCB design for the UVEX project.",
      pdfs: [],
      showImageGallery: true,
      images: [
        {
          url: "https://drive.google.com/thumbnail?id=1SkkjyggvqC_XpS1oZTuSV8A8JhVCyw_j&sz=w1000",
          caption: "PCB",
        },
      ],
      show3DViewer: false,
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4">Internship</h1>
        <p className="text-xl text-gray-300 mb-12">
          Professional experience and work
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <div
              key={p.id}
              className="group bg-gray-900 border border-gray-800 hover:border-white transition-all duration-300 cursor-pointer transform hover:-translate-y-2 min-h-[400px]"
              onClick={() => onSelectProject(p)}
            >
              <div className="p-8">
                <div className="text-8xl mb-6 text-center">{p.thumbnail}</div>
                <div className="text-sm text-gray-400 mb-2">{p.category}</div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-gray-400">{p.description}</p>
                <div className="mt-4 text-white group-hover:text-gray-300">
                  Click to view details →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RocketryPage({ onSelectProject }) {
  const projects = [
    {
      id: 1,
      title: "Rocket Fuel",
      category: "Rocketry",
      thumbnail: "🚀",
      description: "Making and Testing Rocket Fuel",
      fullDescription: "Making and Testing Rocket Fuel.",
      pdfs: [],
      showImageGallery: true,
      images: [
        {
          url: "https://drive.google.com/thumbnail?id=105pm2ttlGDJqlORqEXzg-TJAFDQkZuWU&sz=w1000",
          caption: "",
          type: "image",
        },
        {
          url: "https://drive.google.com/thumbnail?id=10adZU9sNHsnq-88Fu3BKNfD0RD68nl7m&sz=w1000",
          caption: "",
          type: "image",
        },
        {
          url: "https://drive.google.com/thumbnail?id=1DCXluAl61HVaIOPlFLym61VQTXAdZuyX&sz=w1000",
          caption: "",
          type: "image",
        },
        {
          url: "https://drive.google.com/thumbnail?id=1Lg5aaz9TAin6boKEyIhZsKuTsXxdpMuC&sz=w1000",
          caption: "",
          type: "image",
        },
        {
          url: "https://drive.google.com/thumbnail?id=1PrClLSHwk_O0judv2tEyfI6Yq9_ExOpA&sz=w1000",
          caption: "",
          type: "image",
        },
        {
          url: "https://drive.google.com/thumbnail?id=1gWZ5yIoBRyd4P1JKHp0Q2rX9weJbIhid&sz=w1000",
          caption: "",
          type: "image",
        },
        {
          url: "https://drive.google.com/thumbnail?id=1h78G_MqCbeakaX-SbbCx4YavUNrxkcUp&sz=w1000",
          caption: "",
          type: "image",
        },
        {
          url: "https://drive.google.com/thumbnail?id=1mXpMkp3KKvB5YLL7qMhEdwTgvd16YlsE&sz=w1000",
          caption: "",
          type: "image",
        },
        {
          url: "https://drive.google.com/thumbnail?id=1yvEWxH_FqYfSrpYfKomeqUgE6OP9oWll&sz=w1000",
          caption: "",
          type: "image",
        },
        {
          url: "https://drive.google.com/file/d/1AoqPvHhuzM0VOYvowLf3J-kYF3YxrXmz/preview",
          caption: "",
          type: "video",
        },
        {
          url: "https://drive.google.com/file/d/1C_fRNonDSQ5pDNJ-1138G_kGFc1i3Yq8/preview",
          caption: "",
          type: "video",
        },
        {
          url: "https://drive.google.com/file/d/1iDyJ004UAjwG6btcP2t3_Se5v-PcPvOT/preview",
          caption: "",
          type: "video",
        },
        {
          url: "https://drive.google.com/file/d/1ii9q67Ft7tnjJBJ4hW_SLkEofS8_Xusb/preview",
          caption: "",
          type: "video",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4">Rocketry</h1>
        <p className="text-xl text-gray-300 mb-12">
          Aerospace and rocketry projects
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <div
              key={p.id}
              className="group bg-gray-900 border border-gray-800 hover:border-white transition-all duration-300 cursor-pointer transform hover:-translate-y-2 min-h-[400px]"
              onClick={() => onSelectProject(p)}
            >
              <div className="p-8">
                <div className="text-8xl mb-6 text-center">{p.thumbnail}</div>
                <div className="text-sm text-gray-400 mb-2">{p.category}</div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-gray-400">{p.description}</p>
                <div className="mt-4 text-white group-hover:text-gray-300">
                  Click to view details →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectDetailPage({ project, onBack }) {
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisibleSections(
              (prev) => new Set([...prev, e.target.dataset.section])
            );
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll("[data-section]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 text-white hover:text-gray-300 flex items-center gap-2"
        >
          ← Back
        </button>
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
        <div
          className={`bg-gray-900 p-8 border border-gray-800 mb-8 transition-all duration-700 ${
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
        </div>

        {project.show3DViewer &&
          project.models3D &&
          project.models3D.length > 0 && (
            <div
              className={`mb-8 transition-all duration-700 ${
                visibleSections.has("3dmodel")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              data-section="3dmodel"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">
                3D Models
              </h2>
              <div className="space-y-6">
                {project.models3D.map((model, i) => (
                  <div key={i}>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {model.title}
                    </h3>
                    <ModelViewer
                      modelUrl={model.modelUrl}
                      viewUrl={model.viewUrl}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        {project.showImageGallery &&
          project.images &&
          project.images.length > 0 && (
            <div
              className={`mb-8 transition-all duration-700 ${
                visibleSections.has("images")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              data-section="images"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">
                Project Images
              </h2>
              <ImageGallery images={project.images} />
            </div>
          )}

        {project.pdfs && project.pdfs.length > 0 && (
          <div
            className={`mb-8 transition-all duration-700 ${
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
              {project.pdfs.map((pdf, i) => (
                <a
                  key={i}
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 border border-gray-800 p-4 hover:border-white transition-colors flex items-center justify-between group block"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">📄</div>
                    <div>
                      <p className="text-white font-semibold group-hover:text-gray-300">
                        {pdf.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Click to open in new tab
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-white">↗</div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ModelViewer({ modelUrl, viewUrl }) {
  return (
    <div className="sketchfab-embed-wrapper bg-gray-900 border border-gray-800 overflow-hidden mb-6">
      <iframe
        title="3D Model"
        frameBorder="0"
        allowFullScreen
        src={modelUrl}
        className="w-full h-[500px]"
      />
      <div className="p-4 bg-gray-800 text-gray-300 text-sm">
        <p>🖱️ Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
}

function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="bg-gray-900 border border-gray-800 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, i) => (
            <div
              key={i}
              className="group relative overflow-hidden bg-gray-800 border border-gray-700 hover:border-white transition-all cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              {image.type === "video" ? (
                <div className="relative w-full h-64 bg-gray-900">
                  <img
                    src={`https://drive.google.com/thumbnail?id=${
                      image.url.split("/d/")[1].split("/")[0]
                    }&sz=w400`}
                    alt={image.caption || `Video ${i + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="text-6xl text-white drop-shadow-lg"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                    <span className="text-white text-sm">
                      Click to play video
                    </span>
                  </div>
                </div>
              ) : (
                <img
                  src={image.url}
                  alt={image.caption || `Image ${i + 1}`}
                  className="w-full h-64 object-cover"
                />
              )}
              {image.caption && (
                <div className="p-3 bg-gray-800">
                  <p className="text-gray-300 text-sm">{image.caption}</p>
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                <span className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity">
                  {image.type === "video" ? "▶️" : "🔍"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center p-8 overflow-y-auto"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
          >
            ✕
          </button>
          <div
            className="flex flex-col items-center max-h-full w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedImage.type === "video" ? (
              <iframe
                src={selectedImage.url}
                className="w-full aspect-video"
                style={{ maxHeight: "85vh" }}
                allow="autoplay"
                allowFullScreen
              />
            ) : (
              <img
                src={selectedImage.url}
                alt={selectedImage.caption || "Enlarged view"}
                className="max-w-full max-h-[85vh] object-contain"
              />
            )}
            {selectedImage.caption && (
              <div className="text-center mt-4 text-white text-lg bg-black bg-opacity-50 px-4 py-2 rounded">
                {selectedImage.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-8">About Me</h1>
        <p className="text-xl text-gray-300">Content about you goes here...</p>
      </div>
    </div>
  );
}

function ContactPage() {
  const contactInfo = [
    {
      icon: "📧",
      label: "Email",
      value: "Arjunreddy0221@gmail.com",
      href: "mailto:Arjunreddy0221@gmail.com",
      type: "email",
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "arjunreddy08",
      href: "https://www.linkedin.com/in/arjunreddy08",
      type: "link",
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-8">Contact</h1>
        <p className="text-xl text-gray-300 mb-12">
          Get in touch through any of these channels:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contactInfo.map((contact, i) => (
            <a
              key={i}
              href={contact.href}
              target={contact.type === "link" ? "_blank" : "_self"}
              rel={contact.type === "link" ? "noopener noreferrer" : ""}
              className="group bg-gray-900 border border-gray-800 hover:border-white p-8 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-6xl mb-4">{contact.icon}</div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                {contact.label}
              </h2>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                {contact.value}
              </p>
              <p className="text-gray-400 text-sm mt-3">
                {contact.type === "link" ? "Open in new tab →" : "Click to email →"}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
