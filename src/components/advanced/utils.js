import { autocomplete } from 'biomedical-id-autocomplete';
import { recordToDropdownOption } from '../../shared/utils';

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
    return {
      group: 'nodes', 
      data: {
        label: key, 
        color: 'black', 
        id: key, 
        ids: toArray(node.ids), 
        categories: removeBiolinkPrefix(toArray(node.categories)), 
        options: await Promise.all(toArray(node.ids).map(async node_id => {
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
      source: edge.subject, 
      target: edge.object, 
      predicates: removeBiolinkPrefix(toArray(edge.predicates))
    }
  }));

  return [...nodes, ...edges];
}



export { convertTRAPItoEles };