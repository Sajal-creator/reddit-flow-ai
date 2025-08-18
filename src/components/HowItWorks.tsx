import { ArrowRight, Link, Target, TrendingUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: Link,
      title: "Connect Your Reddit Account",
      description: "Secure OAuth integration with your Reddit account in just one click",
      color: "primary"
    },
    {
      step: 2,
      icon: Target,
      title: "Set Your Targets",
      description: "Choose subreddits, keywords, and engagement style that matches your brand",
      color: "accent"
    },
    {
      step: 3,
      icon: TrendingUp,
      title: "Watch It Grow",
      description: "Monitor real-time analytics and watch your karma and engagement soar",
      color: "success"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get started in minutes with our simple 3-step process
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-20 left-0 right-0">
            <div className="flex justify-between items-center max-w-4xl mx-auto px-24">
              <ArrowRight className="text-primary" size={32} />
              <ArrowRight className="text-accent" size={32} />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="text-center group animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Step Number */}
                <div className="relative mb-8">
                  <div className={`
                    w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white relative z-10
                    ${step.color === 'primary' ? 'bg-primary' : 
                      step.color === 'accent' ? 'bg-accent' : 
                      'bg-success'}
                  `}>
                    {step.step}
                  </div>
                  <div className={`
                    absolute inset-0 w-20 h-20 mx-auto rounded-full blur-lg opacity-50
                    ${step.color === 'primary' ? 'bg-primary' : 
                      step.color === 'accent' ? 'bg-accent' : 
                      'bg-success'}
                  `}></div>
                </div>

                {/* Icon */}
                <div className={`
                  w-16 h-16 mx-auto mb-6 rounded-xl flex items-center justify-center
                  ${step.color === 'primary' ? 'bg-primary/10 text-primary' : 
                    step.color === 'accent' ? 'bg-accent/10 text-accent' : 
                    'bg-success/10 text-success'}
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <step.icon size={32} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Start growing your Reddit presence in the next 5 minutes
          </p>
          <div className="flex justify-center">
            <div className="p-1 bg-gradient-primary rounded-full">
              <button className="bg-background text-foreground px-8 py-3 rounded-full font-semibold hover:bg-secondary transition-colors">
                Get Started Now →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;