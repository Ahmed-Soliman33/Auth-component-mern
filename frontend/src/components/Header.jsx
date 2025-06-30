import images from "../content/images.json";
// import logo from "../assets/logo.jpg";
import { getImageUrl } from "@/utils/imageLoader";

export default function Header() {
  console.log(getImageUrl(images.logo.src));
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
