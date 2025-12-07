import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";

// Support mixed file extensions for the last two entries
// Serve images from the `public/gallery` directory so Vercel can host them statically
const images = [
  "/gallery/1.jpeg",
  "/gallery/2.jpeg",
  "/gallery/3.jpeg",
  "/gallery/4.jpeg",
  "/gallery/5.jpeg",
  "/gallery/6.jpeg",
  "/gallery/7.jpeg",
  "/gallery/8.jpeg",
  "/gallery/9.jpeg",
  "/gallery/10.jpeg",
  "/gallery/11.jpeg",
  "/gallery/12.jpeg",
  "/gallery/13.jpeg",
  "/gallery/14.jpeg",
  "/gallery/15.jpeg",
  "/gallery/16.png",
  "/gallery/17.jpg",
  "/gallery/18.jpeg",
];

const GalleryPage = () => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const openLightbox = useCallback((idx: number) => {
    setActiveIndex(idx);
    setOpen(true);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const closeLightbox = useCallback(() => {
    setOpen(false);
    setActiveIndex(null);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const nextImage = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      return (prev + 1) % images.length;
    });
  }, []);

  const prevImage = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      return (prev - 1 + images.length) % images.length;
    });
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, nextImage, prevImage, closeLightbox]);

  const zoomIn = useCallback(() => setZoom((z) => Math.min(5, z + 0.25)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(0.5, z - 0.25)), []);
  const resetZoom = useCallback(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    if (e.deltaY < 0) zoomIn(); else zoomOut();
  }, [zoomIn, zoomOut]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || zoom === 1) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
  }, [zoom]);

  const onMouseUp = useCallback(() => { dragging.current = false; }, []);
  const onMouseLeave = useCallback(() => { dragging.current = false; }, []);

  const captions = useMemo(
    () => [
      "Inauguration Day",
      "Annual Cultural Fest",
      "Science Exhibition",
      "Sports Meet Highlights",
      "Teachers' Day Celebration",
      "Independence Day Parade",
      "Art & Craft Showcase",
      "Music & Dance Recital",
      "Classroom Activities",
      "Community Outreach",
      "Awards & Achievements",
      "Winter Carnival",
      "Library Moments",
      "Parent-Teacher Interaction",
      "STEM Lab Session",
      "Campus Views",
      "Farewell Ceremony",
    ],
    []
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12 animate-fade-up">
              <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">Ambition Public School Gallery</h1>
              <p className="text-base md:text-lg text-muted-foreground">
                Welcome to our visual story. Here you’ll find cherished moments from annual functions,
                cultural celebrations, academic achievements, sports events, and everyday campus life.
                Each photograph captures our students’ curiosity, creativity, teamwork, and the joyful
                spirit that defines Ambition Public School. Explore, relive, and celebrate the vibrant
                community that grows here every day.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {images.map((src, idx) => (
                <button
                  key={src}
                  onClick={() => openLightbox(idx)}
                  className="group bg-muted rounded-lg overflow-hidden border border-border text-left focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <div className="relative w-full aspect-square flex items-center justify-center bg-black">
                    <img
                      src={src}
                      alt={captions[idx] || `School Gallery Image ${idx + 1}`}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                  <div className="p-2 text-center text-xs text-muted-foreground">{captions[idx] || `Image ${idx + 1}`}</div>
                </button>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm md:text-base text-muted-foreground">
                Celebrating our students — their talents, traditions, triumphs, and the friendships that last a lifetime.
              </p>
            </div>
          </div>
        </section>

        {/* Lightbox Dialog */}
        <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : closeLightbox())}>
          <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 border-none bg-black text-white overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Image viewport */}
              {activeIndex !== null && (
                <div
                  className="relative max-w-full max-h-full"
                  onWheel={onWheel}
                  onMouseDown={onMouseDown}
                  onMouseMove={onMouseMove}
                  onMouseUp={onMouseUp}
                  onMouseLeave={onMouseLeave}
                >
                  <img
                    src={images[activeIndex]}
                    alt={captions[activeIndex] || `Image ${activeIndex + 1}`}
                    className="select-none"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "calc(90vh - 96px)",
                      objectFit: "contain",
                      transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                      transition: dragging.current ? "none" : "transform 120ms ease-out",
                      cursor: zoom > 1 ? (dragging.current ? "grabbing" : "grab") : "default",
                    }}
                    onDoubleClick={() => (zoom === 1 ? zoomIn() : resetZoom())}
                  />
                </div>
              )}

              {/* Controls */}
              <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between text-xs text-white/80">
                <span className="truncate max-w-[60%]">{activeIndex !== null ? captions[activeIndex] || `Image ${activeIndex + 1}` : ""}</span>
                <span>Use ← → keys • Esc to close</span>
              </div>
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs"
                aria-label="Close"
              >
                Close
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 transition"
                aria-label="Previous image"
              >
                ‹
              </button>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 transition"
                aria-label="Next image"
              >
                ›
              </button>

              {/* Zoom controls */}
              <div className="absolute bottom-3 right-3 flex gap-2">
                <button onClick={zoomOut} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs" aria-label="Zoom out">-
                </button>
                <button onClick={resetZoom} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs" aria-label="Reset zoom">Reset
                </button>
                <button onClick={zoomIn} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs" aria-label="Zoom in">+
                </button>
              </div>

              {/* Thumbnails strip */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-black/40">
                <div className="flex gap-2 overflow-x-auto scrollbar-thin">
                  {images.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setActiveIndex(i)}
                      className={`h-12 w-12 flex items-center justify-center rounded border ${activeIndex === i ? "border-secondary" : "border-white/20"}`}
                      aria-label={`Go to image ${i + 1}`}
                    >
                      <img src={src} alt="thumb" className="max-h-full max-w-full object-contain" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default GalleryPage;
