export const reducer = (state, action) => {
    switch (action.type) {
        case "GET-ORDER":
            return {
                ...state,
                order_data: action.payload.getallorder,
                total_order: action.payload.getallorder.length,
                // time: action.payload.getallorder.time
            }
        case "STATUS-UPDATE":
            return {
                ...state,
                order_state:action.payload
            }    

        default:
            return state

    }
}


