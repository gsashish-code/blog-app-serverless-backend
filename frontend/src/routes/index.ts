const SIGN_UP_ROUTES = "signup"
const SIGN_IN_ROUTES = "signin"
const BLOG_ROUTES = "blogs"
const CREATE_ROUTES = "create-blogs"

export const ROUTES = {
    public: {
        signup: {
            pathName: `${SIGN_UP_ROUTES}`,
            absolute: `/${SIGN_UP_ROUTES}`
        },
        signin: {
            pathName: `${SIGN_IN_ROUTES}`,
            absolute: `/${SIGN_IN_ROUTES}`
        },
    },
    private: {
        blog: {
            view: {
                pathName: `${BLOG_ROUTES}`,
                absolute: `/${BLOG_ROUTES}`
            },
            all: {
                pathName: `${BLOG_ROUTES}`,
                absolute: `/${BLOG_ROUTES}`
            },
            create: {
                pathName: `${CREATE_ROUTES}`,
                absolute: `/${CREATE_ROUTES}`
            }
        }
    }
}