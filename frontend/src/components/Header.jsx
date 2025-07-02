import logoImg from "../assets/logo.jpg";

export default function Header() {
  return (
    <header>
      <img src={logoImg} className="mx-auto" alt="A form and a pencil" />
      <h1>React Forms</h1>
    </header>
  );
}
import images from "../content/images.json";
import { getImageUrl } from "@/utils/imageLoader";

export default function Header() {
  return (
    <header>
      <img
        src={getImageUrl(images.logo.src)}
        className="mx-auto"
        alt="A form and a pencil"
      />
      <h1>React Forms</h1>
    </header>
  );
}
