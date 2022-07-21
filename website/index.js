const express = require('express')
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname + "/public")));

app.use('/adminlte/dist', express.static(__dirname + '/node_modules/admin-lte/dist/'));
app.use('/adminlte/plugins', express.static(__dirname + '/node_modules/admin-lte/plugins/'));
app.use('/images', express.static(__dirname + '/public/images/'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/home.html'));
});

app.get('/modal', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/modal.html'));
});

app.get('/objects', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/objects.html'));
});

app.get('/tri', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/tri.html'));
});

app.listen(port, () => {
    console.log(`IoT app listening on port ${port}!`)
});