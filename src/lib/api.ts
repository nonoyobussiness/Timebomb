// Centralized API configuration
// Validates and constructs API base URL
const getApiBase = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  
  // If environment variable is set, use it
  if (envUrl && envUrl.trim() !== '') {
    let url = envUrl.trim();
    
    // Ensure it doesn't start with ':' (common mistake like ":5000/api")
    if (url.startsWith(':')) {
      console.warn('VITE_API_URL starts with ":", prepending http://localhost');
      url = `http://localhost${url}`;
    }
    // Ensure it has protocol
    else if (!url.startsWith('http://') && !url.startsWith('https://')) {
      console.warn('VITE_API_URL missing protocol, prepending http://');
      url = `http://${url}`;
    }
    
    // Validate the URL
    try {
      new URL(url);
      return url;
    } catch (e) {
      console.error('Invalid VITE_API_URL:', envUrl, 'Error:', e);
      console.warn('Falling back to default: http://localhost:5000/api');
    }
  }
  
  // Default fallback - always return a valid URL
  return 'http://localhost:5000/api';
};

// Get the API base URL with validation
let _apiBase: string | null = null;

const getValidatedApiBase = (): string => {
  if (_apiBase) return _apiBase;
  
  const base = getApiBase();
  
  // Validate the URL
  try {
    const url = new URL(base);
    // Ensure it's a valid HTTP/HTTPS URL
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      throw new Error(`Invalid protocol: ${url.protocol}`);
    }
    _apiBase = base;
    
    if (typeof window !== 'undefined') {
      console.log('✅ API_BASE configured:', base);
      console.log('   Protocol:', url.protocol);
      console.log('   Host:', url.host);
      console.log('   Pathname:', url.pathname);
    }
    
    return base;
  } catch (e) {
    const fallback = 'http://localhost:5000/api';
    console.error('❌ Invalid API_BASE URL:', base, e);
    console.warn('⚠️  Falling back to:', fallback);
    _apiBase = fallback;
    return fallback;
  }
};

export const API_BASE = getValidatedApiBase();

