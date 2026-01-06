import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import styles from "./Header.module.css";
import MobileSidebar from "../Sidebar/MobileSidebar";

function Header({
  simplifiedMode = false,
  onMenuToggle,
  menuOpen = false,
  menuAriaControls,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const goHomeOrScrollTop = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
    navigate("/");
  };

  const goToLandingSection = (sectionId) => {
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate("/", { state: { scrollTo: sectionId } });
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <>
      <header
        className={`${styles.headerTop} ${
          simplifiedMode && onMenuToggle ? styles.headerAdmin : ""
        }`}
      >
        <div className={styles.logoContainer} onClick={goHomeOrScrollTop}>
          <div className={styles.logo}>MultiAlmeida</div>
          <h2 className={styles.subtitle}>MultiPix</h2>
        </div>

        {!simplifiedMode && (
          <nav className={styles.desktopNav}>
            <button onClick={goHomeOrScrollTop} className={styles.navLink}>
              Início
            </button>
            <button
              className={styles.navLink}
              onClick={() => goToLandingSection("how")}
            >
              Como funciona
            </button>
            <button
              className={styles.navLink}
              onClick={() => goToLandingSection("features")}
            >
              Recursos
            </button>
            <button
              className={styles.navLink}
              onClick={() => goToLandingSection("contact")}
            >
              Contato
            </button>
          </nav>
        )}

        <div
          className={`${styles.actionsContainer} ${
            simplifiedMode ? styles.actionsAlways : ""
          }`}
        >
          <button
            className={styles.iconButton}
            onClick={toggleTheme}
            title={theme === "dark" ? "Modo Claro" : "Modo Escuro"}
            aria-label="Alternar tema"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {!simplifiedMode && (
            <>
              <button className={styles.ctaSecondaryButton} onClick={() => { window.scrollTo(0, 0); navigate("/criar-conta"); }}>
                Criar conta
              </button>
              <button className={styles.ctaButton} onClick={() => { window.scrollTo(0, 0); navigate("/login"); }}>
                Entrar
              </button>
            </>
          )}
        </div>

        {simplifiedMode && onMenuToggle ? (
          <button
            className={`${styles.mobileMenuButton} ${
              menuOpen ? styles.menuOpen : ""
            } ${styles.menuButtonAlways}`}
            onClick={onMenuToggle}
            aria-label="Alternar menu"
            aria-expanded={menuOpen}
            aria-controls={menuAriaControls}
          >
            <FaBars />
          </button>
        ) : null}

        {!simplifiedMode && (
          <button
            className={`${styles.mobileMenuButton} ${
              isMobileSidebarOpen ? styles.menuOpen : ""
            }`}
            onClick={toggleMobileSidebar}
          >
            {isMobileSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}
      </header>

      {!simplifiedMode && (
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={closeMobileSidebar}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
    </>
  );
}

export default Header;