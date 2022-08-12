import React, { useEffect,useRef } from 'react'
import styled from "styled-components";
import { Sidebar } from './Sidebar';
import {Navbar } from './Navbar';
import { Footer } from './Footer';
import {Body } from './Body';
import { useDispatch,useSelector } from "react-redux";
import { getusers } from '../redux/actions/action';
import { useState } from 'react';



const Container=styled.div`
  max-width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify_body{
    display: grid;
    grid-template-columns: 15vw 85vw;
    height:100%;
    width:100%;
    background:linear-gradient(transparent,rgba(0,0,0,1));
    background-color:rgb(32,87,100);
    .body{
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    }
  }
`;

export const Spotify = () => {
  const gettoken=useSelector((state)=>state.red.token)
  
  const dispatch =useDispatch()
  const bodyref=useRef();

  const [navbaground,setnavbackground]=useState(false);
  const [headerbackgound,setheaderbackground]=useState(false);

  const bodyscrolled=()=>{
    bodyref.current.scrollTop>=30?setnavbackground(true):setnavbackground(false);
    bodyref.current.scrollTop>=268?setheaderbackground(true):setheaderbackground(false);
  }
  useEffect(() => {
    dispatch(getusers(gettoken))
  },[dispatch,gettoken])
  return (
    <Container>
        <div className="spotify_body">
          <Sidebar/>
            <div className="body" ref={bodyref} onScroll={bodyscrolled}>
              <Navbar navbaground={navbaground}/>
                <div className="body_contents">
                  <Body headerbackgound={headerbackgound}/>
                </div>
            </div>
        </div>
        <div className="spotify_footer">
            <Footer/>
        </div>
    </Container>
  )
}
