import { useDocument } from "../../hooks/useDocument";
import { Megaphone } from "lucide-react";
import StarRating from "../StarRating";
import { Image } from "@yext/pages-components"

export interface HeroProps {
    children?: React.ReactNode;
  }
  
  const Hero = ({}:HeroProps) => {
    const document = useDocument<any>();
    const name = document.c_relatedCategories[0].name;
    const transformedDescription = document.transformedDescription;
    const primaryPhoto = document.c_relatedCategories[0].primaryPhoto;
    const category = document.c_relatedCategories[0].name;
    const featuredProducts = document.c_relatedCategories[0].c_featuredProducts;
  
    return (
      <>
        <div className="space-y-10 section">
            <div className="flex flex-col space-y-12 md:justify-between md:space-x-12 md:flex-row">
                <div className="space-y-4 md:w-1/2">
                    <h1 className="font-bold  text-gray-900">{name}</h1>
                    {/* <div className="text-xl font-semibold">{location.name} - {location.address.line1}</div> */}
                    <StarRating rating={4.7} totalReviews={100} />
                    {transformedDescription && <div className="text-lg tracking-wide">{transformedDescription}</div>}
                    <div className="flex flex-col space-y-3 lg:flex-row lg:space-x-8 lg:space-y-0">
                        <div id="CTAs" className="flex flex-col text-center space-y-3 py-4 w-full sm:max-w-fit">
                            <a className="rounded-full w-full sm:w-auto bg-black px-8 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-gray-600 hover:duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" href="#">Browse Products</a>
                            <a className="rounded-full w-full sm:w-auto bg-black px-8 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-gray-600 hover:duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" href="#">Speak With An Expert</a>
                        </div>
                    </div>
                </div>
                {primaryPhoto && 
                    <div className="md:w-1/2">
                        <Image className="rounded-md shadow-md" image={primaryPhoto.image} />
                    </div>
                }
            </div>
            <div className="space-y-8 pb-20">
                {category && 
                    <h2 className="flex space-x-3 items-center tracking-normal">
                        <Megaphone size={30} />
                        <span>Featured {category}</span>
                    </h2>
                }
                {featuredProducts && 
                    <div className="grid gap-8 md:grid-cols-3">
                        {featuredProducts.map((product: any, index: number) => (
                        <div key={index} className="border border-gray-200 rounded-md p-10 shadow-md">
                            <h3 className="font-bold text-lg">{product.name}</h3>
                            {product.primaryPhoto && <Image image={product.primaryPhoto.image} className="p-6" />}
                            <div className="space-y-1">
                                {product.brand && <p className="text-gray-700 font-bold">{product.brand}</p>}
                                {product.color && <p className="text-gray-700">{product.color}</p>}
                                {product.price && product.price.value && <p className="text-gray-700">${product.price.value}</p>}
                            </div>
                        </div>
                        ))}
                    </div>
                }
            </div>
        </div>
      </>
    );
  };
  
  export default Hero;