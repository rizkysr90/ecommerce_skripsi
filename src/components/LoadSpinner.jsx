import React from 'react'
import { BeatLoader } from 'react-spinners'
export default function LoadSpinner(props) {
    const override = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left:"0",
        top:"0",
        backgroundColor:"white",
        width: "100%",
        zIndex: "99",
        height: '100vh',
        margin: "0 auto",
    };
  return (
    <>
        <BeatLoader
            color={'#2F56AA'}
            loading={props.isLoading}
            cssOverride={override}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
        /> 
    </>
  )
}
