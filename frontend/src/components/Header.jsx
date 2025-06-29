import images from "../content/images.json";

export default function Header() {
  console.log(images);
  return (
    <header>
      <img
        src={`${images.logo.src}`}
        className="mx-auto"
        alt="A form and a pencil"
      />
      <h1>React Forms</h1>
    </header>
  );
}
