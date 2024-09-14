import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion";
import ChatSection from "@/components/ChatSection";

const FAQPage = () => {
    const faqs = [
        {
            question: "What is the Shuttle schedule?",
            answer: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
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
            <div className="w-full max-w-3xl mx-auto mt-10">
                <ChatSection/>
            </div>
        </div>
    );
};

export default FAQPage;
