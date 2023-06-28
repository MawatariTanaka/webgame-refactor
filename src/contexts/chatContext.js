import { createContext, useReducer } from "react";

const initialState = {
    showRoomDetail: false,
    currentRoomId: "",
    goingToAddRoom: "",
    goingToBan: "",
};

const chatReducer = (state, action) => {
    switch (action.type) {
        case "SET_ADD_ROOM":
            return {
                ...state,
                goingToAddRoom: action.payload[0],
            };
        case "CHANGE_ROOM":
            return {
                ...state,
                currentRoomId: action.payload,
            };
        case "CHANGE_SHOW_STATUS":
            return {
                ...state,
                showRoomDetail: action.payload,
            };
        case "CHANGE_GOING_TO_BAN":
            return {
                ...state,
                goingToBan: action.payload,
            };
        default:
            return state;
    }
};

export const ChatContext = createContext(initialState);

export const ChatProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, initialState);
    return (
        <ChatContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};
