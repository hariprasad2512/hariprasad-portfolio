export default function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 py-6">
      <a href="#" className="text-lg font-bold tracking-tight">
        Hariprasad Anuganti<span className="text-slate-400">.</span>
      </a>

      <nav className="flex gap-5 text-sm text-slate-600">
        <a href="#work" className="hover:text-black">
          Work
        </a>
        <a href="#experience" className="hover:text-black">
          Experience
        </a>
        <a href="#about" className="hover:text-black">
          About
        </a>
        <a href="#contact" className="hover:text-black">
          Contact
        </a>
      </nav>
    </header>
  );
}
