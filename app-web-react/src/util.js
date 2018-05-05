
export const getTokenPayload = (token) => {
    const encodedPayload = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
    return JSON.parse(atob(encodedPayload));
};
