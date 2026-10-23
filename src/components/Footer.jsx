
export default function Footer() {
  return (
    <footer className="site-footer page-shell">
      <a href="#" className="wordmark">
        KK's Canvas<span>®</span>
      </a>

      <p>Independent design. Different perspectives.</p>

      <div className="footer-links">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
        >
          Instagram ↗
        </a>
        <a
          href="https://www.behance.net/"
          target="_blank"
          rel="noreferrer"
        >
          Behance ↗
        </a>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
