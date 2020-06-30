import userModel from "../models/user.model.js";
import askMeModel from "../models/askMe.model.js";
import blogModel from "../models/blogs.model.js";

// for report making
import { detailReport } from "../utils/detailReports.js";
import { Op } from "sequelize";


const adminController = {};


// admin related routes

// making admin

// admin home
adminController.home = (req, res) => {
    res.status(200).render('adminHome', {name: req.user.name, id: req.user._id});
};

// make admin
adminController.makeAdmin = async (req, res, next) => {
    const email = req.body.email;
    try{
        const user = await userModel.findOne({ where: { email: email } });

        // if user is not found
        if(!user) return res.status(404).redirect('/makeAdmin?notfound=true');

        // user found
        user.admin = true;
        await user.save();

        res.status(200).render('newAdmin', {user})
    } catch(err){
        next(err);
    }
};


// AskMe portal
adminController.askMe = async (req, res, next) => {
    let error = false;
    // checking if this is redirect
    if(req.query.error) error = true;

    // fetching all questions
    try{
        // finding questions that are not answered
        const questions = await askMeModel.findAll({ where: { solved: false } });
        // response
        res.render('adminAskMe', {questions, error})
    } catch(err) {
        next(err)
    }
};


// for getting all reports
adminController.blog = async (req, res) => {
    try{
        // finding all blogs with reports more than or equal to 1
        const blogs = await blogModel.findAll({ where: { noOreport: { [Op.gte]: 1 } } })
        //     .populate('createdBy', 'name')
        // // will be ordered as number of reports.
        //     .sort({'noOreport': 'desc'})

        // response
        res.render('search', {data: blogs, admin: true})
    } catch (err) {
        next(err)
    }
};


// see blog
adminController.viewBlog = async(req, res, next) => {
    const _id = req.query.blog;
    try{
        // finding blog
        const blog = await blogModel.findOne({ where: { id : id } })
            // .populate('createdBy', 'name')

        // if not found
        if(!blog) return res.redirect('/');

        // if found
        // getting all reports
        const report = detailReport(blog.report)

        // response
        res.render("adminBlog", {blog, report, admin: true});
        
    } catch(err) {
        next(err);
    }
};


// removing all reports
adminController.removeReports = async (req, res, next) => {
    try{
        const _id = req.params.id;
        // finding route
        let blog = await blogModel.findOne({ where: { id: id } });

        // removing reports
        blog.report = [];
        blog.noOreport = 0;

        // saving 
        blog = await blog.save()

        console.log(blog)

        // response
        res.redirect('/admins/reports')
    } catch(err) {
        next(err);
    }
};


export default adminController;