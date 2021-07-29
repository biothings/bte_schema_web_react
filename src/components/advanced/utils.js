import { autocomplete } from 'biomedical-id-autocomplete';
import { recordToDropdownOption } from '../../shared/utils';
import { colorSchema, semanticTypeShorthand } from '../../shared/semanticTypes';

//remove 'biolink:' from an array of strings
const removeBiolinkPrefix = (arr) => {
  return arr.map(v => v.replace('biolink:', ''));
}

//convert all inputs to arrays
const toArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  } else if (value == null) {
    return [];
  } else {
    return [value];
  }
}

//convert trapi json to list of cytoscape elements
const convertTRAPItoEles = async (trapi) => {
  let nodes = trapi.message.query_graph.nodes;
  nodes = await Promise.all(Object.entries(nodes).map(async ([key, node]) => {
    //set label and color of node based on properties
    let ids = toArray(node.ids);
    let categories = removeBiolinkPrefix(toArray(node.categories));
    let label, color;
    if (categories.length === 0 && ids.length === 0) {
      label = 'Any';
      color = 'black';
    } else if (categories.length === 1) {
      label = categories[0];
      color = colorSchema[semanticTypeShorthand[categories[0]]];
    } else if (ids.length > 0) {
      label = ids.join(', ');
      color = 'black';
    } else {
      label = 'Multi';
      color = 'black';
    }

    return {
      group: 'nodes', 
      data: {
        label: label, 
        color: color, 
        id: key, 
        ids: ids, 
        categories: categories, 
        options: await Promise.all(ids.map(async node_id => {
          //attempt to get autocomplete results for ids
          let autocomplete_results = await autocomplete(node_id);
          autocomplete_results = Object.keys(autocomplete_results).map((key) => autocomplete_results[key]).flat();
          if (autocomplete_results.length === 1) {
            return recordToDropdownOption(autocomplete_results[0]);
          } else { //otherwise just display the id
            console.log(`Couldn't autocomplete ${node_id}: Got back ${autocomplete_results.length} autocomplete results.`);
            return {text: node_id, value: node_id};
          }
        }))
      }
    };
  }));

  let edges = trapi.message.query_graph.edges;
  edges = Object.entries(edges).map(([key, edge]) => ({
    group: 'edges', 
    data: {label: key, 
      color: 'black', 
      id: key, 
      label: removeBiolinkPrefix(toArray(edge.predicates)).join(', '),
      source: edge.subject, 
      target: edge.object, 
      predicates: removeBiolinkPrefix(toArray(edge.predicates))
    }
  }));

  return [...nodes, ...edges];
}



export { convertTRAPItoEles };