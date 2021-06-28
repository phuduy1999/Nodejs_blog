const Course = require('../models/Course');

class CourseController {
    //[GET] /courses
    index(req, res, next) {
        res.send('dsfds');
    }

    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .lean()
            .then((course) => {
                if (!course) {
                    res.status(404).send('404');
                } else {
                    res.render('courses/show', { course });
                }
            })
            .catch(next);
    }

    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] /courses/store
    store(req, res, next) {
        const formData = {...req.body};
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .lean()
            .then((course) => res.render('courses/edit', { course }))
            .catch(next);
    }

    //[PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back')) //back la quay lai trang dang dung
            .catch(next);
    }

    //[DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back')) //back la quay lai trang dang dung
            .catch(next);
    }

    //[PATCH] /courses/:id/restore
    restore(req, res, next){
        Course.restore({ _id: req.params.id })
        .then(() => res.redirect('back')) //back la quay lai trang dang dung
        .catch(next);
    }

    //[POST] /courses/handle-form-actions
    handleFormActions(req, res, next){
        switch(req.body.action){
            case 'delete':
                Course.delete({ _id: { $in : req.body.courseIds } })
                .then(() => res.redirect('back')) //back la quay lai trang dang dung
                .catch(next);
                break;
            default:
                res.json({message:'Action invalid'})
        }
    }

    //[POST] /courses/handle-form-trash-actions
    handleFormTrashActions(req, res, next){
        switch(req.body.action){
            case 'force-delete':
                Course.deleteMany({ _id: { $in : req.body.courseIds } }) //courseIds is array
                .then(() => res.redirect('back')) //back la quay lai trang dang dung
                .catch(next);
                break;
            case 'restore':
                Course.restore({ _id: { $in : req.body.courseIds } })
                .then(() => res.redirect('back')) //back la quay lai trang dang dung
                .catch(next);
                break;
            default:
                res.json({message:'Action invalid'})
        }
    }
}

module.exports = new CourseController();
