import { Button } from "@/components/ui/button";
import { Play, TrendingUp, Users, Zap } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

const Hero = () => {
  return (
    <section className="pt-32 pb-16 px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="animate-fade-in">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center space-x-1 bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
                <TrendingUp size={14} />
                <span>Trusted by 500+ marketers</span>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Grow Your Reddit Presence on{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Autopilot
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Automated commenting system that builds authentic engagement while you focus on content creation. 
              Increase karma and reach by 300% in 30 days.
            </p>

            {/* Trust indicators */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-primary border-2 border-background flex items-center justify-center text-white font-semibold text-sm"
                  >
                    {String.fromCharCode(65 + i - 1)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Joined by marketers from</p>
                <p className="font-semibold">Reddit, Discord, X, and more</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="hero" size="xl" className="group">
                <Zap className="mr-2 group-hover:animate-pulse" />
                Start Free Trial
              </Button>
              <Button variant="glass" size="xl" className="group">
                <Play className="mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div>
                <p className="text-2xl font-bold text-primary">2.3M+</p>
                <p className="text-sm text-muted-foreground">Comments Generated</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">95%</p>
                <p className="text-sm text-muted-foreground">Account Safety Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">4x</p>
                <p className="text-sm text-muted-foreground">Average Growth</p>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="animate-slide-up lg:animate-float">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-primary rounded-2xl blur-xl opacity-30 animate-glow"></div>
              <img
                src={heroImage}
                alt="RedditGrow Pro Dashboard showing analytics and growth metrics"
                className="relative rounded-2xl shadow-card border border-border/50 w-full"
              />
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-success text-white px-3 py-2 rounded-lg shadow-elegant animate-float">
                <div className="flex items-center space-x-2">
                  <Users size={16} />
                  <span className="text-sm font-semibold">+156 Karma</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary text-white px-3 py-2 rounded-lg shadow-elegant animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-2">
                  <TrendingUp size={16} />
                  <span className="text-sm font-semibold">23% Growth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;