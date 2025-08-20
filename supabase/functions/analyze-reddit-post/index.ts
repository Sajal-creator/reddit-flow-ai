import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

function extractPostInfo(url: string) {
  // Extract subreddit and post ID from Reddit URL
  const match = url.match(/\/r\/([^\/]+)\/comments\/([^\/]+)/);
  if (!match) {
    throw new Error('Invalid Reddit URL format');
  }
  return {
    subreddit: match[1],
    postId: match[2]
  };
}

function parseComments(commentData: any[], depth = 0): Comment[] {
  const comments: Comment[] = [];
  
  for (const item of commentData) {
    if (item.kind === 't1' && item.data) {
      const comment = item.data;
      
      // Skip deleted/removed comments
      if (comment.body === '[deleted]' || comment.body === '[removed]') {
        continue;
      }
      
      const parsedComment: Comment = {
        id: comment.id,
        author: comment.author || 'deleted',
        body: comment.body || '',
        score: comment.score || 0,
        created_utc: comment.created_utc || 0,
      };
      
      // Parse replies if they exist and we're not too deep
      if (comment.replies && comment.replies.data && comment.replies.data.children && depth < 2) {
        parsedComment.replies = parseComments(comment.replies.data.children, depth + 1);
      }
      
      comments.push(parsedComment);
    }
  }
  
  return comments.sort((a, b) => b.score - a.score); // Sort by score descending
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { postUrl } = await req.json();
    
    if (!postUrl) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Post URL is required' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Analyzing Reddit post:', postUrl);

    // Extract post information from URL
    const { subreddit, postId } = extractPostInfo(postUrl);
    
    // Construct Reddit API URL
    const apiUrl = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json?limit=50&sort=top`;
    
    console.log('Fetching from Reddit API:', apiUrl);

    // Fetch post and comments from Reddit API
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'RedditGrowPro:1.0 (by /u/RedditGrowProBot)',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('Reddit API error:', response.status, response.statusText);
      throw new Error(`Reddit API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Reddit API response received');

    // Validate response structure
    if (!Array.isArray(data) || data.length < 2) {
      console.error('Invalid Reddit API response structure');
      throw new Error('Invalid response from Reddit API');
    }

    // Extract post data from the first element
    const postListing = data[0];
    if (!postListing.data || !postListing.data.children || !postListing.data.children[0]) {
      throw new Error('Post data not found in Reddit API response');
    }

    const postDataRaw = postListing.data.children[0].data;
    const postData: PostData = {
      title: postDataRaw.title || 'No title',
      author: postDataRaw.author || 'deleted',
      subreddit: postDataRaw.subreddit || subreddit,
      score: postDataRaw.score || 0,
      num_comments: postDataRaw.num_comments || 0,
      created_utc: postDataRaw.created_utc || 0,
      selftext: postDataRaw.selftext || '',
      url: postDataRaw.url || postUrl,
      upvote_ratio: postDataRaw.upvote_ratio || 0.5
    };

    console.log('Post data extracted:', {
      title: postData.title.substring(0, 50) + '...',
      score: postData.score,
      comments: postData.num_comments
    });

    // Extract comments from the second element
    let comments: Comment[] = [];
    const commentsListing = data[1];
    if (commentsListing && commentsListing.data && commentsListing.data.children) {
      comments = parseComments(commentsListing.data.children);
      console.log(`Parsed ${comments.length} comments`);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      post: postData,
      comments: comments.slice(0, 20) // Limit to top 20 comments for performance
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error analyzing Reddit post:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message || 'Failed to analyze Reddit post'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});