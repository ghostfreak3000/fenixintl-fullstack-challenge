const getStateCtx = stateTree => stateTree.signup;

export const getRunning = (stateTree) =>
    getStateCtx(stateTree).running ? getStateCtx(stateTree).running : false;

export const getStatus = (stateTree) =>
    getStateCtx(stateTree).status ? getStateCtx(stateTree).status : false;

export const getMessage = (stateTree) =>
    getStateCtx(stateTree).message ? getStateCtx(stateTree).message : false;
