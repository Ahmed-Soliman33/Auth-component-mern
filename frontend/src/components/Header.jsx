import images from "../content/images.json";
import logo from "../assets/logo.jpg";

export default function Header() {
  return (
    <header>
      <img
        src={images.logo.src || logo}
        className="mx-auto"
        alt="A form and a pencil"
      />
      <h1>React Forms</h1>
    </header>
  );
}
