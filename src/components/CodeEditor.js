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
// import moment from 'moment';
import axios from 'axios';

let editor = null;

function CodeEditor(props) {

    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
       setDesc(event.target.value);
    }

    let language = new Compartment(),
    tabSize = new Compartment();

    const [message, setMessage ] = useState('');

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

    // function getDateRightNow(){
    //     return moment().format('MMMM Do YYYY, h:mm:ss');
    // }

    async function sendRequest(query, description) {
        setLoading(true);
        axios.post('/v1/asyncquery', JSON.parse(query)).then(res=>{
            setLoading(false);
            console.log(res.data)
        //   jobs.unshift({
        //     'id': res.data.id,
        //     'date': getDateRightNow(),
        //     'url': res.data.url,
        //     'description': description
        //   });
            setMessage(`A new job ID has been created: ${res.data.id} `);
        //   updateJobs();
        }).catch(err=>{
            setLoading(false);
            console.log(err);
            setMessage(`Oh no: ${err} `);
            throw err;
        });
      }

    function grabLatestEdit(){
        let text = desc || '';
        sendRequest(editor.state.doc.toString(), text);
        setDesc('');
    }

    useEffect(()=> renderCM(), []);

    useEffect(()=>{
        if (editor) {
                editor.dispatch({changes: {from: 0, to: editor.state.doc.length, insert: JSON.stringify( props.query, null, 2)}});
        }else{
                console.log('NO EDITOR')
        }
    }, [props.query])

    return(
        <div style={{color: 'black'}}>
        <div id="CM2" className='bg-white'></div>
        <div className='ui input' style={{marginTop: '1em'}}>
            <input type="text" value={desc} onChange={handleChange}  placeholder="Add a short description to remember this query (optional)"/>
        </div>
        <div className="d-flex justify-center items-center" style={{marginTop: '1em'}}> 
            <Button loading={loading ? true : false } color='orange' onClick={()=> grabLatestEdit()}>
                GO
            </Button>
        </div>
        <p className="text-center font-bold">
            { message }
        </p>
    </div>
    )
}

export default CodeEditor;