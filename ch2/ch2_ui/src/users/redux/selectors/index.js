const getStateCtx = stateTree => stateTree.user;

export const getCard = (stateTree) =>
    getStateCtx(stateTree).card ? getStateCtx(stateTree).card : {};

export const getLoggedIn = (stateTree) =>
    getStateCtx(stateTree).loggedIn ? getStateCtx(stateTree).loggedIn : false;

