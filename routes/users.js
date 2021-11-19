const userRoutes = (app, fs) => {

    const dataPath = './data/users.json';
  
    const readFile = (
        callback,
        returnJson = false,
        Id,
        filePath = dataPath,
        encoding = 'utf8'
    ) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data)[Id] : data);
        });
    };
    const Towrite_readFile = (
        callback,
        returnJson = false,
        filePath = dataPath,
        encoding = 'utf8'
    ) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }
            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (
        fileData,
        callback,
        filePath = dataPath,
        encoding = 'utf8'
    ) => {
        fs.writeFile(filePath, fileData, encoding, err => {
            if (err) {
                throw err;
            }
            callback();
        });
    };

    // READ
    app.get('/eskillzTokens/:id', (req, res) => {
        readFile(data => {
        res.send(data);
        }, true,req.params.id);
    });
    
    // CREATE
    app.post('/eskillzTokens/:id', (req, res) => {
        Towrite_readFile(data => {
            data[req.params.id] = req.body;
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('success');
            });
        }, 
        true);    
    });

    // // UPDATE
    // app.put('/users/:id', (req, res) => {
    //     readFile(data => {
    //     // add the new user
    //     const userId = req.params['id'];
    //     data[userId] = req.body;
    
    //     writeFile(JSON.stringify(data, null, 2), () => {
    //         res.status(200).send(`users id:${userId} updated`);
    //     });
    //     }, true);
    // });
  };
  
  module.exports = userRoutes;