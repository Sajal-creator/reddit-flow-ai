import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link, MessageCircle, TrendingUp, Clock, User, ThumbsUp, ThumbsDown, ExternalLink, Search, BarChart3 } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  body: string;
  score: number;
  created_utc: number;
  replies?: Comment[];
}

interface PostData {
  title: string;
  author: string;
  subreddit: string;
  score: number;
  num_comments: number;
  created_utc: number;
  selftext: string;
  url: string;
  upvote_ratio: number;
}

export default function PostAnalyzer() {
  const [postUrl, setPostUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState<PostData | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const analyzePost = async () => {
    if (!postUrl.trim()) {
      setError('Please enter a Reddit post URL');
      return;
    }

    // Validate Reddit URL
    const redditUrlPattern = /^https?:\/\/(www\.)?reddit\.com\/r\/[^\/]+\/comments\/[^\/]+/;
    if (!redditUrlPattern.test(postUrl)) {
      setError('Please enter a valid Reddit post URL');
      return;
    }

    setLoading(true);
    setError('');
    setPostData(null);
    setComments([]);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('analyze-reddit-post', {
        body: { postUrl }
      });

      if (functionError) throw functionError;

      if (data.success) {
        setPostData(data.post);
        setComments(data.comments || []);
        toast({
          title: "Analysis Complete!",
          description: `Analyzed ${data.comments?.length || 0} comments from the post.`,
        });
      } else {
        throw new Error(data.error || 'Failed to analyze post');
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze the Reddit post. Please try again.');
      toast({
        title: "Analysis Failed",
        description: "Could not analyze the Reddit post. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;
    
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const getEngagementLevel = (score: number, numComments: number) => {
    const engagement = score + (numComments * 2);
    if (engagement > 1000) return { level: 'High', variant: 'default' as const, color: 'text-success' };
    if (engagement > 100) return { level: 'Medium', variant: 'secondary' as const, color: 'text-warning' };
    return { level: 'Low', variant: 'outline' as const, color: 'text-muted-foreground' };
  };

  const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => (
    <div className={`${depth > 0 ? 'ml-4 border-l border-border pl-4' : ''} mb-4`}>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <User className="h-3 w-3" />
          <span className="font-medium">u/{comment.author}</span>
          <Clock className="h-3 w-3" />
          <span>{formatTimeAgo(comment.created_utc)}</span>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span className={comment.score > 0 ? 'text-success' : comment.score < 0 ? 'text-destructive' : 'text-muted-foreground'}>
              {comment.score}
            </span>
          </div>
        </div>
        <p className="text-sm text-foreground leading-relaxed">{comment.body}</p>
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3">
            {comment.replies.slice(0, 3).map((reply) => (
              <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
            ))}
            {comment.replies.length > 3 && (
              <p className="text-xs text-muted-foreground ml-4">
                +{comment.replies.length - 3} more replies...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl text-foreground flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Reddit Post Analyzer
        </CardTitle>
        <CardDescription>
          Analyze any Reddit post to get insights on engagement, comments, and performance
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* URL Input */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Enter Reddit post URL (e.g., https://reddit.com/r/programming/comments/...)"
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                className="bg-background"
              />
            </div>
            <Button 
              onClick={analyzePost}
              disabled={loading}
              variant="hero"
              className="px-6"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Analyze Post
                </>
              )}
            </Button>
          </div>
          
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              {error}
            </div>
          )}
        </div>

        {/* Post Analysis Results */}
        {postData && (
          <div className="space-y-6">
            <Separator />
            
            {/* Post Details */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{postData.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>u/{postData.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>r/{postData.subreddit}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatTimeAgo(postData.created_utc)}</span>
                    </div>
                  </div>
                  {postData.selftext && (
                    <p className="text-sm text-foreground bg-muted/30 p-3 rounded-lg mb-3 line-clamp-3">
                      {postData.selftext}
                    </p>
                  )}
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={postData.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Original
                  </a>
                </Button>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <ThumbsUp className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium text-muted-foreground">Score</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{postData.score.toLocaleString()}</p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">Comments</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{postData.num_comments.toLocaleString()}</p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-muted-foreground">Upvote %</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{Math.round(postData.upvote_ratio * 100)}%</p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <BarChart3 className="h-4 w-4 text-warning" />
                    <span className="text-sm font-medium text-muted-foreground">Engagement</span>
                  </div>
                  <Badge 
                    variant={getEngagementLevel(postData.score, postData.num_comments).variant}
                    className="text-xs"
                  >
                    {getEngagementLevel(postData.score, postData.num_comments).level}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            {comments.length > 0 && (
              <div className="space-y-4">
                <Separator />
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-foreground">Top Comments</h4>
                  <Badge variant="outline">
                    {comments.length} comments loaded
                  </Badge>
                </div>
                
                <ScrollArea className="max-h-96 w-full">
                  <div className="space-y-4 pr-4">
                    {comments.slice(0, 10).map((comment) => (
                      <CommentItem key={comment.id} comment={comment} />
                    ))}
                    {comments.length > 10 && (
                      <div className="text-center py-4">
                        <Badge variant="secondary">
                          +{comments.length - 10} more comments available
                        </Badge>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Analyzing Reddit post and fetching comments...</p>
          </div>
        )}

        {/* Empty State */}
        {!postData && !loading && (
          <div className="text-center py-8">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-2">Enter a Reddit post URL to start analyzing</p>
            <p className="text-xs text-muted-foreground">
              Get insights on engagement, comments, and post performance
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}