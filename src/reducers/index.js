const reducer = (state,action) => { 
    switch(action.type){
        case 'SET_FAVORITE':
            return {
                ...state,
                favList:[...state.favList, action.payload]
            }
        case 'DELEATE_FAVORITE':
            return {
                ...state,
                favList: state.favList.filter(items => items.id !== action.payload)
            }
        default:
            return state
    }
    
}

export default reducer 