import { useNavigate } from "react-router-dom";
import { navPages } from "./navData/NavBarPages";
import logo from "../assets/pill.png";
import styles from "../styles/Nav.module.css";

function NavHeader() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="border rounded-md bg-white flex flex-row justify-between p-4 items-center shadow-md w-[full] h-[10%] relative overflow-y-auto">
      <a href="/homepage">
        <div className="flex flex-row items-center gap-4 justify-between">
          <img src={logo} className="h-8 justify-self-center" alt="logo" />
          <h3 className="font-mono text-xl">Gestão de Receitas</h3>
        </div>
      </a>
      <div>
        {navPages.map((val, key) => (
          <a
            key={key}
            href={val.link}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(val.link);
            }}
            className={`${styles.navLink} ${
              window.location.pathname === val.link ? styles.active : ""
            }`}
          >
            {val.title}
          </a>
        ))}
      </div>
    </div>
  );
}

export default NavHeader;
