import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "SaaS Founder",
      company: "TechStart Inc.",
      quote: "Increased my Reddit karma by 300% in just 2 weeks. The AI comments are so natural, nobody can tell they're automated.",
      avatar: "SC",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Content Creator",
      company: "Digital Marketing Pro",
      quote: "Finally cracked the Reddit algorithm with this tool. My engagement rates have never been higher, and I'm spending way less time on manual work.",
      avatar: "MR",
      rating: 5
    },
    {
      name: "Jessica Park",
      role: "Marketing Manager",
      company: "Growth Labs",
      quote: "The analytics dashboard is incredible. I can see exactly which comments perform best and optimize my strategy in real-time.",
      avatar: "JP",
      rating: 5
    }
  ];

  const metrics = [
    { value: "2.3M+", label: "Comments Generated" },
    { value: "95%", label: "Account Safety Rate" },
    { value: "4x", label: "Average Growth Increase" },
    { value: "500+", label: "Active Users" }
  ];

  return (
    <section id="testimonials" className="py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Trusted by{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              500+ Reddit Marketers
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See why marketers choose RedditGrow Pro to scale their Reddit presence
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                {metric.value}
              </div>
              <div className="text-muted-foreground text-sm">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group p-8 rounded-xl border border-border/50 bg-gradient-card backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-elegant animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="text-primary opacity-50" size={32} />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-warning fill-warning" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Banner */}
        <div className="mt-16 text-center bg-gradient-hero rounded-2xl p-8 border border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {['A', 'B', 'C', 'D', 'E'].map((letter, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-primary border-2 border-background flex items-center justify-center text-white text-sm font-semibold"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <span className="text-muted-foreground text-sm">+495 more</span>
            </div>
            <div className="text-center md:text-left">
              <p className="font-semibold">Join marketers from Reddit, Discord, X, and more</p>
              <p className="text-sm text-muted-foreground">Growing their communities with RedditGrow Pro</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;