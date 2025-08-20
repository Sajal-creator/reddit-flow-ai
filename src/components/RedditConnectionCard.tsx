import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function RedditConnectionCard() {
  const [isRedditConnected, setIsRedditConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [redditUser, setRedditUser] = useState<any>(null);
  const { toast } = useToast();

  // Check for existing Reddit connection on component mount
  useEffect(() => {
    const connected = localStorage.getItem('reddit_connected');
    const userData = localStorage.getItem('reddit_user');
    
    if (connected === 'true' && userData) {
      try {
        const user = JSON.parse(userData);
        setIsRedditConnected(true);
        setRedditUser(user);
      } catch (error) {
        console.error('Error parsing Reddit user data:', error);
        // Clear invalid data
        localStorage.removeItem('reddit_connected');
        localStorage.removeItem('reddit_user');
        localStorage.removeItem('reddit_tokens');
      }
    }
  }, []);

  function connectToReddit() {
    setIsConnecting(true);
    
    try {
      // Generate a random state parameter for CSRF protection
      const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('reddit_oauth_state', state);
      
      const clientId = 'SaEbGocDq6S-Nbjnpaazcw';
      // Use current domain for redirect URI
      const redirectUri = `${window.location.origin}/dashboard/callback`;
      const scopes = 'identity,submit,save,read';
      
      console.log('Starting Reddit OAuth with redirect URI:', redirectUri);
      console.log('Generated state:', state);
      
      const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}&duration=permanent&scope=${scopes}`;
      
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error starting Reddit OAuth:', error);
      setIsConnecting(false);
      toast({
        title: "Connection Error",
        description: "Failed to start Reddit connection. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-foreground flex items-center gap-2">
              Connect Your Reddit Account
              {isRedditConnected ? (
                <Badge variant="default" className="bg-green-500">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              ) : (
                <Badge variant="secondary">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Not Connected
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Connect your Reddit account to start automating your growth and engagement
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!isRedditConnected ? (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">Required permissions:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li><strong>Identity:</strong> Get your user information</li>
                <li><strong>Submit:</strong> Submit links and comments</li>
                <li><strong>Save:</strong> Save posts and comments</li>
                <li><strong>Read:</strong> Read posts and comments</li>
              </ul>
            </div>
            <Button 
              onClick={connectToReddit}
              disabled={isConnecting}
              variant="hero"
              size="lg"
              className="w-full sm:w-auto"
            >
              {isConnecting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Connect to Reddit
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p className="text-green-600 font-medium">✓ Your Reddit account is connected and ready!</p>
              {redditUser && (
                <div className="mt-3 p-3 bg-muted rounded-lg">
                  <p className="font-medium">u/{redditUser.username}</p>
                  <div className="flex gap-4 text-xs mt-1">
                    <span>Total Karma: {redditUser.karma || 0}</span>
                    <span>Link: {redditUser.link_karma || 0}</span>
                    <span>Comment: {redditUser.comment_karma || 0}</span>
                  </div>
                </div>
              )}
              <p className="mt-2">You can now start automating your Reddit growth.</p>
            </div>
            <Button 
              onClick={() => {
                localStorage.removeItem('reddit_connected');
                localStorage.removeItem('reddit_user');
                localStorage.removeItem('reddit_tokens');
                setIsRedditConnected(false);
                setRedditUser(null);
                toast({
                  title: "Disconnected",
                  description: "Reddit account has been disconnected.",
                });
              }}
              variant="outline"
              size="sm"
            >
              Disconnect Account
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}