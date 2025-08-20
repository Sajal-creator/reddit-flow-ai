import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, redirectUri } = await req.json();
    
    if (!code) {
      throw new Error('No authorization code provided');
    }

    if (!redirectUri) {
      throw new Error('No redirect URI provided');
    }

    console.log('Processing Reddit OAuth with code:', code.substring(0, 10) + '...');
    console.log('Using redirect URI:', redirectUri);

    // Reddit OAuth credentials
    const clientId = 'SaEbGocDq6S-Nbjnpaazcw';
    const clientSecret = 'YRWpayfz9qBi0hABCWRjKm1zXgYsKw';

    // Encode credentials for Basic Auth
    const encodedCredentials = btoa(`${clientId}:${clientSecret}`);

    // Exchange authorization code for access token
    console.log('Exchanging code for access token...');
    const tokenResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'RedditGrowPro/1.0 by YourUsername'
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token exchange failed:', errorText);
      throw new Error(`Token exchange failed: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    console.log('Token exchange successful');

    if (tokenData.error) {
      throw new Error(`Reddit API error: ${tokenData.error}`);
    }

    // Get user information using the access token
    console.log('Fetching user information...');
    const userResponse = await fetch('https://oauth.reddit.com/api/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'User-Agent': 'RedditGrowPro/1.0 by YourUsername'
      }
    });

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error('User info fetch failed:', errorText);
      throw new Error(`User info fetch failed: ${userResponse.status}`);
    }

    const userData = await userResponse.json();
    console.log('User information fetched successfully for:', userData.name);

    // TODO: Store user data and tokens in Supabase database
    // This would typically involve:
    // 1. Getting the current authenticated user
    // 2. Storing the Reddit tokens and user info in a user_reddit_connections table
    // 3. Associating it with the current Supabase user

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Reddit account connected successfully',
        user: {
          id: userData.id,
          username: userData.name,
          karma: userData.total_karma || (userData.link_karma + userData.comment_karma),
          link_karma: userData.link_karma || 0,
          comment_karma: userData.comment_karma || 0,
          created_utc: userData.created_utc
        },
        tokens: {
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_in: tokenData.expires_in
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Reddit OAuth error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || 'Unknown error occurred'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
})