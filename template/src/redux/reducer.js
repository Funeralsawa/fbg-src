import Actions from "./action";

const reducer = (state={targetNode: null, toc: [], id: ""}, action) => {
    switch(action.type) {
        case Actions.CT_TOC:
            return {
                ...state,
                targetNode: action.payload
            };
        case Actions.SET_TOC:
            return {
                ...state,
                toc: action.payload
            }

        case Actions.SET_ID:
            return {
                ...state,
                id: action.payload
            }
        default:
            return state;
    }
}

export default reducer;