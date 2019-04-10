const getStateCtx = stateTree => stateTree.login;

export const getRunning = (stateTree) =>
    getStateCtx(stateTree).running ? getStateCtx(stateTree).running : false;

export const getStatus = (stateTree) =>
    getStateCtx(stateTree).status ? getStateCtx(stateTree).status : "n/a";

export const getLoggedIn = (stateTree) =>
    getStateCtx(stateTree).loggedIn ? getStateCtx(stateTree).loggedIn : false;

export const getCard = (stateTree) =>
    getStateCtx(stateTree).card ? getStateCtx(stateTree).card : {};

export const getMessage = (stateTree) =>
    getStateCtx(stateTree).message ? getStateCtx(stateTree).message : {};
