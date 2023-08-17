import React, { useState, useEffect } from 'react';

function SourceBox(props) {

    let [subColor, setSubColor] = useState('')
    let [objColor, setObjColor] = useState('')

    function getColor(name){
        switch (name) {
            case "Disease":
                return '#8d5bd4'
            case "Gene":
                return '#2c98f0'
            case "SmallMolecule":
                return '#fe5c5c'
            case "CellularComponent":
                return '#b5cb17'
            case "MolecularActivity":
                return '#dd5181'
            case "Pathway":
                return '#4bc0c0'
            case "GrossAnatomicalStructure":
                return '#364485'
            case "SequenceVariant":
                return '#02838f'
            case "PhenotypicFeature":
                return '#ffa601'
            case "Polypeptide":
                return '#b48484'
            case "Treatment":
                return 'purple'
            case "Procedure":
                return 'darkgray'
            case "ChemicalEntity":
                return 'orange'
            case "ChemicalMixture":
                return '#ea590a'
            case "OrganismTaxon":
                return 'hotpink'
            case "InformationContentEntity":
                return '#955196'
            case "OrganismAttribute":
                return '#114068'
            case "AnatomicalEntity":
                return '#4338c9'
            case "MolecularMixture":
                return '#d65042'
            default:
                return 'gray'
        }
    }

    function getSubColor(entity_name){
        setSubColor(getColor(entity_name))
    }

    function getObjColor(entity_name){
        setObjColor(getColor(entity_name))
    }

    useEffect(()=> {
        getSubColor(props.subject)
        getObjColor(props.object)
    }, [props.subject, props.object]);


    return(
        <div className='entity-pill' style={{background: objColor}}>
            <div style={{background: subColor}}>{props.subject}</div>
            <div style={{background: subColor}}></div>
            <div>{props.object}</div>
        </div>
    )
}

export default SourceBox;