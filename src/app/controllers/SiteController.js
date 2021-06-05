const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    index(req, res, next) {
        //callback
        // Course.find({}, function (err, courses) {
        //     if(!err) res.json(courses);
        //     else res.status(400).json({ error: 'ERR' })
        //   });

        //promise
        Course.find({})
            .lean() //fix loi ko render dc du lieu
            .then((courses) => res.render('home', { courses }))
            .catch(next); //xu ly loi tap trung o middleware

        //cach 2 fix loi ko render dc du lieu
        // Course.find({})
        //     .then(courses => res.render('home', {
        //         courses:mutipleMongooseToObject(courses)
        //     })
        //     )
        //     .catch(next); //xu ly loi tap trung o middleware
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
