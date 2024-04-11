import { useDocument } from "../hooks/useDocument";
import { Camera } from "lucide-react";
import StarRating from "./StarRating";
import { Image } from "@yext/pages-components"

export interface HeroProps {
    children?: React.ReactNode;
  }
  
  const Hero = ({}:HeroProps) => {
    const document = useDocument<any>();
    console.log(document);
    const name = document.c_relatedCategories[0].name;
    const transformedDescription = document.transformedDescription;
    const primaryPhoto = document.c_relatedCategories[0].primaryPhoto;
    const category = document.c_relatedCategories[0].name;
    const featuredProducts = document.c_relatedCategories[0].c_featuredProducts;
    console.log(featuredProducts);
  
    return (
      <>
        <div className="px-4 space-y-10">
            <div className="flex flex-col space-y-12 md:justify-between md:space-x-12 md:flex-row">
                <div className="space-y-4 md:w-1/2">
                    <h1 className="font-bold  text-gray-900">{name}</h1>
                    {/* <div className="text-xl font-semibold">{location.name} - {location.address.line1}</div> */}
                    <StarRating rating={4.7} totalReviews={100} />
                    <div className="text-lg tracking-wide">{transformedDescription}</div>
                    <div className="flex flex-col space-y-3 lg:flex-row lg:space-x-8 lg:space-y-0">
                        <div id="cta1" className="pt-5">
                            <a className="border-2 border-black shadow-sm px-4 py-2 rounded-md cursor-pointer hover:bg-black hover:text-white" href="#">Browse Products</a>
                        </div>
                        <div id="cta2" className="pt-5">
                            <a className="border-2 border-black shadow-sm px-4 py-2 rounded-md cursor-pointer hover:bg-black hover:text-white" href="#">Speak With An Expert</a>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <Image className="rounded-md shadow-md" image={primaryPhoto.image} />
                </div>
            </div>
            <div className="space-y-8 pb-20">
                <h2 className="flex space-x-3 items-center tracking-normal">
                    <Camera size={30} />
                    <span>Featured {category}</span>
                </h2>
                <div className="grid gap-8 md:grid-cols-3">
                    {featuredProducts.map((product: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-md p-10 shadow-md">
                        <h3 className="font-bold text-lg">{product.name}</h3>
                        <Image image={product.primaryPhoto.image}  />
                        <div className="space-y-1">
                            {product.brand && <p className="text-gray-700 font-bold">{product.brand}</p>}
                            {product.color && <p className="text-gray-700">{product.color}</p>}
                            {product.price && product.price.value && <p className="text-gray-700">${product.price.value}</p>}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
      </>
    );
  };
  
  export default Hero;