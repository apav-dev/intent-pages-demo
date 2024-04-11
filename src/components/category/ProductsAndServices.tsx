import { useDocument } from "../../hooks/useDocument";
import { Camera, CircleUserRound, Check } from "lucide-react";
import StarRating from "../StarRating";
import { Image } from "@yext/pages-components"
  
const ProductsAndServices = () => {
    const document = useDocument<any>();
    const products = document.c_relatedCategories[0].products;
    const services = document.c_relatedCategories[0].services;

    return (
        <>
            <div className="section grid md:grid-cols-2 gap-8">
                <div className="space-y-6 border p-6 bg-gray-50 rounded-md shadow-sm">
                    <h2 className="flex space-x-3 items-center tracking-normal">
                        <Camera size={30} />
                        <span>Products </span>
                    </h2>
                    <ul className="pl-2">
                        {products.map((product: string, index: number) => (
                            <div className="flex space-x-3">
                                <Check size={20} />
                                <li key={index} className="text-xl tracking-wider">{product}</li>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className="space-y-6 border p-6 bg-gray-50 rounded-md shadow-sm">
                    <h2 className="flex space-x-3 items-center tracking-normal">
                        <CircleUserRound size={30} />
                        <span>Services </span>
                    </h2>
                    <ul className="pl-2">
                        {services.map((service: string, index: number) => (
                            <div className="flex space-x-3">
                                <Check size={20} />
                                <li key={index} className="text-xl tracking-wider">{service}</li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ProductsAndServices;
