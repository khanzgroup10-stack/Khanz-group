import React, { useState } from 'react';
import { KhanzLogo } from './KhanzLogo';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    {
      name: 'Our Businesses',
      href: '#businesses',
      dropdown: [
        { name: 'Voyant Eye', path: '/divisions/voyant-eye' },
        { name: 'Crypfo', path: '/divisions/crypfo' },
        { name: "That's It", path: '/divisions/thats-it' },
        { name: 'Minal Collection', path: '/divisions/minal' },
        { name: 'Kash Medical Complex', path: '#' },
        { name: 'Food Business', path: '#' },
        { name: 'Khanz Housing Society', path: '#' },
        { name: 'Kash Electronics', path: '/divisions/kash-electronics' },
        { name: 'Khanz Motors', path: '/divisions/khanz-motors' },
        { name: 'Coming Soon...', path: '#', isComingSoon: true }
      ]
    },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header id="main-navbar" className="w-full bg-transparent relative z-50">
      <div className="w-full px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between h-20 sm:h-24">

          {/* Logo on Left */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#home" id="navbar-logo" aria-label="KHANZ Group of Companies Logo">
              <KhanzLogo className="h-10 sm:h-12 md:h-14 w-auto" />
            </a>
          </div>

          {/* Navigation Links on Right (White text, no background) */}
          <nav
            id="navbar-links-desktop"
            className="hidden md:flex items-center space-x-8 lg:space-x-10"
            aria-label="Navbar Navigation"
          >
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <a
                  id={`navbar-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  href={link.href}
                  className="text-white hover:text-gray-200 text-base lg:text-lg font-semibold tracking-wide transition-colors duration-200 py-6 inline-flex items-center gap-1"
                >
                  {link.name}
                  {link.dropdown && (
                    <ChevronDown className="w-4 h-4 text-yellow-500 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </a>

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <div className="absolute top-full left-0 mt-0 w-64 bg-black/95 backdrop-blur-md border border-yellow-500/20 border-l-4 border-l-yellow-500 rounded-b-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
                    <ul className="py-2">
                      {link.dropdown.map((item) => {
                        if (item.isComingSoon) {
                          return (
                            <li key={item.name}>
                              <span className="block px-5 py-2.5 text-sm text-gray-400 italic pointer-events-none">
                                {item.name}
                              </span>
                            </li>
                          );
                        }

                        if (item.path !== '#') {
                          return (
                            <li key={item.name}>
                              <Link
                                to={item.path}
                                className="block px-5 py-2.5 text-sm text-white hover:text-yellow-400 hover:bg-white/5 transition-colors duration-200"
                              >
                                {item.name}
                              </Link>
                            </li>
                          );
                        }

                        return (
                          <li key={item.name}>
                            <a
                              href="#"
                              className="block px-5 py-2.5 text-sm text-white/60 cursor-not-allowed transition-colors duration-200"
                              onClick={(e) => e.preventDefault()}
                            >
                              {item.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              id="navbar-mobile-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-gray-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div id="navbar-mobile-menu" className="md:hidden px-6 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <div key={link.name}>
              <a
                id={`mobile-navbar-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.href}
                onClick={() => !link.dropdown && setMobileMenuOpen(false)}
                className="block text-white hover:text-gray-200 text-lg font-semibold py-2"
              >
                {link.name}
              </a>
              {link.dropdown && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-yellow-500/50">
                  {link.dropdown.map((item) => {
                    if (item.isComingSoon) {
                      return (
                        <div key={item.name}>
                          <span className="block text-sm text-gray-400 italic py-1">
                            {item.name}
                          </span>
                        </div>
                      );
                    }

                    if (item.path !== '#') {
                      return (
                        <div key={item.name}>
                          <Link
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-sm text-gray-200 hover:text-yellow-400 py-1 transition-colors"
                          >
                            {item.name}
                          </Link>
                        </div>
                      );
                    }

                    return (
                      <div key={item.name}>
                        <a
                          href="#"
                          className="block text-sm text-gray-200/50 cursor-not-allowed py-1 transition-colors"
                          onClick={(e) => e.preventDefault()}
                        >
                          {item.name}
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};
