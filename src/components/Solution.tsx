import { Bot, BarChart3, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Solution = () => {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Comments",
      description: "Contextually relevant comments that sound human and drive engagement naturally"
    },
    {
      icon: BarChart3,
      title: "Growth Analytics",
      description: "Track reach, engagement, and growth patterns over 7 and 30-day periods"
    },
    {
      icon: Zap,
      title: "Smart Automation",
      description: "Set it and forget it - your Reddit presence grows while you sleep"
    },
    {
      icon: Shield,
      title: "Safe Growth",
      description: "Anti-detection algorithms prevent shadowbans and account restrictions"
    }
  ];

  return (
    <section id="features" className="py-20 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Meet Your Reddit{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Growth Assistant
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Intelligent automation that scales your Reddit presence while maintaining authenticity and safety
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-xl border border-border/50 bg-gradient-card backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-elegant animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <feature.icon size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-hero rounded-2xl p-12 border border-primary/20">
          <h3 className="text-3xl font-bold mb-4">Ready to Scale Your Reddit Presence?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join 500+ marketers who have already automated their Reddit growth strategy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl">
              Start Free Trial
            </Button>
            <Button variant="glass" size="xl">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;