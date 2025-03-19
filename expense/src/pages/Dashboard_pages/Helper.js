export const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
};

export const getInitials = (name) => {  
    if (!name) return "";

    const nameArray = name.split(" ");
    let initials = "";
    for (let i = 0; i < nameArray.length; i++) {
        initials += nameArray[i].charAt(0);
    }
    return initials.toUpperCase();
};

// New function to validate Auth0 token
export const validateAuth0Token = (token) => {
    // Example: Basic validation, you might want to implement more checks
    if (!token) return false;
    // Check if the token has a valid format
    const re = /^[A-Za-z0-9\-._~+/]+=*$/; // Basic JWT format
    return re.test(token);
};

// New function to extract user info from Auth0 user object
export const extractUserInfo = (auth0User) => {
    if (!auth0User) return null;

    return {
        email: auth0User.email,
        name: auth0User.name,
        picture: auth0User.picture,
        initials: getInitials(auth0User.name) // Use existing function
    };
};