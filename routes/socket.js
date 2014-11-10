/*
 * Serve content over a socket
 */


var solrClient = null;

exports.socket = function socket(socket) {
    socket.on('solr:ask', function() {
        if (solrClient) {
            socket.emit('solr:ready');
        }
    });


    socket.on('solr:query', function(query) {

        solrClient.querySolr(query).then(function(result) {
            socket.emit('solr:queryResult', result);
        });
    });

    socket.on('solr:autocomplete', function(query) {

        solrClient.checkAutoComplete(query).then(function(result) {
            socket.emit('solr:autocompleteResult', result);
        });
    });

    socket.on('solr:getpost', function(id) {

        solrClient.getPost(id).then(function(result) {
            socket.emit('solr:getpostResult', result);
        });
    });
}

exports.solrReady = function(solr) {
    solrClient = solr;
    if (solrClient)
        socket.emit('solr:ready');
}


