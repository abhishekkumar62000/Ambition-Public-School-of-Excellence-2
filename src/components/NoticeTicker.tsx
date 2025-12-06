import { Bell, Calendar, Star } from "lucide-react";

const NoticeTicker = () => {
    const notices = [
        "🎓 Admissions Open for Session 2025-26 - Apply Now!",
        "🏆 Annual Sports Day scheduled for 15th December",
        "✨ Scholarship Test for Class 6-9 on 20th January",
        "📚 New Robotics Lab inauguration by District Magistrate",
    ];

    return (
        <div className="bg-primary text-primary-foreground py-3 relative overflow-hidden flex items-center z-40 shadow-md">
            <div className="container mx-auto px-4 flex items-center gap-4">
                {/* Label - Hidden on very small screens to save space */}
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider hidden md:flex items-center gap-2 flex-shrink-0 z-10 shadow-sm">
                    <Bell className="w-3 h-3" />
                    Latest Updates
                </div>

                {/* Scrolling Ticker */}
                <div className="flex-1 overflow-hidden relative group cursor-pointer">
                    <div className="animate-marquee whitespace-nowrap flex gap-12 items-center hover:[animation-play-state:paused]">
                        {/* Duplicate content for seamless loop */}
                        {[...notices, ...notices, ...notices].map((notice, index) => (
                            <span key={index} className="inline-flex items-center gap-2 text-sm font-medium">
                                <Star className="w-3 h-3 text-accent fill-accent" />
                                {notice}
                            </span>
                        ))}
                    </div>

                    {/* Gradients for smooth fade edges */}
                    <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-primary to-transparent z-10" />
                    <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-primary to-transparent z-10" />
                </div>
            </div>
        </div>
    );
};

export default NoticeTicker;
