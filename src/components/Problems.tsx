import { AlertTriangle, Clock, Eye, TrendingDown } from "lucide-react";

const Problems = () => {
  const painPoints = [
    {
      icon: Clock,
      title: "Hours of Manual Work",
      description: "Spending 10+ hours per week manually commenting on posts across different subreddits",
      impact: "Lost productivity"
    },
    {
      icon: TrendingDown,
      title: "Missing Optimal Times",
      description: "No way to know when your target audience is most active and engaged",
      impact: "Low engagement"
    },
    {
      icon: AlertTriangle,
      title: "Getting Shadowbanned",
      description: "Poor engagement strategies leading to account restrictions and bans",
      impact: "Account risk"
    },
    {
      icon: Eye,
      title: "No Growth Tracking",
      description: "Unable to measure what actually drives growth and engagement",
      impact: "Wasted effort"
    }
  ];

  return (
    <section className="py-20 px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Reddit Growth Shouldn't Be{" "}
            <span className="text-destructive">This Hard</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Most Reddit marketers struggle with time-consuming manual processes that deliver inconsistent results
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="group p-8 rounded-xl border border-border/50 bg-gradient-card backdrop-blur-sm hover:border-destructive/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive group-hover:bg-destructive/20 transition-colors">
                  <point.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {point.description}
                  </p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-destructive/10 text-destructive">
                    {point.impact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Before/After Comparison */}
        <div className="mt-16 grid lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-xl border border-destructive/30 bg-destructive/5">
            <h3 className="text-2xl font-bold mb-4 text-destructive">Without Automation</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <span className="text-muted-foreground">Manual commenting takes 10+ hours/week</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <span className="text-muted-foreground">Inconsistent engagement and growth</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <span className="text-muted-foreground">High risk of shadowbans</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <span className="text-muted-foreground">No data-driven insights</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-xl border border-success/30 bg-success/5">
            <h3 className="text-2xl font-bold mb-4 text-success">With RedditGrow Pro</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <span className="text-muted-foreground">Fully automated commenting system</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <span className="text-muted-foreground">300% increase in engagement</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <span className="text-muted-foreground">95% account safety rate</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <span className="text-muted-foreground">Advanced analytics dashboard</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;