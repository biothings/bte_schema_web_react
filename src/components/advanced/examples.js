const simpleExample = {
    "message": {
        "query_graph": {
            "nodes": {
                "n0": {
                    "categories": "biolink:Disease",
                    "ids": "MONDO:0005737"
                },
                "n1": {
                    "categories": "biolink:Gene"
                }
            },
            "edges": {
                "e01": {
                    "subject": "n0",
                    "object": "n1"
                }
            }
        }
    }
};

export { simpleExample };