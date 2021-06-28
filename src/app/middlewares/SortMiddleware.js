module.exports = function sortMiddleware(req, res, next) {
    //ta tu dinh nghia 1 bien _sort local de xu ly trong view (render)
    res.locals._sort = {
        enabled: false,
        type: 'default'
    };

    if (req.query.hasOwnProperty('_sort')) {
        /*res.locals._sort.enabled = true;
        res.locals._sort.type = req.query.type;
        res.locals._sort.column = req.query.column;*/

        Object.assign(res.locals._sort,{
            enabled: true,
            type : req.query.type,
            column : req.query.column,
        })
    }

    next();
}