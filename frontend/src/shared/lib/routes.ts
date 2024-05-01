export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  SIGNIN: "/auth/signin",
  SIGNUP: "/auth/signup",
  SIGNOUT: "/auth/signout",
};

// That only be accessible when authorized
export const ROUTES_PROTECTED = [ROUTES.DASHBOARD];

// That only be accessible when non-authorized
export const ROUTES_GUEST_ONLY = [ROUTES.SIGNIN, ROUTES.SIGNUP, ROUTES.SIGNOUT];
