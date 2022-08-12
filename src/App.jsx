import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";

import { Login } from "./components/login/Login";
import { Spotify } from "./components/Spotify";
import { tokenaction } from "./redux/actions/action";


function App() {
  const dispatch=useDispatch()
  const gettoken=useSelector((state)=>state.red.token)
  

  useEffect(()=>{
    const hash=window.location.hash;
    if(hash){
      const token=hash.substring(1).split("&")[0].split("=")[1];
      dispatch(tokenaction(token))
    }
  },[dispatch]);
  return (
    <div className="App">
      <div>
        {gettoken!==null?<Spotify/>:<Login/>}
      </div>
      
    </div>
  );
}

export default App;
