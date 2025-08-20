import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function RedditCallback() {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const { search } = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const query = new URLSearchParams(search);
        const code = query.get("code");
        const error = query.get("error");
        const state = query.get("state");
        
        console.log('OAuth callback received:', { code: code ? 'present' : 'missing', error, state });
        
        // Verify state parameter for CSRF protection
        const storedState = localStorage.getItem('reddit_oauth_state');
        console.log('State validation:', { received: state, stored: storedState });
        
        if (!state || !storedState || state !== storedState) {
          console.error('State parameter mismatch or missing');
          throw new Error('Invalid state parameter. Possible CSRF attack.');
        }
        
        // Clean up stored state
        localStorage.removeItem('reddit_oauth_state');

        if (error) {
          setErrorMessage(`Authorization failed: ${error}`);
          setStatus('error');
          toast({
            title: "Connection Failed",
            description: "You denied the Reddit authorization request.",
            variant: "destructive",
          });
          return;
        }

        if (!code) {
          throw new Error('No authorization code received');
        }

        console.log('Exchanging code for token...');
        
        // Call our Supabase Edge Function to exchange code for token
        const { data, error: functionError } = await supabase.functions.invoke('reddit-oauth', {
          body: { 
            code,
            redirectUri: `${window.location.origin}/dashboard/callback`
          }
        });

        if (functionError) {
          throw new Error(functionError.message || 'Failed to exchange authorization code');
        }

        if (data.success) {
          setStatus('success');
          
          // Store Reddit connection data in localStorage
          localStorage.setItem('reddit_connected', 'true');
          localStorage.setItem('reddit_user', JSON.stringify(data.user));
          localStorage.setItem('reddit_tokens', JSON.stringify(data.tokens));
          
          toast({
            title: "Successfully Connected!",
            description: `Connected Reddit account: u/${data.user.username}`,
          });
          
          // Redirect back to dashboard after 3 seconds
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        } else {
          throw new Error(data.message || 'Unknown error occurred');
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
        setStatus('error');
        toast({
          title: "Connection Error",
          description: "Failed to connect your Reddit account. Please try again.",
          variant: "destructive",
        });
      }
    };

    handleCallback();
  }, [search, navigate, toast]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-foreground">Reddit Connection</CardTitle>
          <CardDescription>
            {status === 'processing' && 'Processing your Reddit connection...'}
            {status === 'success' && 'Successfully connected your Reddit account!'}
            {status === 'error' && 'Failed to connect your Reddit account'}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {status === 'processing' && (
            <div className="space-y-4">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Connecting your Reddit account...
              </p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="space-y-4">
              <CheckCircle className="mx-auto h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-green-600 font-medium">
                  Successfully connected!
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Redirecting to dashboard...
                </p>
              </div>
            </div>
          )}
          
          {status === 'error' && (
            <div className="space-y-4">
              <XCircle className="mx-auto h-8 w-8 text-red-500" />
              <div>
                <p className="text-sm text-red-600 font-medium">
                  Connection failed
                </p>
                {errorMessage && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {errorMessage}
                  </p>
                )}
              </div>
              <Button 
                onClick={() => navigate('/dashboard')}
                variant="outline"
                size="sm"
              >
                Back to Dashboard
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}