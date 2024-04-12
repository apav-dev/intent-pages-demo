import { Image } from "@yext/pages-components";
import { useDocument } from "../hooks/useDocument";
import { Home, ChevronRight } from "lucide-react";
import { useTemplateData } from "../common/useTemplateData";


const BreadCrumbs = () => {
  const { relativePrefixToRoot } = useTemplateData();
    const document = useDocument<any>();
    const entityType = document.meta.entityType.id;
    let name;
    let address;
    let locationSlug;
    if (entityType === "location") {
      name = document.name;
      address = document.address;
    } else if (entityType === "ce_categoryPage") {
      address = document.c_relatedLocations[0].address;
      name = document.c_relatedCategories[0].name;
      locationSlug = relativePrefixToRoot.concat(document.c_relatedLocations[0].slug);
    }
  return (
    <div className="centered-container flex p-10 space-x-4 items-center text-sm">
        <a href="/index.html" className="flex space-x-3 underline font-semibold">
            <Home size={18} className="hover:underline" />
            <span>Yext Electronics</span>
        </a>
        <ChevronRight size={16} />
        {
          (entityType === "location") ? (
            <div>{address.line1}</div>
          ) : (
            <div className="flex space-x-4 items-center">
              <a href={locationSlug} className="underline font-semibold">{address.line1}</a>
              <ChevronRight size={16} />
              <div>{name}</div>
            </div>
          )
        }
    </div> 
  );
};

export default BreadCrumbs;
