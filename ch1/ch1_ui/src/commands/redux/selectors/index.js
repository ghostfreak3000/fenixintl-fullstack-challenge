const getStateCtx = stateTree => stateTree.commands;

export const getCommandsRunState = (stateTree,id) =>
    getStateCtx(stateTree).run ? {...getStateCtx(stateTree).run} : {};

export default {getCommandsRunState}