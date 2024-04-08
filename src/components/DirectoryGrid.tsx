import { Address, Image, Link } from "@yext/pages-components";
import { formatPhoneNumber } from "react-phone-number-input";
import { useDocument } from "../hooks/useDocument";
import { useTemplateData } from "../common/useTemplateData";
import ScrollEffect from "./ScrollEffect";
import { Map, Phone } from "lucide-react";

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
    childrenDivs = sortedChildren.map((child: any) => (
      // <Link
      //   className=""
      //   href={relativePrefixToRoot + child.slug}
      // >
      //   <div
      //     key={child.slug}
      //     className="p-10 bg-gray-100 border rounded-lg  shadow-md columns-2 hover:drop-shadow-md"
      //   >
      //     <div className="space-y-6">
      //       <h2 className="font-semibold">
      //           {child.name} ({child.neighborhood})
      //       </h2>
      //       {/* <div className="m-1 border"></div> */}
      //       <div className="flex space-x-3">
      //         <Map size={24}/>
      //         <div className="">
      //           <div>{child.address.line1}</div>
      //           <div>{child.address.city}, {child.address.region}</div>
      //         </div>
      //       </div>
      //       {/* <Address address={child.address} lines={[['line1', 'city', 'region']]} separator={','}></Address> */}
      //       <div className="flex space-x-2">
      //         <Phone size={24}/>
      //         <div>{formatPhoneNumber(child.mainPhone)}</div>
      //       </div>
      //     </div>
      //     <div>
      //       <Image image={child.photoGallery[0]} className="rounded-lg " />
      //     </div>
      //   </div>
      // </Link>
      <Link
        className=""
        href={relativePrefixToRoot + child.slug}
        key={child.slug}
      >
        <div
          className="border rounded-lg bg-gray-100 p-10 h-96 shadow-md hover:drop-shadow-md relative"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.85) 35%, rgba(255, 255, 255, 0.1)), url(${child.photoGallery[0].image.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="space-y-6">
            <h2 className="font-semibold">{child.name} ({child.address.city}, {child.address.region})</h2>
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
    ));
  }
  return (
    <>
      <div className="centered-container section space-y-14">
        {directoryChildren && (
          <div className="grid gap-10 px-20">
            <ScrollEffect effect="reveal" cascade={true} duration={1000} damping={0.2} triggerOnce={true}>
              {childrenDivs}
            </ScrollEffect>
          </div>
        )}
      </div>
    </>
  );
};

export default DirectoryGrid;