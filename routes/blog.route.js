import express from 'express';
import blogController from "../controllers/blogs.controller.js";
// autherization
import userAutherized from "../middlewares/authorization/userAutherized.js";
import isAdmin from "../middlewares/authorization/isAdmin.js";
// validator
import { bodyChecker, checkForOne, updateBodyChecker, createError, updateError } from "../middlewares/validator/blogValidator.js"


// creating route
const blogRoute = express.Router();


// defining paths
// new blog
blogRoute.post(
    '/create',
    userAutherized,
    bodyChecker,
    createError,
    blogController.create
);

// show blogs
blogRoute.get(
    "/show",
    blogController.show
);

// update blog
blogRoute.post(
    "/update/:id",
    userAutherized,
    checkForOne,
    updateBodyChecker,
    updateError,
    blogController.update
);

// delete blog
blogRoute.get(
    "/delete/:id",
    userAutherized,
    blogController.delete
);


// rendering page
// new blog
blogRoute.get(
    '/new',
    userAutherized,
    blogController.new
);

// edit blog
blogRoute.get(
    "/edit/:id",
    userAutherized,
    blogController.edit
);


// deleting
blogRoute.get(
    "/adminDelete/:id",
    userAutherized,
    isAdmin,
    blogController.adminDelete
);


// report
blogRoute.get(
    "/report-page/:id",
    userAutherized,
    blogController.reportPage
);


blogRoute.post(
    "/report/:id",
    userAutherized,
    blogController.report
);


export default blogRoute;