import { Check, Zap, Crown, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for getting started with Reddit growth",
      icon: Zap,
      features: [
        "100 automated comments/month",
        "Basic analytics dashboard",
        "3 subreddit targets",
        "Email support",
        "Account safety monitoring"
      ],
      cta: "Start Free Trial",
      popular: false,
      variant: "outline" as const
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "Best for serious Reddit marketers",
      icon: Crown,
      features: [
        "500 automated comments/month",
        "Advanced AI analytics",
        "Unlimited subreddit targets",
        "Priority support",
        "Custom comment styles",
        "A/B testing features",
        "Competitor analysis"
      ],
      cta: "Start Free Trial",
      popular: true,
      variant: "hero" as const
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For teams and agencies",
      icon: Rocket,
      features: [
        "Unlimited comments",
        "Multi-account management",
        "API access",
        "Dedicated support",
        "Custom integrations",
        "White-label options",
        "Team collaboration tools",
        "Advanced reporting"
      ],
      cta: "Contact Sales",
      popular: false,
      variant: "gradient" as const
    }
  ];

  return (
    <section id="pricing" className="py-20 px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Choose Your{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Growth Plan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start with a 7-day free trial. No credit card required. Cancel anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`
                relative p-8 rounded-2xl border transition-all duration-300 animate-fade-in group
                ${plan.popular 
                  ? 'border-primary bg-gradient-card shadow-glow scale-105' 
                  : 'border-border/50 bg-gradient-card hover:border-primary/50 hover:shadow-elegant'
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`
                  w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center
                  ${plan.popular ? 'bg-primary/20 text-primary' : 'bg-accent/10 text-accent'}
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <plan.icon size={32} />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="text-success flex-shrink-0" size={20} />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button 
                variant={plan.variant} 
                size="lg" 
                className="w-full"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ/Guarantee Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="bg-gradient-hero rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">30-Day Money-Back Guarantee</h3>
            <p className="text-muted-foreground mb-6">
              Not satisfied with your results? Get a full refund within 30 days, no questions asked.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Check className="text-success" size={16} />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Check className="text-success" size={16} />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Check className="text-success" size={16} />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;