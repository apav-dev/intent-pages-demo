import { Address, Image, Link } from "@yext/pages-components";
import { formatPhoneNumber } from "react-phone-number-input";
import { useDocument } from "../hooks/useDocument";
import { useTemplateData } from "../common/useTemplateData";
import ScrollEffect from "./ScrollEffect";
import { Map, Phone } from "lucide-react";
import { HoursStatus } from "@yext/sites-react-components";

const sortByCity = (a:any, b:any) => {
  const first = a.address.city;
  const second = b.address.city;
  return first < second ? -1 : first > second ? 1 : 0;
};

const DirectoryGrid = () => {
  const { relativePrefixToRoot } = useTemplateData();
  const document = useDocument<any>();
  const { 
    dm_directoryChildren: directoryChildren,
    name,
    description,
  } = document;

  let childrenDivs;
  if (directoryChildren) {
    const sortedChildren = directoryChildren?.sort(sortByCity) || [];
    childrenDivs = sortedChildren.map((child: any) => {
      const imageUrl = child.photoGallery.length > 0 ? child.photoGallery[0].image.url : "/yext-building.jpeg";
      return (
        <Link
          className=""
          href={relativePrefixToRoot + child.slug}
          key={child.slug}
        >
          <div
            className="border rounded-lg bg-gray-100 p-10 h-96 shadow-md hover:drop-shadow-md relative"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.85) 35%, rgba(255, 255, 255, 0.1)), url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-bold md:text-4xl">{child.name} ({child.address.city}, {child.address.region})</h2>
              <HoursStatus
                  hours={child.hours}
                  className="text-lg md:text-xl"
                  // timezone={document.timezone}
                  separatorTemplate={() => <span className="p-2"> - </span>}
                  dayOfWeekTemplate={() => null}
                />
              <div className="flex space-x-3 text-xl items-center">
                <Map size={24} />
                <div>
                  <div>{child.address.line1}</div>
                  <div>{child.address.city}, {child.address.region}</div>
                </div>
              </div>
              <div className="flex space-x-3 text-xl items-center">
                <Phone size={24} />
                <div>{formatPhoneNumber(child.mainPhone)}</div>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  }

  return (
    <>
      <div className="section space-y-14 centered-container">
        {directoryChildren && (
          <div className="grid gap-10">
            {childrenDivs}
          </div>
        )}
      </div>
    </>
  );
};

export default DirectoryGrid;
