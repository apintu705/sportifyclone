import axios from "axios";


export const tokenaction=(token)=>async(dispatch)=>{
    
    dispatch({type:"SET TOKEN",payload:token})
}

export const getplaylist=(token)=>async(dispatch)=>{
    
    const res=await axios.get( "https://api.spotify.com/v1/me/playlists",
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
    
    const {items}=res.data
    const playlists=items.map(({name,id})=>{return {name,id}});

    dispatch({type:"SET PLAYLIST",payload:playlists})
}

export const getusers=(token)=>async(dispatch)=>{
  const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
  
      const userinfo={
        userid:data.id,
        username:data.display_name,

      }
      dispatch({type:"GET USERINFO",payload:userinfo})
}

export const getinitialplaylist=(token,selectedPlaylistId)=>async(dispatch)=>{
  const response = await axios.get(
    `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    }

  );

  const selectedPlaylist = {
    id: response.data.id,
    name: response.data.name,
    description: response.data.description.startsWith("<a")
      ? ""
      : response.data.description,
    image: response.data.images[0].url,
    tracks: response.data.tracks.items.map(({ track }) => ({
      id: track.id,
      name: track.name,
      artists: track.artists.map((artist) => artist.name),
      image: track.album.images[2].url,
      duration: track.duration_ms,
      album: track.album.name,
      context_uri: track.album.uri,
      track_number: track.track_number,
    })),
  };
  dispatch({type:"SET SONGS",payload:selectedPlaylist })
}

export const getcurrenttrack=(token)=>async(dispatch)=>{
  const response = await axios.get(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    }
    
  );
  if (response.data !== "") {
    const currentPlaying = {
      id: response.data.item.id,
      name: response.data.item.name,
      artists: response.data.item.artists.map((artist) => artist.name),
      image: response.data.item.album.images[2].url,
    };
    dispatch({ type:"SET_PLAYING", payload:currentPlaying });
  } else {
    dispatch({ type:"SET_PLAYING", payload:null });
  }


  
}

export const getchangetrack=(token,type)=>async(dispatch)=>{
  await axios.post(
    `https://api.spotify.com/v1/me/player/${type}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  const response1 = await axios.get(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );
  if (response1.data !== "") {
    const currentPlaying = {
      id: response1.data.item.id,
      name: response1.data.item.name,
      artists: response1.data.item.artists.map((artist) => artist.name),
      image: response1.data.item.album.images[2].url,
    };
    dispatch({ type:"SET_PLAYING", payload:currentPlaying });
  } else {
    dispatch({ type:"SET_PLAYING", payload:null });
  }
}
