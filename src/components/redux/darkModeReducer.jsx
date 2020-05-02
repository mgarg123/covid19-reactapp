const DARK_MODE = "DARK_MODE"       //TYPE


export function switchDarkMode(isDark) {          //Action
    return {
        type: DARK_MODE,
        payload: isDark
    }
}

const initialDarkState = {
    isDark: true
}

export const darkModeReducer = (state = initialDarkState, action) => {      //Reducer
    switch (action.type) {
        case DARK_MODE:
            return {
                ...state,
                isDark: action.payload
            }
        default:
            return state
    }
}

export default darkModeReducer