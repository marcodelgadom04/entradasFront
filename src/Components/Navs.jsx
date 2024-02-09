import { Link } from "react-router-dom";

const Navs = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{backgroundColor: '#e3f2fd'}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Demo Entradas
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/entradas" className="nav-link">
                Entradas
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navs;
