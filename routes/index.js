var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/partials/:filename', function(req, res, next) {

    var fileName = req.params.filename;

    if (!fileName) {
        res.send(400);
    }

    var template = path.join('partials/', fileName);

    if (template.indexOf('partials') === 0) {
        res.render(template);
    } else {
        res.send(400);
    }

});

module.exports = router;
