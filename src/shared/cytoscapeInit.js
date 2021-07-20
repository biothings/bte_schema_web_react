import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import popper from 'cytoscape-popper';
import klay from 'cytoscape-klay'

cytoscape.use(popper);
cytoscape.use(edgehandles);
cytoscape.use(klay);

export default cytoscape;