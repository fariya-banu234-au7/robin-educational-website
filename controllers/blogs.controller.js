import blogModel from "../models/blogs.model.js";
import userModel from "../models/user.model.js";
import { order } from "../utils/JSONDataSort.js";


const blogController = {};

// create
blogController.create = async (req, res, next) => {
    try{
        let blog = await blogModel.create({
            title: req.body.title,
            body: req.body.body,
            tag: req.body.tag,
            createdBy: req.user._id
        });
        // save blog
        blog = await blog.save();
        
        // saving to user side
        req.user.blogs.push(blog._id);
        await req.user.save();

        // response
        res.redirect('/blogs/show');

    } catch (err) {
        next(err);
    }
};


// blog show
blogController.show = (req, res, next) => {
    try{
        let self = false;
        let admin = false;

        const _id = req.user._id || req.query.userID;

        if (!req.body.userID) self = true;
        if (req.body.userID) admin = true;

        userModel.findOne({ where: { id: id } })
            // .populate('blogs') 
            // .exec()
            // .then(user => user.blogs)
            // .then(blogs => blogs.sort(order('createdOn', -1)))
            // .then(blogs => res.render('showBlogs', {self, admin, blogs}));

    } catch (err) {
        next(err)
    }
};


// blog update
blogController.update = async (req, res, next) => {
    try {
        // finding blog
        const _id = req.params.id
        const blog = await blogModel.findOne({ where:{ id: id }});

        // if not found
        if(!blog) {};

        // updating
        if(req.body.title) blog.title = req.body.title;
        if(req.body.body) blog.body = req.body.body;
        if(req.body.tag) blog.tag = req.body.tag;

        // saving details
        await blog.save()

        // redirecting
        res.redirect("/blogs/show");
    } catch (err) {
        next(err);
    }
};


// blog delete
blogController.delete = async (req, res, next) => {
    try{
        const _id = req.params.id;
        // deleting
        await blogModel.destroy({ where: { id: id } });
        // redirecting
        res.redirect('/blogs/show');
    } catch (err) {
        next(err);
    }
};


// rendering page
// For new blog
blogController.new = (req, res) => {
    let error = false;
    // check if error happens
    if(req.query.error) error = true;

    res.render('newBlog', {error});
};


// for edit blog
blogController.edit = async (req, res, next) => {
    // for checking if redirect due to error
    let error = false;
    if(req.query.error) error = true;

    const _id = req.params.id;
    // finding blog
    const blog = await blogModel.findOne({ where: { id: id } });

    // if not found 
    if(!blog) {
        req.app.locals.msg = 'Blog not found';
        error = true;
    };

    // if found
    res.render("editBlog", {blog, error});
};


// deleting blog
blogController.adminDelete = async (req, res, next) => {
    try{
        const _id = req.params.id;
        // deleting
        await blogModel.destroy({ where: { id: id } });
        // redirecting
        res.redirect('/admins/reports');
    } catch (err) {
        next(err);
    }
};


// report
blogController.reportPage = (req, res) => {
    const id = req.params.id;

    res.render('report', {id});
};


blogController.report = async(req, res, next) => {
    try{
        const _id = req.params.id;
        const key = req.body.report;
        // finding blog
        const blog = await blogModel.findOne({ where: { id: id } });
        // reporting
        blog.report.push(key);
        blog.noOreport += 1;
        // saving
        await blog.save()
        // response
        res.render("reported")
    } catch (err) {
        next(err)
    }
};


export default blogController;