import React, { useEffect, useState } from 'react';
import { basicSetup, EditorView } from "codemirror";
import { EditorState, Compartment } from "@codemirror/state";
import { json } from "@codemirror/lang-json";
import { autocompletion } from "@codemirror/autocomplete";
import {
defaultHighlightStyle,
syntaxHighlighting,
} from "@codemirror/language";
import { history } from "@codemirror/commands";
import { Button } from 'semantic-ui-react';
import logo from '../assets/biothings-explorer.svg'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { setLoading, setMessage, addJob, updateJobs } from '../store';


let editor = null;

function CodeEditor(props) {

    const [desc, setDesc] = useState('');
    const dispatch = useDispatch();
    let loading = useSelector(state => state.main.loading);
    let message = useSelector(state => state.main.message);

    let language = new Compartment(),
    tabSize = new Compartment();

    function renderCM(){
        let state = EditorState.create({
            doc: JSON.stringify(props.query, null, 2),
            extensions: [
            basicSetup,
            history(),
            autocompletion(),
            language.of(json()),
            tabSize.of(EditorState.tabSize.of(8)),
            syntaxHighlighting(defaultHighlightStyle),
            ],
        });
        editor = new EditorView({
            state,
            parent: document.body.querySelector("#CM2"),
        });
    }

    function getDateRightNow(){
        return moment().format('MMMM Do YYYY, h:mm:ss');
    }

    async function sendRequest(payload) {
        dispatch(setLoading(true));
        axios.post('https://bte.transltr.io/v1/asyncquery', JSON.parse(payload.query)).then(res=>{
            setTimeout(() => {
                dispatch(setLoading(false))
            }, 1000);
            let job = {
                'id': res.data.id,
                'date': getDateRightNow(),
                'url': res.data.url,
                'description': payload.description
            };
            dispatch(addJob(job))
            dispatch(setMessage(`A new job ID has been created: ${res.data.id} `))
            setTimeout(() => {
                dispatch(setMessage(''))
            }, 10000);
            dispatch(updateJobs())
        }).catch(err=>{
            dispatch(setLoading(false))
            dispatch(setMessage(`Oh no: ${err} `))
            console.log(err);
            throw err;
        });
    }

    function grabLatestAndSendRequest(){
        sendRequest({'query': editor.state.doc.toString(), 'description': desc || ''});
        setDesc('');
    }

    useEffect(()=> renderCM(), []);

    useEffect(()=>{
        if (editor) {
                editor.dispatch({changes: {from: 0, to: editor.state.doc.length, insert: JSON.stringify( props.query, null, 2)}});
        }else{
                console.warn('NO CODE EDITOR CREATED')
        }
    })

    return(
        <div style={{color: 'black'}}>
        <div id="CM2" className='bg-white'></div>
        <div className='ui input labeled' style={{marginTop: '1em'}}>
            <div className="ui label label">(Optional) Query Name</div>
            <input type="text" maxLength="30" value={desc} onChange={e => setDesc(e.target.value)}  placeholder="Add a short name to remember this query (30 characters max)"/>
        </div>
        <div className="d-flex justify-center items-center" style={{marginTop: '1em'}}> 
            <Button className='d-flex justify-center items-center' loading={loading ? true : false } color='orange' onClick={()=> grabLatestAndSendRequest()}>
                <img src={logo} alt="bte" width={30} style={{marginRight: 10}}/> GO
            </Button>
        </div>
        <p className="text-center font-bold text-green" style={{marginTop: 20}}>
            <b>{ message }</b>
        </p>
    </div>
    )
}

export default CodeEditor;