var express = require('express');

var routes = function (Book) {
    var bookRouter = express.Router();

    bookRouter.route('/')
        .post(function (req, res) {
            var book = new Book(req.body);
            //console.log(book);
            book.save();
            res.status(201).send(book);
        })
        .get(function (req, res) {
            //var responseJson = { hello: "This is my API!"};
            //res.json(responseJson);
            var query = {};

            //Validation
            if (req.query.genre) {
                query.genre = req.query.genre;
            }

            Book.find(query, function (err, books) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }
                else
                    res.json(books);
            });
        });

    bookRouter.route('/:bookId').get(function (req, res) {

        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else
                res.json(book);
        });
    });
    return bookRouter;
};

module.exports = routes;