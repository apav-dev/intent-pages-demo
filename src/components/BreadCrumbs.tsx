import { Image } from "@yext/pages-components";
import { useDocument } from "../hooks/useDocument";
import { Home, ChevronLeft } from "lucide-react";

const BreadCrumbs = () => {
    const document = useDocument<any>();
    const name = document.name;
    const address = document.address;
  return (
    <div className="flex p-10 space-x-8 items-center">
        <a href="/index.html">
            <Home size={24} />
        </a>
        <ChevronLeft size={16} />
        <div>{name} ({address.line1}, {address.city}, {address.region})</div>
    </div> 
  );
};

export default BreadCrumbs;
