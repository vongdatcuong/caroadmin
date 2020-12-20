import React, {useContext} from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { loadingStore } from "../../../context/loading-context";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = {
    display: 'block',
    left: '40%',
    top: '30%',
    zIndex: '99999'
};

 const Loading = (props) => {
    const { loadingState, dispatchLoading } = useContext(loadingStore);
    return (
        <div className="sweet-loading" style={{'display': (loadingState.isLoading)? 'block' : 'none'}}>
            <BounceLoader
                css={override}
                size={300}
                color={"#014a0c"}
                loading={loadingState.isLoading}
            />
        </div>
    );
}

export default Loading;