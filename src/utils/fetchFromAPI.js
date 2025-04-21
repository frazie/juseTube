import axios from 'axios'

const BASE_URL = 'https://youtube-v31.p.rapidapi.com'

const options = {
    params: {
      maxResults: '25'
    },
    headers: {
      'X-CACHEBYPASS': '5',
      'X-RapidAPI-Key':process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host':'youtube-v31.p.rapidapi.com'
    }
};

// Rate limiting configuration
const RATE_LIMIT_MS = 1000; // 1 request per second
let lastRequestTime = 0;
const requestQueue = [];
let processingQueue = false;

// Process the queue of pending requests
const processQueue = async () => {
    if (processingQueue || requestQueue.length === 0) return;
    
    processingQueue = true;
    
    while (requestQueue.length > 0) {
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime;
        
        // If we need to wait to respect rate limit
        if (timeSinceLastRequest < RATE_LIMIT_MS) {
            const waitTime = RATE_LIMIT_MS - timeSinceLastRequest;
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
        
        const { url, resolve, reject } = requestQueue.shift();
        
        try {
            lastRequestTime = Date.now();
            const { data } = await axios.get(`${BASE_URL}/${url}`, options);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    }
    
    processingQueue = false;
};

export const fetchFromAPI = async (url) => {
    return new Promise((resolve, reject) => {
        requestQueue.push({ url, resolve, reject });
        processQueue();
    });
}
