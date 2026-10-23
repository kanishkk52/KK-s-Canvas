
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ theme, onToggleTheme }) {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");

  const isWorkPage =
    location.pathname === "/work" ||
    location.pathname.startsWith("/work/");

  useEffect(() => {
    if (isWorkPage) {
      setActiveSection("work");
      return;
    }

    const sectionIds = ["selected-work", "about", "contact"];
    let observer;

    const updateActiveSection = () => {
      const hash = window.location.hash.replace("#", "");

      if (hash === "about" || hash === "contact") {
        setActiveSection(hash);
      } else {
        setActiveSection("home");
      }
    };

    const frame = requestAnimationFrame(() => {
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      if (!sections.length) {
        updateActiveSection();
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          const visibleSections = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) =>
                b.intersectionRatio - a.intersectionRatio
            );

          if (visibleSections.length > 0) {
  const sectionId = visibleSections[0].target.id;

  setActiveSection(
    sectionId === "selected-work" ? "work" : sectionId
  );
} else {
  const selectedWork = document.getElementById("selected-work");
  const about = document.getElementById("about");
  const contact = document.getElementById("contact");

  const threshold = window.innerHeight * 0.4;

  const selectedWorkTop = selectedWork?.getBoundingClientRect().top;
  const aboutTop = about?.getBoundingClientRect().top;
  const contactTop = contact?.getBoundingClientRect().top;

  if (contactTop != null && contactTop <= threshold) {
    setActiveSection("contact");
  } else if (aboutTop != null && aboutTop <= threshold) {
    setActiveSection("about");
  } else if (
    selectedWorkTop != null &&
    selectedWorkTop <= threshold
  ) {
    setActiveSection("work");
  } else {
    setActiveSection("home");
  }
}
        },
        {
          root: null,
          rootMargin: "-20% 0px -55% 0px",
          threshold: [0, 0.1, 0.25, 0.5],
        }
      );

      sections.forEach((section) => observer.observe(section));
      updateActiveSection();
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [isWorkPage, location.pathname, location.hash]);

  const navClass = (section) =>
    activeSection === section ? "nav-active" : "";

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <Link className="wordmark" to="/">
          KK's Canvas<span>®</span>
        </Link>

        <span className="nav-note">
          Independent Graphic Designer
        </span>

        <div className="nav-links">
          <Link to="/" className={navClass("home")}>
            Home
          </Link>

          <Link to="/work" className={navClass("work")}>
            Work
          </Link>

          <Link to="/#about" className={navClass("about")}>
            About
          </Link>

          <Link to="/#contact" className={navClass("contact")}>
            Contact
          </Link>

          <Link
            to="/#contact"
            className="availability"
          >
            <span className="availability-dot" />
            Available for projects
          </Link>

          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } theme`}
            title={`Switch to ${
              theme === "light" ? "dark" : "light"
            } theme`}
          >
            <span aria-hidden="true">
              {theme === "light" ? "☾" : "☀"}
            </span>

            <span className="theme-toggle-label">
              {theme === "light" ? "Dark" : "Light"}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
