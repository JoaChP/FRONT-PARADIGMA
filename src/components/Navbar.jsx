const Navbar = () => (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Project Name</h1>
        <nav className="space-x-4">
          <a href="#home" className="text-gray-600 hover:text-primary transition">Home</a>
          <a href="#about" className="text-gray-600 hover:text-primary transition">About</a>
          <a href="#contact" className="text-gray-600 hover:text-primary transition">Contact</a>
        </nav>
      </div>
    </header>
  );
  
  export default Navbar;
  