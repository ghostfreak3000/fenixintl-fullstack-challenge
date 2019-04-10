const getStateCtx = stateTree => stateTree.tasks;

export const getTaskList = stateTree =>
    getStateCtx(stateTree).allIds ? getStateCtx(stateTree).allIds : [];

export const getTaskById = (stateTree,id) =>
    getStateCtx(stateTree).byId ? {...getStateCtx(stateTree).byId[id]} : {};

export const getTasks = (stateTree) =>
    getTaskList(stateTree).map(id => getTaskById(stateTree,id));

export const getTasksAsMap = (stateTree) =>
    getStateCtx(stateTree).byId ? getStateCtx(stateTree).byId : {};

export const getAddState = (stateTree,id) =>
    getStateCtx(stateTree).add ? {...getStateCtx(stateTree).add} : {};

export const getUpdateState = (stateTree,id) =>
    getStateCtx(stateTree).update ? {...getStateCtx(stateTree).update} : {};

export const getDelState = (stateTree,id) =>
    getStateCtx(stateTree).del ? {...getStateCtx(stateTree).del} : {};
