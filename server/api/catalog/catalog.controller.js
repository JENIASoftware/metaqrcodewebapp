'use strict';

var _ = require('lodash');
var catalogs = {
        returnCode: 0,
        result: [
            {
                id: 1,
                description: 'Informazioni per il pagamento biglietto autobus',
                name: 'Biglietto Autobus',
                nickNamePublisher: 'michele.scotucci',
                numberOfReferences: 5,
                stars: 2,
                getCatalog: 'assets/images/yeoman.png'
            },
            {
               id: 2,
                description: 'Informazioni per il pagamento biglietto metro',
                name: 'Biglietto Metro',
                nickNamePublisher: 'michele.scotucci',
                numberOfReferences: 5,
                stars: 4,
                getCatalog: 'assets/images/yeoman.png'
            },
        {
                id: 1,
                description: 'Informazioni per il pagamento biglietto autobus',
                name: 'Biglietto Autobus',
                nickNamePublisher: 'michele.scotucci',
                numberOfReferences: 5,
                stars: 2,
                getCatalog: 'assets/images/yeoman.png'
            },
            {
               id: 2,
                description: 'Informazioni per il pagamento biglietto metro',
                name: 'Biglietto Metro',
                nickNamePublisher: 'michele.scotucci',
                numberOfReferences: 5,
                stars: 4,
                getCatalog: 'assets/images/yeoman.png'
            },
            {
               id: 2,
                description: 'Informazioni per il pagamento biglietto metro',
                name: 'Biglietto Metro',
                nickNamePublisher: 'michele.scotucci',
                numberOfReferences: 5,
                stars: 4,
                getCatalog: 'assets/images/yeoman.png'
            }]
};
// Get list of catalogs
exports.index = function(req, res) {
  res.json(catalogs);
};