import { useDocument } from "../hooks/useDocument";
import { Car, Map, Phone } from "lucide-react";
import { formatPhoneNumber } from "react-phone-number-input";
import StarRating from "./StarRating";

export interface NapProps {
    // title?: string;
    // hours: Week;
    children?: React.ReactNode;
  }
  
  const NAP = ({}:NapProps) => {
    const document = useDocument<any>();
    // const hours = document.hours;
    const name = document.name;
    const description = document.description;
    const neighborhood = document.neighborhood;
    const address = document.address;
    const mainPhone = document.mainPhone;
  
    return (
      <>
        <div className="px-4 space-y-10 lg:w-1/2 xl:w-3/5">
            {name && 
                <div>
                    <h1 className="font-bold mb-4 text-gray-900">
                        <a id="">{name} ({neighborhood})</a>
                    </h1>
                    <StarRating rating={4.7} totalReviews={100} />
                </div>
            }
            <div className="flex">
                <div className="space-y-5 text-lg">
                    <div className="flex space-x-5 items-center">
                        <Map size={24} />
                        <div>
                            <div>{address.line1}</div>
                            <div>{address.city}, {address.region}</div>
                        </div>
                    </div>
                    <div className="flex space-x-3 items-center">
                        <Phone size={24} />
                        <div>{formatPhoneNumber(mainPhone)}</div>
                    </div>
                    <div className="flex space-x-8">
                        <div id="cta1" className="pt-5">
                            <a className="border-2 border-black shadow-sm px-4 py-2 rounded-md cursor-pointer hover:bg-black hover:text-white" href="#">Get Directions</a>
                        </div>
                        <div id="cta2" className="pt-5">
                            <a className="border-2 border-black shadow-sm px-4 py-2 rounded-md cursor-pointer hover:bg-black hover:text-white" href="#">Speak With An Expert</a>
                        </div>
                    </div>
                </div>
            </div>
            {description && 
                <div className="bg-gray-50 p-4 rounded-sm shadow-sm">
                    {description}
                </div>
            }
        </div>
      </>
    );
  };
  
  export default NAP;