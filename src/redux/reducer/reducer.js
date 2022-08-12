

export const reducerss=(state={
    token:null,playlist:[],
    userinfo:null,
    selectedplaylist:null,
    currentPlaying:null,
    playerState:false,
    selectedplaylistid:"7GHZyru8DtMswNeHnEwl1S"
},action)=>{
    
    switch(action.type){
        case "SET TOKEN":
            return {
            ...state,
            token:action.payload
        }
        case "SET PLAYLIST":
            return {
                ...state,
                playlist:action.payload
        }
        case "GET USERINFO":
            return {
                ...state,
                userinfo:action.payload
            }
        case "SET SONGS":
            return {
                ...state,
                selectedplaylist:action.payload
            }

        case "SET_PLAYING":
            return {
                ...state,
                currentPlaying:action.payload
            }

        case "SET_PLAYER_STATE":
            return {
                ...state,
                playerState:action.payload
            }
        default:return state
    }
}