import { CorsOptions } from "cors";

// Define allowed origins with a explicit type
const allowedOrigins: RegExp[] = [/^(https?:\/\/)?([\w-]+\.)*narendrak\.in$/];

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    // Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) {
      return callback(null, true);
    }

    const isAllowed = allowedOrigins.some((regex) => regex.test(origin)) || 
                      origin.includes('localhost');

    if (isAllowed) {
      callback(null, true);
    } else {
      // You can pass a specific error message for better debugging
      callback(new Error('Origin not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-tenant-slug'],
};

export {
  corsOptions
}