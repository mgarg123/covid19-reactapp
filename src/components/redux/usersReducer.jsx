const USERS_LOCATION = "USERS_LOCATION"

export function usersLocation(location) {
    return {
        type: USERS_LOCATION,
        payload: location
    }
}

const initialState = {
    location: {
        country: "",
        state: "",
        district: ""
    }
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERS_LOCATION:
            return {
                ...state,
                location: action.payload
            }
        default:
            return state
    }
}

export default usersReducer