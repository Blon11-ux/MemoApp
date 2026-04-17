const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

let nextId = 1;
let memos = [];

app.get('/', (req, res) => {
    res.render('index', { memos: memos });
});

app.post('/memos', (req, res) => {
    const newMemo = {
        id: nextId++,
        content: req.body.content,
        createdAt: new Date().toISOString().split('T')[0]
    };
    memos.push(newMemo);
    res.redirect('/');
});

app.post('/memos/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = memos.findIndex(m => m.id === id);
    if (index !== -1) {
        memos.splice(index, 1);
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});