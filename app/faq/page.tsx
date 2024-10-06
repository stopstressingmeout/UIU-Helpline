import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion";

const FAQPage = () => {
    const faqs = [
        {
            question: "What is the Shuttle schedule?",
            answer: `From Notun Bazar:
07.30 AM - 08.45 AM
09.25 AM - 09.35 AM
10.45 AM - 10.55 AM
12.05 PM - 12.15 PM
01.25 PM - 01.35 PM
02.45 PM - 02.55 PM
06.10 PM
From UIU:
10.05 AM
11.25 AM
12.45 PM
02.05 PM
03.25 PM
04.40 PM
05.45 PM
07.00 PM
09.40 PM`
        },
        {
            question: "Where can I find the transportation schedule?",
            answer: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            question: "When are trimester results published?",
            answer: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            question: "Where and when can i register to join clubs?",
            answer: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            question: "Where are the study rooms, prayer rooms, common rooms located?",
            answer: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
    ]
    return (
        <div className="w-full p-5">

            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                    Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent>
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

        </div>
    );
};

export default FAQPage;
