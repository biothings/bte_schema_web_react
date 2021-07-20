import React, { Component, useState } from 'react';
import { Button, Header, Container, Modal, Message, Menu, Form, TextArea, Icon, Accordion } from 'semantic-ui-react';

import { Navigation } from '../../components/Breadcrumb';
import ResultsTable from './table/ResultsTableComponent';
import AdvancedQueryGraph from './graph/AdvancedQueryGraphComponent';
import { convertTRAPItoEles } from './utils';
import { simpleExample } from './examples';

import axios from 'axios';
import _ from 'lodash';

const TRAPIQueryButton = ({TRAPIQuery}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return <Modal
    closeIcon
    open={modalOpen}
    trigger={<Button basic color='violet'>View TRAPI Query</Button>}
    onClose={() => setModalOpen(false)}
    onOpen={() => setModalOpen(true)}
  >
    <Header>Current TRAPI Query</Header>
    <Modal.Content>
      <p style={{"whiteSpace": "pre-wrap"}}>
        {JSON.stringify(TRAPIQuery(true), null, 2)}
      </p>
    </Modal.Content>
  </Modal>
}

const ARSDisplay = ({arsPK}) => {
  if (arsPK) {
    return (
      <div>
        <h3>ARS Results</h3>
        <Message warning floating
          content="ARS results may take a minute to show up, try waiting 
          a minute and refreshing the page if results don't show up immediately."
        />
        <Button 
          as='a' href={`https://arax.ncats.io/?source=ARS&id=${arsPK}`} 
          icon='external' labelPosition='left' content="Open ARS" target="_blank" id="ars-button"
        />
      </div>
    );
  } else {
    return (
      <div>
        <h3>ARS Results</h3>
        <div>Click 'Query ARS' to get ARS results.</div>
      </div>
    );
  }
}

const ImportGraphButton = ({importGraph}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState(''); //keep track of form value

  const handleSubmit = () => {
    importGraph(JSON.parse(value));
    setModalOpen(false);
  }

  return <Modal
    closeIcon
    open={modalOpen}
    trigger={<Button basic color='violet'>Import Graph</Button>}
    onClose={() => setModalOpen(false)}
    onOpen={() => setModalOpen(true)}
  >
    <Header>Import Graph From TRAPI</Header>
    <Modal.Content>
      <Form>
        <TextArea value={value} onChange={(e) => setValue(e.target.value)} rows={10}/>
        <Button color='violet' onClick={() => handleSubmit()} style={{marginTop: "0.5rem"}}>
          Import
        </Button>
      </Form>
    </Modal.Content>
  </Modal>
}

class AdvancedQuery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {},
      selectedElementID: "",
      mode: "",
      loading: false,
      loadingARS: false,
      cy: {},
      arsPK: "",
      messageVisible: true,
      activeItem: "BTE"
    };

    this.setCy = this.setCy.bind(this);
    this.cyJSON = this.cyJSON.bind(this);
    this.TRAPIQuery = this.TRAPIQuery.bind(this);
    this.clearGraph = this.clearGraph.bind(this);
    this.importGraph = this.importGraph.bind(this);

    this.graphRef = React.createRef();

    this.edgeQuery = this.edgeQuery.bind(this);
    this.nodeQuery = this.nodeQuery.bind(this);
    this.defaultQuery = this.defaultQuery.bind(this);
    this.makeARSQuery = this.makeARSQuery.bind(this);
    this.setElementID = this.setElementID.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  } 

  handleMenuClick(e, { name }) {
    this.setState({activeItem: name});
  }

  closeMessage() {
    this.setState({messageVisible: false});
  }

  //cy graph in json format
  cyJSON() {
    return this.state.cy.json && this.state.cy.json();
  }

  clearGraph() {
    this.state.cy.remove(this.state.cy.nodes());
  }

  //take in a trapi graph and display it in the visual query builder
  importGraph(trapi) {
    this.clearGraph();
    convertTRAPItoEles(trapi).then((eles) => {
      this.state.cy.add(eles);
      let layout = this.state.cy.elements().layout({
        name: 'klay',
        klay: {
          edgeSpacingFactor: 2,
          spacing: 100
        }
      });
      layout.run();
      layout.stop();
    });
  }

  //get trapi query for cy graph
  //sequentialNumbering - number nodes and edges sequential eg. node01, node02, edge01, edge02, etc
  TRAPIQuery(sequentialNumbering = false) {
    let jsonGraph = this.cyJSON();
    let nodes = {};

    //store mapping from hashes to sequential numbering
    let mapping = {};
    if (jsonGraph && jsonGraph.elements.nodes) {
      jsonGraph.elements.nodes.forEach((node, i) => {
        let id = node.data.id;
        if (sequentialNumbering) {
          id = `n${(i+1)}`;
          mapping[node.data.id] = id;
        } else {
          mapping[node.data.id] = node.data.id;
        }

        nodes[id] = {};

        //don't include ids or categories field if they are empty arrays
        if (Array.isArray(node.data.ids) && node.data.ids.length > 0) {
          nodes[id].ids = node.data.ids;
        };
        if (Array.isArray(node.data.categories) && node.data.categories.length > 0) {
          nodes[id].categories = _.map(node.data.categories, category => `biolink:${category}`);
        }
      });
    }

    let edges = {};
    if (jsonGraph && jsonGraph.elements.edges) {
      jsonGraph.elements.edges.forEach((edge, i) => {
        let id = edge.data.id;
        if (sequentialNumbering) {
          id = `e${(i+1)}`;
        }

        let pred = _.map(edge.data.predicates, predicate => `biolink:${predicate}`);
        edges[id] = {
          "subject": mapping[edge.data.source],
          "object": mapping[edge.data.target]
        };

        //only include predicates field if it is defined
        if (pred.length) {
          edges[id].prediates = pred;
        }
      });
    }

    return {
      "message": {
        "query_graph": {
          "nodes": nodes,
          "edges": edges
        }
      }
    }
  }

  //a valid query must have at least 1 node with an id and 1 edge
  isValidQuery(jsonGraph) {
    if (!(jsonGraph.elements.edges && jsonGraph.elements.edges.length >= 1)) {
      alert("Graph must have at least 1 edge.");
      return false;
    } 
    for (let node of jsonGraph.elements.nodes) {
      if (node.data.ids.length > 0) {
        return true;
      }
    }
    alert("Graph must have at least 1 node with an id.");
    return false;
  }

  setElementID(id) {
    this.setState({
      selectedElementID: id
    })
    this.graphRef.current.setSelectedElementID(id);
  }

  //handle edge results
  edgeQuery(edge) {
    let resp_edge = _.get(this.state.response, ['message', 'query_graph', 'edges', edge.id()]);
    let query_edge = _.get(this.TRAPIQuery(), ['message', 'query_graph', 'edges', edge.id()]);

    let resp_source_node = _.get(this.state.response, ['message', 'query_graph', 'nodes', _.get(resp_edge, 'subject')]);
    let query_source_node = _.get(this.TRAPIQuery(), ['message', 'query_graph', 'nodes', _.get(query_edge, 'subject')]);

    if (_.isEqual(resp_edge, query_edge) && _.isEqual(resp_source_node, query_source_node)) { //use existing results if the query graph for the edge is unchanged
      this.setState({mode: "edge", activeItem: "BTE"});
      this.setElementID(edge.id())
    } else { //otherwise requery the graph
      this.queryGraph(() => {
        this.setState({mode: "edge", activeItem: "BTE"});
        this.setElementID(edge.id()); 
      });
      
    }
  }

  //handle node results
  nodeQuery(node) {
    let resp_node = _.get(this.state.response, ['message', 'query_graph', 'nodes', node.id()]);
    let query_node = _.get(this.TRAPIQuery(), ['message', 'query_graph', 'nodes', node.id()]);

    if (_.isEqual(resp_node, query_node)) { //use existing results if they exist
      this.setState({mode: "node", activeItem: "BTE"});
      this.setElementID(node.id());
    } else { //requery if they don't exist
      this.queryGraph(() => {
        this.setState({mode: "node", activeItem: "BTE"});
        this.setElementID(node.id());
      }); 
    }
  }

  //by default show results for first edge
  //if there is already a selected ed
  defaultQuery() {
    this.queryGraph(() => {
      let edge = this.state.cy.edges()[0];
      this.edgeQuery(edge);
    });
  }

  makeARSQuery() {
    console.log("Querying ARS...");
    if (this.isValidQuery(this.cyJSON())) {
      if (!this.state.loadingARS) {
        this.setState({loadingARS: true, activeItem: 'ARS'});

        axios.post('https://ars-dev.transltr.io/ars/api/submit', this.TRAPIQuery()).then((response) => {
          this.setState({arsPK: response.data.pk, loadingARS: false});
          console.log("ARS response", response);
        }).catch((error) => {
          console.log("Error: ", error);
        });
      }
    }
  }

  //get and query graph
  queryGraph(callback) {
    console.log("Querying...");
    if (this.isValidQuery(this.cyJSON())) {
      if (!this.state.loading) {
        this.setState({loading: true});
        let query = this.TRAPIQuery();

        axios.post('https://api.bte.ncats.io/v1/query', query).then((response) => {
          this.setState({loading: false, response: response.data}, () => {
            if (callback !== undefined) {
              callback();
            }
          });
          console.log("Response", response.data);
        }).catch((error) => {
          this.setState({loading: false});
          console.log("Error: ", error);
        });
      } else {
        console.log('Already loading.');
      }
    }
  }

  //use to intialize cy and force update
  setCy(cy) {
    this.setState({cy: cy});
  }

  render() {
    let panels = [
      {
        key: "how-to",
        title: "How do I use the visual query builder?",
        content: {
          content: (
            <div>
              <p>Use Edit mode to add attributes to nodes/edges and reposition nodes.</p>
              <p>Left click while in Add Node mode to place nodes.</p>
              <p>Click and drag while in Add Edge mode to create new edges.</p>
              <p>Right click to remove nodes/edges.</p>
            </div>
          ) 
        }
      },
      {
        key: "examples",
        title: "Examples",
        content: {
          content: (
            <div>
              <Button color='violet' basic onClick={(e) => {e.preventDefault(); this.importGraph(simpleExample)}}>Basic Example</Button>
            </div>
          )
        } 
      }
    ];
    return (
      <Container className="feature">
        <Navigation name="Advanced" />
        <div style={{marginTop: '0.5rem'}}><Icon circular name="info"/></div>
        <Accordion panels={panels}/>
        

        <AdvancedQueryGraph ref={this.graphRef} edgeQuery={this.edgeQuery} nodeQuery={this.nodeQuery} cy={this.state.cy} setCy={this.setCy}/>
        
        <Button color='violet' onClick={this.defaultQuery} loading={this.state.loading}>Query BTE</Button>
        <Button color='violet' onClick={this.makeARSQuery} loading={this.state.loadingARS}>Query ARS</Button>
        
        <TRAPIQueryButton TRAPIQuery={this.TRAPIQuery}/>
        <ImportGraphButton importGraph={this.importGraph}/>

        <Menu pointing secondary>
          <Menu.Item 
            name='BTE'
            active={this.state.activeItem === 'BTE'}
            onClick={this.handleMenuClick}
          />
          <Menu.Item 
            name='ARS'
            active={this.state.activeItem === 'ARS'}
            onClick={this.handleMenuClick}
          />
        </Menu>

        <div style={{display: this.state.activeItem === 'BTE' ? 'block' : 'none'}}>
          <ResultsTable 
            response={this.state.response}
            mode={this.state.mode}
            selectedElementID={this.state.selectedElementID}
            cy={this.state.cy}
            setCy={this.setCy}
            key={this.state.selectedElementID} //force creation of new element when selected element changes
          />
        </div>
        <div style={{display: this.state.activeItem === 'ARS' ? 'block' : 'none'}}>
          <ARSDisplay arsPK={this.state.arsPK} />
        </div>
      </Container>
    )
  }
}

export default AdvancedQuery;