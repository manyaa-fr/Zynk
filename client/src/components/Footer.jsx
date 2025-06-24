const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 to-indigo-900 text-white py-10 mt-16">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg font-semibold">© 2023 EventVista. All rights reserved.</p>
        <div className="mt-6 flex justify-center space-x-8">
          <a href="#" className="hover:text-indigo-300 transition">Terms</a>
          <a href="#" className="hover:text-indigo-300 transition">Privacy</a>
          <a href="#" className="hover:text-indigo-300 transition" aria-label="Twitter">
            <svg className="w-5 h-5 inline" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0016.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.762.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 01-2.237-.616c-.054 1.997 1.397 3.872 3.448 4.29a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0024 4.557z" /></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;