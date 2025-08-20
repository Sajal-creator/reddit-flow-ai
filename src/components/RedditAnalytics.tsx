import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, MessageCircle, Heart, Share, Calendar, Target, Zap, Award } from 'lucide-react';

const mockKarmaData = [
  { date: '2024-01-01', karma: 1200, comments: 15, posts: 3 },
  { date: '2024-01-02', karma: 1350, comments: 22, posts: 4 },
  { date: '2024-01-03', karma: 1280, comments: 18, posts: 2 },
  { date: '2024-01-04', karma: 1420, comments: 25, posts: 5 },
  { date: '2024-01-05', karma: 1580, comments: 31, posts: 6 },
  { date: '2024-01-06', karma: 1650, comments: 28, posts: 4 },
  { date: '2024-01-07', karma: 1820, comments: 35, posts: 7 },
];

const mockEngagementData = [
  { name: 'Technology', engagement: 85, karma: 450 },
  { name: 'Gaming', engagement: 92, karma: 380 },
  { name: 'Programming', engagement: 78, karma: 520 },
  { name: 'Science', engagement: 73, karma: 290 },
  { name: 'Memes', engagement: 95, karma: 180 },
];

const mockTopPosts = [
  { title: 'My first React app built in 2 hours!', subreddit: 'r/reactjs', upvotes: 1200, comments: 87, engagement: 94 },
  { title: 'Amazing AI breakthrough explained simply', subreddit: 'r/artificial', upvotes: 856, comments: 134, engagement: 89 },
  { title: 'Why TypeScript changed my life', subreddit: 'r/programming', upvotes: 642, comments: 92, engagement: 85 },
  { title: 'Free coding resources compilation', subreddit: 'r/learnprogramming', upvotes: 523, comments: 67, engagement: 82 },
];

const COLORS = ['hsl(191, 100%, 44%)', 'hsl(251, 91%, 66%)', 'hsl(158, 85%, 39%)', 'hsl(38, 92%, 50%)', 'hsl(0, 84%, 60%)'];

export default function RedditAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connected = localStorage.getItem('reddit_connected');
    setIsConnected(connected === 'true');
  }, []);

  if (!isConnected) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Reddit Growth Analytics
          </CardTitle>
          <CardDescription>
            Connect your Reddit account to view detailed analytics and growth insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="mb-4 opacity-50">
              <BarChart className="h-16 w-16 mx-auto text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">Analytics will appear here once you connect your Reddit account</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                Reddit Growth Analytics
              </CardTitle>
              <CardDescription>
                Comprehensive analysis of your Reddit growth and engagement
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={timeRange === '7d' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTimeRange('7d')}
              >
                7 Days
              </Button>
              <Button 
                variant={timeRange === '30d' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTimeRange('30d')}
              >
                30 Days
              </Button>
              <Button 
                variant={timeRange === '90d' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTimeRange('90d')}
              >
                90 Days
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Karma</p>
                <p className="text-2xl font-bold text-foreground">1,820</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+15.2%</span>
                </div>
              </div>
              <Award className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Avg. Engagement</p>
                <p className="text-2xl font-bold text-foreground">87.5%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+3.8%</span>
                </div>
              </div>
              <Zap className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Communities</p>
                <p className="text-2xl font-bold text-foreground">12</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+2</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Growth Rate</p>
                <p className="text-2xl font-bold text-foreground">12.3%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">Weekly</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Karma Growth Trend</CardTitle>
                <CardDescription>Your karma progression over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mockKarmaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="karma" 
                      stroke="hsl(var(--primary))" 
                      fill="url(#karmaGradient)" 
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient id="karmaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity Metrics</CardTitle>
                <CardDescription>Comments and posts activity</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockKarmaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="comments" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="posts" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Engagement by Community</CardTitle>
                <CardDescription>Performance across different subreddits</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockEngagementData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="engagement" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Karma Distribution</CardTitle>
                <CardDescription>Karma earned by community</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mockEngagementData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="karma"
                    >
                      {mockEngagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Performing Posts</CardTitle>
              <CardDescription>Your most successful content this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTopPosts.map((post, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">{post.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{post.subreddit}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {post.upvotes} upvotes
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {post.comments} comments
                        </div>
                      </div>
                    </div>
                    <Badge variant={post.engagement > 90 ? 'default' : post.engagement > 80 ? 'secondary' : 'outline'}>
                      {post.engagement}% engagement
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-success/30 bg-gradient-to-br from-success/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-lg text-success flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Growth Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-success mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-foreground">Your engagement rate increased by 23% this week</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-success mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-foreground">Technology posts perform 40% better than average</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-success mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-foreground">Best posting time: 2-4 PM EST</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-warning/30 bg-gradient-to-br from-warning/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-lg text-warning flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-warning mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-foreground">Focus more on r/programming for higher karma</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-warning mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-foreground">Try posting educational content on weekdays</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-warning mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-foreground">Engage more in comment discussions</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}