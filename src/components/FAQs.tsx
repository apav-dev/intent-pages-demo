import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "What is Yext Electronics?",
    answer:
      "Yext Electronics is a premier technology store offering the most cutting-edge electronics and gadgets on the market.",
  },
  {
    question: "Who founded Yext Electronics?",
    answer:
      "Yext Electronics was founded by a group of passionate product managers based in New York City. Their dedication to technology and electronics drove them to create a store that showcases the latest and most innovative products.",
  },
  {
    question: "What is Yext?",
    answer:
      "Yext is the leading digital presence platform for multi-location brands to deliver consistent, accurate, and engaging experiences.",
  },
  {
    question: "What is Yext Pages?",
    answer:
      "Pages is the complete development toolbox for content editors and developers to build high performance web pages at scale. Pages powers global brands that need websites to capture traffic and drive conversions. The state-of-the-art streaming static generation infrastructure allows your teams to build ridiculously fast and user-friendly websites. For performance, ease-of-use, and scalability, Pages is the go-to framework for modern enterprises.",
  },
  // More questions...
]

export default function FAQs() {
  return (
    <div className="border shadow-md">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
