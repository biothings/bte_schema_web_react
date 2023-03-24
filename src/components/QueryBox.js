import React from 'react';
import CytoNetwork from './CytoNetwork';
import { useDispatch } from "react-redux";
import { selectQuery } from "../store";

function QueryBox(props) {
    const dispatch = useDispatch();

    let chooseQuery = (q) => {
        dispatch(selectQuery(q))
    }

    return(
        <div>
            <div className={'text-white query-box ' + (props.query.selected ? 'query-box-active' : '')}
            style={{marginBottom: '1em'}}
            onClick={()=>{chooseQuery(props.query)}}
            data-tippy-content="Click to select">
            <div className="text-yellow text-center"><small>"{ props.query.name }"</small></div>
            <CytoNetwork query={props.query}></CytoNetwork>
            </div>
        </div>
    )
}

export default QueryBox;