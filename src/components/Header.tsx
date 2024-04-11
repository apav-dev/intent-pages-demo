import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { formatPhoneNumber } from "react-phone-number-input";
import { Image } from "@yext/pages-components";
import { Link } from "@yext/pages-components";
import { Search } from "lucide-react";

export interface HeaderProps {
  data?: any;
}

let navigation = [
  // { name: "About", href: "#about" },
  // { name: "Hours", href: "#hours" },
  // { name: "Gallery", href: "#gallery" },
  // { name: "Contact", href: "#contact" },
];

const Header = ({ data }: HeaderProps) => {

  let phone = "+12345678910";
  let email = "support@yext.com";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex items-center gap-x-12">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-24 w-auto rounded-full" src="/yext-logo.png" alt="" />
          </a>
          <div className="hidden lg:flex lg:gap-x-12">
            {/* {navigation.map((item) => (
              <Link 
                href={item.href}  
                key={item.name}
                className="tracking-tight font-bold leading-6 text-gray-900 hover:text-gray-700"
                eventName={`cta Click_${item.name}`}
                >
                {item.name}
              </Link>
            ))} */}
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex justify-around space-x-8 p-2 border border-gray-300 rounded-md shadow-sm">
          <input
            type="text"
            placeholder="Search..."
            value={"Search Yext Electronics"}
            // onChange={}
            className="text-gray-400"
          />
            <Search  />
        </div>
      </nav>
    </header>
  )  

};

export default Header;
