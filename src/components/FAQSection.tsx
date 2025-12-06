import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQSection = () => {
    const faqs = [
        {
            question: "What is the admission procedure?",
            answer: "Admissions are open from Pre-Nursery to Class 9. Parents need to fill out the registration form available online or at the school office. For higher classes, a basic interaction/assessment is conducted.",
        },
        {
            question: "Do you provide transport facilities?",
            answer: "Yes, we have a fleet of safe, GPS-enabled buses covering Sonki, Pingi, Darbhanga, and surrounding areas. Each bus has a trained attendant for student safety.",
        },
        {
            question: "What is the student-teacher ratio?",
            answer: "We maintain a healthy student-teacher ratio of 20:1 to ensure that every child gets individual attention and mentorship.",
        },
        {
            question: "Are there extra-curricular activities?",
            answer: "Absolutely! We focus on holistic development with facilities for Sports (Indoor/Outdoor), Music, Dance, Art & Craft, and a dedicated Debate Club and Science Club.",
        },
        {
            question: "Is the campus secure?",
            answer: "The safety of our students is paramount. The entire campus is under 24/7 CCTV surveillance, and we have deployed trained security personnel at all entry/exit points.",
        },
    ];

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                        <HelpCircle className="w-6 h-6" />
                    </div>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
                        Frequently Asked <span className="text-gradient">Questions</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Common queries about our admissions, facilities, and culture.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border rounded-xl px-4 bg-card shadow-sm">
                            <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors py-4">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

export default FAQSection;
