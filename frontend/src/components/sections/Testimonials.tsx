import { Marquee } from "../motion/Marquee";

interface Testimonial {
  _id: string;
  author: string;
  role: string;
  quote: string;
  avatar?: string;
}

async function getTestimonials() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) throw new Error("Failed to fetch testimonials");
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.log("Backend API not reachable. Returning empty testimonials.");
    return [];
  }
}

export const Testimonials = async () => {
  const testimonials: Testimonial[] = await getTestimonials();

  // "Skip testimonials until you have real ones — never fake them."
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-24 overflow-hidden bg-surface">
      <div className="mb-12 text-center">
        <span className="text-small font-semibold text-ink uppercase tracking-wider">
          What people say
        </span>
      </div>

      <Marquee speed="slow" pauseOnHover>
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial._id} 
            className="flex flex-col w-[350px] md:w-[450px] p-8 mx-4 bg-white border border-hairline rounded-3xl shrink-0"
          >
            <p className="text-body text-ink mb-8 leading-relaxed">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-surface border border-hairline shrink-0">
                {testimonial.avatar ? (
                  <img src={testimonial.avatar} alt={testimonial.author} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-body font-semibold text-ink">{testimonial.author}</span>
                <span className="text-small text-muted">{testimonial.role}</span>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};
