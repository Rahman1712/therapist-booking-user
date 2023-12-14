
// export const API_BASE_URL = "https://user.medicarehealth.website:8080/users";
export const API_BASE_URL = import.meta.env.VITE_USER_BASE_URL;

export const ACCESS_TOKEN = "accessToken";

// export const OAUTH2_REDIRECT_URI = "https://medicare-eta.vercel.app/oauth2/redirect";
export const OAUTH2_REDIRECT_URI = import.meta.env.VITE_OAUTH_URI;

export const GOOGLE_AUTH_URL = API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI + "&user_role=";

// export const GOOGLE_AUTH_URL_USER = API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI + "&user_role=USER";
// export const GOOGLE_AUTH_URL_THERAIST = API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI + "&user_role=THERAPIST";

// export const FACEBOOK_AUTH_URL = API_BASE_URL + "/oauth2/authorize/facebook?redirect_uri=" + OAUTH2_REDIRECT_URI;
// export const GITHUB_AUTH_URL = API_BASE_URL + "/oauth2/authorize/github?redirect_uri=" + OAUTH2_REDIRECT_URI;


export const THERAPIST_PUBLIC_API = '/api/v1/public';
export const THERAPIST_AUTH_API = '/api/v1/auth';
export const THERAPIST_PRIVATE_API = '/api/v1/private';
export const THERAPIST_SLOTS_API = '/api/v1/therapist-availability-slots';

export const USER_API = '/api/v1/user'; // in user
export const USER_BOOKING_API = '/api/v1/therapist_booking'; // in user

export const THERAPIST_BOOKING_API = '/api/v1/bookings'; // in therapist

export const REVIEW_API = '/api/v1/reviews'; // in therapist , in user

export const PAYMENT_API = '/api/v1/payments';  // in therapist

export const CHAT_MESSAGES_API = '/api/v1/messages';  // in therapist

export const USER_CHAT_MESSAGES_API = '/api/v1/user-messages';  // in user

// export const WEBSOCKET_URI = 'http://localhost:8082/therapists/ws';
export const WEBSOCKET_URI = import.meta.env.VITE_WEBSOCKET_URI;