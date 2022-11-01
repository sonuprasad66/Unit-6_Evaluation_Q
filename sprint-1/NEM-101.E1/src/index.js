// Start here


const express = require('express');
const users = require('../data/users.json');
const products = require('../data/products.json');
const app = express();
app.use(express.json()) 
const port = 8080;

app.get('/users', (req, res) => {
  res.send(JSON.stringify(users));
})

app.get('/users/:id', (req, res) => {
    const users = users.filter(u=>u.id==req.params.id)
    res.send(JSON.stringify(users));
});

app.delete('/users/:id', function(req, res) {
    console.log(util.inspect(req.body)); //outputs {}
    //some more code
});

app.post('/users', (req, res) => {
    console.log(req.body)
    res.send(JSON.stringify(users));
})





/* products */
app.get('/products', (req, res) => {
    let prod = products;
    if(req.query && req.query.tag && !req.query.sizes ){
        // console.log("111111", req.query.tag , req.query.sizes)
        prod = products.filter(p=>{
            if(p.colors.includes(req.query.tag)){
                return p;
            }
            
        })
    }
    if(req.query && req.query.sizes && !req.query.tag ){
        // console.log('222222', req.query.tag , req.query.sizes)
        prod = products.filter(p=>{
            if(p.sizes.includes(req.query.sizes)){
                return p;
            }
            
        })
    }

    

    if(req.query && req.query.tag && req.query.sizes ){
        // console.log('33333333333', req.query.tag , req.query.sizes)
        prod = products.filter(p=>{
            if(p.colors.includes(req.query.tag) && p.sizes.includes(req.query.sizes)){
                return p;
            }
            
        });
    }
    res.send(JSON.stringify(prod));
  });


app.get('/products/:id', (req, res) => {
    const products = products.filter(u=>u.id==req.params.id)
    res.send(JSON.stringify(products));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});






  