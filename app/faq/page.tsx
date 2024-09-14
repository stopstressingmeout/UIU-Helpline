import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion";
import ChatSection from "@/components/ChatSection";

const FAQPage = () => {
    const faqs = [
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for all unused items in their original packaging. Please contact our customer service team to initiate a return."
        },
        {
            question: "How long does shipping take?",
            answer: "Shipping times vary depending on your location. Typically, domestic orders are delivered within 3-5 business days, while international orders may take 7-14 business days."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times may vary depending on the destination."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order has been shipped, you will receive a confirmation email with a tracking number. You can use this number to track your package on our website or the carrier's site."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay."
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
