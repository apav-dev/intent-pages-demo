import { useDocument } from "../../hooks/useDocument";
import { useTemplateData } from "../../common/useTemplateData";
import { Check } from "lucide-react";
import { Image } from "@yext/pages-components";

const FeaturedCategories = () => {
  const document = useDocument<any>();
  const { relativePrefixToRoot } = useTemplateData();
  const categoryPages = document.c_relatedCategoryPages;

  return (
    <>
      { categoryPages && 
        <div className="section">
            <div className="grid">
                {categoryPages.map((categoryPage, index:number) => (
                    <div key={index} className={` ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                        <div className="grid gap-8 centered-container p-8 md:grid-cols-2 md:items-center">
                            {index % 2 === 0 ? (
                                <>
                                    <div className="space-y-10 py-10">
                                        <h3 className="text-2xl tracking-wide text-center sm:text-left md:text-3xl">{categoryPage.c_relatedCategories[0].c_promotionTitle}</h3>
                                        <div>
                                          <a href={relativePrefixToRoot + categoryPage.slug}>
                                            <button className="rounded-full w-full sm:max-w-fit bg-black px-8 py-2.5 text-lg font-semibold text-white shadow-md hover:bg-gray-600 hover:duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                              Shop {categoryPage.c_relatedCategories[0].name}
                                            </button>
                                          </a>
                                        </div>
                                        <div id="Products & Services" className="flex space-x-10">
                                          {categoryPage.c_relatedCategories[0].products && 
                                            <div className="space-y-3">
                                              <div className="text-xl font-semibold">Products</div>
                                              <ul id="products" className="">
                                                  {categoryPage.c_relatedCategories[0].products.map((product: string, productIndex: number) => (
                                                      <div className="flex space-x-2 items-center">
                                                      <Check size={20} />
                                                      <li key={productIndex}>{product}</li>
                                                    </div>
                                                  ))}
                                              </ul>
                                            </div>
                                          }                                          
                                          {categoryPage.c_relatedCategories[0].services && 
                                            <div className="space-y-3">
                                              <div className="text-xl font-semibold">Services</div>
                                              <ul id="services" className="">
                                                  {categoryPage.c_relatedCategories[0].services.map((service: string, serviceIndex: number) => (
                                                      <div className="flex space-x-2 items-center">
                                                        <Check size={20} />
                                                        <li key={serviceIndex}>{service}</li>
                                                      </div>
                                                  ))}
                                              </ul>
                                            </div>
                                          }
                                        </div>
                                    </div>
                                    {categoryPage.c_relatedCategories[0].primaryPhoto &&
                                      <div className="w-2/3 justify-center items-center mx-auto lg:w-full ">
                                          <Image image={categoryPage.c_relatedCategories[0].primaryPhoto.image} className="rounded-md" />
                                      </div>
                                    }
                                </>
                            ) : (
                                <>
                                    <div className="hidden p-4 lg:block lg:w-full">
                                        <Image image={categoryPage.c_relatedCategories[0].primaryPhoto.image} className="rounded-md" />
                                    </div>
                                    <div className="space-y-10 py-2">
                                        <h3 className="text-2xl tracking-wide text-center sm:text-left md:text-3xl ">{categoryPage.c_relatedCategories[0].c_promotionTitle}</h3>
                                        <div>
                                          <a href={relativePrefixToRoot + categoryPage.slug}>
                                            <button className="rounded-full w-full sm:max-w-fit bg-black px-8 py-2.5 text-lg font-semibold text-white hover:bg-gray-600 hover:duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                              Shop {categoryPage.c_relatedCategories[0].name}
                                            </button>
                                          </a>
                                        </div>
                                        <div id="Products & Services" className="flex space-x-10">
                                          {categoryPage.c_relatedCategories[0].products &&                                          
                                            <div className="space-y-3">
                                              <div className="text-xl font-semibold">Products</div>
                                              <ul id="products" className="">
                                                  {categoryPage.c_relatedCategories[0].products.map((product: string, productIndex: number) => (
                                                      <div className="flex space-x-2 items-center">
                                                      <Check size={20} />
                                                      <li key={productIndex}>{product}</li>
                                                    </div>
                                                  ))}
                                              </ul>
                                            </div>
                                          }
                                          {categoryPage.c_relatedCategories[0].services &&
                                            <div className="space-y-3">
                                              <div className="text-xl font-semibold">Services</div>
                                              <ul id="services" className="">
                                                  {categoryPage.c_relatedCategories[0].services.map((service: string, serviceIndex: number) => (
                                                      <div className="flex space-x-2 items-center">
                                                        <Check size={20} />
                                                        <li key={serviceIndex}>{service}</li>
                                                      </div>
                                                  ))}
                                              </ul>
                                            </div>
                                          }
                                        </div>
                                    </div>
                                    {categoryPage.c_relatedCategories[0].primaryPhoto &&
                                      <div className="w-2/3 justify-center items-center mx-auto md:hidden">
                                        <Image image={categoryPage.c_relatedCategories[0].primaryPhoto.image} className="rounded-md" />
                                      </div>
                                    }
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      }
    </>
  );
};

export default FeaturedCategories;

