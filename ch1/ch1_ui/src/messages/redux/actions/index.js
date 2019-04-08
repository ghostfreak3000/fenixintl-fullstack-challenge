import {
    MESSAGES_ADD_MESSAGE_FAIL,
    MESSAGES_ADD_MESSAGE_START,
    MESSAGES_ADD_MESSAGE_SUCCESS,
    MESSAGES_GET_MESSAGES_FAIL,
    MESSAGES_GET_MESSAGES_START,
    MESSAGES_GET_MESSAGES_SUCCESS,
    MESSAGES_SET_MESSAGES,
    MESSAGES_UPDATE_MESSAGE_FAIL,
    MESSAGES_UPDATE_MESSAGE_START,
    MESSAGES_UPDATE_MESSAGE_SUCCESS,
    MESSAGES_UPDATE_MESSAGES,
    MESSAGES_DEL_MESSAGE_FAIL,
    MESSAGES_DEL_MESSAGE_START,
    MESSAGES_DEL_MESSAGE_SUCCESS
} from "../actionTypes/index";

// ============ ADD ================
export const addMessageStart = (message) => ({
    type:MESSAGES_ADD_MESSAGE_START
});

export const addMessageSuccess = (message) => ({
    type:MESSAGES_ADD_MESSAGE_SUCCESS,
    payload:message
});

export const addMessageFail = (message) => ({
    type:MESSAGES_ADD_MESSAGE_FAIL
});

export const addMessage = (message) => (dispatch) => {
    dispatch(addMessageStart());
    dispatch(addMessageSuccess(message));
    dispatch(updateMessages([message]));
    // api.messages.add(_message)
    //     .then((message)=>{
    //         dispatch(addMessageSuccess(message));
    //         dispatch(updateMessages([message]));
    //     })
    //     .catch(()=>{
    //         dispatch(addMessageFail());
    //     });
};

// ============ GET ================
export const getMessagesStart = (message) => ({
    type:MESSAGES_GET_MESSAGES_START
});

export const getMessagesSuccess = (message) => ({
    type:MESSAGES_GET_MESSAGES_SUCCESS
});

export const getMessagesFail = (message) => ({
    type:MESSAGES_GET_MESSAGES_FAIL
});

// export const getMessages = (_message) => (dispatch) => {
//     dispatch(getMessagesStart());
//     api.messages.get()
//         .then((messages)=>{
//             dispatch(getMessagesSuccess());
//             dispatch(setMessages(messages));
//         })
//         .catch(()=>{
//             dispatch(getMessagesFail());
//         });
// };

export const setMessages = (messages) => ({
    type:MESSAGES_SET_MESSAGES,
    payload:messages
});

// ============ UPDATE ================

export const updateMessageStart = (message) => ({
    type:MESSAGES_UPDATE_MESSAGE_START
});

export const updateMessageSuccess = (message) => ({
    type:MESSAGES_UPDATE_MESSAGE_SUCCESS
});

export const updateMessageFail = (message) => ({
    type:MESSAGES_UPDATE_MESSAGE_FAIL
});

// export const updateMessage = (_message) => (dispatch,getState) => {
//     const state = getState();
//     const message = getMessageById(state,_message["_id"]);
//
//     _message["created_at"] = message["created_at"];
//     _message["created_at_ms"] = message["created_at_ms"];
//
//     const shouldUpdate = !deepEql(message,_message);
//
//     if(shouldUpdate){
//         console.log("Old message : ",message)
//         console.log("New message : ",_message)
//         dispatch(updateMessageStart());
//         api.messages.replace({
//             oldMessage:message,
//             newMessage:_message
//         })
//         .then(()=>{
//             dispatch(updateMessageSuccess());
//             dispatch(updateMessages([_message]));
//         })
//         .catch((err)=>{
//             dispatch(updateMessageFail());
//         });
//     }
//
// };

export const updateMessages = (messages) => ({
    type:MESSAGES_UPDATE_MESSAGES,
    payload:messages
});

// ============ DEL ================
export const delMessageStart = (message) => ({
    type:MESSAGES_DEL_MESSAGE_START
});

export const delMessageSuccess = (message) => ({
    type:MESSAGES_DEL_MESSAGE_SUCCESS
});

export const delMessageFail = (message) => ({
    type:MESSAGES_DEL_MESSAGE_FAIL
});

// export const delMessage = (_message) => (dispatch) => {
//     dispatch(delMessageStart());
//     api.messages.del(_message)
//         .then(()=>{
//             dispatch(delMessageSuccess());
//             dispatch(getMessages());
//         })
//         .catch(()=>{
//             dispatch(delMessageFail());
//         });
// };