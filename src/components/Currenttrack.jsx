import React,{useEffect} from 'react'
import styled from "styled-components";
import { useDispatch,useSelector } from "react-redux";
import { getcurrenttrack } from '../redux/actions/action';


const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__image {
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      &__track__name {
        color: white;
      }
      &__track__artists {
        color: #b3b3b3;
      }
    }
  }
`;


export const Currenttrack = () => {
    const gettoken=useSelector((state)=>state.red.token)
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(getcurrenttrack(gettoken));
    },[dispatch,gettoken])
    const {currentPlaying}=useSelector((state)=>state.red)
  return (
    <Container>
      {currentPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={currentPlaying.image} alt="currentPlaying" />
          </div>
          <div className="track__info">
            <h4 className="track__info__track__name">{currentPlaying.name}</h4>
            <h6 className="track__info__track__artists">
              {currentPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
      )}
    </Container>
  )
}
