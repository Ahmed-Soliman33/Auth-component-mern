import logoImg from "../assets/logo.jpg";

export default function Header() {
  return (
    <header>
      <img src={logoImg} className="mx-auto" alt="A form and a pencil" />
      <h1>React Forms</h1>
    </header>
  );
}
