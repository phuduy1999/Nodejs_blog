const Course = require('../models/Course');

class MeController {
    //[GET] /me/stored/courses
    storedCourses(req, res, next) {

        // res.json(res.locals._sort);//lay dc trong view

        //sortable nam trong custom query helpers (Course model)
        Promise.all([Course.find({}).lean().sortable(req), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses
                })
            })
            .catch(next);
    }

    //[GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .lean()
            .then((courses) => res.render('me/trash-courses', { courses }))
            .catch(next);
    }
}

module.exports = new MeController();
