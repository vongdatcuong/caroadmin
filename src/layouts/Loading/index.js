import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = {
    display: 'block',
    left: '40%',
    top: '30%',
    zIndex: '99999'
};

export default function Loading(props){
    return (
        <div className="sweet-loading" style={{'display': (props.loading)? 'block' : 'none'}}>
            <BounceLoader
                css={override}
                size={300}
                color={"#014a0c"}
                loading={props.loading}
            />
        </div>
    );
}