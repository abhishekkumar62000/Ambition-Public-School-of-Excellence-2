import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const TestimonialSection = () => {
    const testimonials = [
        {
            name: "Priya Sharma",
            role: "Mother of Aarav (Class 5)",
            content: "The transformation in my son has been remarkable. Ambition Public School doesn't just focus on grades but helps children build confidence. The teachers are incredibly supportive.",
            rating: 5,
        },
        {
            name: "Rajesh Kumar",
            role: "Father of Sneha (Class 9)",
            content: "I am impressed by the modern science labs and the emphasis on practical learning. My daughter has developed a genuine interest in Physics thanks to the excellent faculty here.",
            rating: 5,
        },
        {
            name: "Anita Das",
            role: "Mother of Rohan (Class UKG)",
            content: "For a working parent, safety is the priority. The school's secure campus and caring staff give me peace of mind. The digital app for updates is a great bonus!",
            rating: 5,
        },
        {
            name: "Vikram Singh",
            role: "Father of Arjun (Class 8)",
            content: "The balance between sports and academics is perfect. My son represents the school in cricket and still scores well. Best school in Darbhanga for holistic growth.",
            rating: 5,
        },
    ];

    return (
        <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="inline-block text-primary font-semibold text-sm tracking-wider uppercase mb-4">
                        Parent Voices
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
                        Trusted by <span className="text-gradient">Families</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Hear from the parents who have entrusted us with their children's future.
                    </p>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-6xl mx-auto"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                <div className="p-1 h-full">
                                    <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow bg-card relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Quote className="w-16 h-16 text-primary" />
                                        </div>
                                        <CardContent className="flex flex-col justify-between h-full p-6">
                                            <div>
                                                <div className="flex gap-1 mb-4">
                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className="w-5 h-5 text-amber-400 fill-amber-400"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <p className="text-muted-foreground mb-6 leading-relaxed italic relative z-10">
                                                    "{testimonial.content}"
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4 pt-4 border-t">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                                                    {testimonial.name[0]}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                                                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="hidden md:block">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            </div>
        </section>
    );
};

export default TestimonialSection;
