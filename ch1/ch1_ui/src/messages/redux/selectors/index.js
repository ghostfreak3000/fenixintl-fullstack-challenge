const getStateCtx = stateTree => stateTree.messages;

export const getMessageList = stateTree =>
    getStateCtx(stateTree).allIds ? getStateCtx(stateTree).allIds : [];

export const getMessageById = (stateTree,id) =>
    getStateCtx(stateTree).byId ? {...getStateCtx(stateTree).byId[id]} : {};

export const getMessages = (stateTree) =>
    getMessageList(stateTree).map(id => getMessageById(stateTree,id));

export const getMessagesAsMap = (stateTree) =>
    getStateCtx(stateTree).byId ? getStateCtx(stateTree).byId : {};

export const getMessagesAddState = (stateTree,id) =>
    getStateCtx(stateTree).add ? {...getStateCtx(stateTree).add} : {};
