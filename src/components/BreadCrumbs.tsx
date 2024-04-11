import { Image } from "@yext/pages-components";
import { useDocument } from "../hooks/useDocument";
import { Home, ChevronRight } from "lucide-react";

const BreadCrumbs = () => {
    const document = useDocument<any>();
    const name = document.name;
    const address = document.address;
  return (
    <div className="centered-container flex p-10 space-x-4 items-center text-sm">
        <a href="/index.html" className="">
            <Home size={18} className="hover:underline" />
        </a>
        <ChevronRight size={16} />
        <div>{name} ({address.line1}, {address.city}, {address.region})</div>
    </div> 
  );
};

export default BreadCrumbs;
