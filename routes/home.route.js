import express from 'express';

// control file
import homeController from '../controllers/home.controller.js';


// routing
const homeRoute = express.Router();
 

// paths

// user routes
homeRoute.get("/", homeController.home);
homeRoute.get("/login", homeController.login);
homeRoute.get("/signin", homeController.sigin);
homeRoute.get("/update", homeController.update);


// admin routes
homeRoute.get("/makeAdmin", homeController.newAdmin);


// forget password 
homeRoute.get("/forgetPassword", homeController.forgetPassword);
// create password
homeRoute.get('/makePassword', homeController.makePassword);


// uploading pic
homeRoute.get(
    '/upload',
    homeController.upload
);


// for searching all blogs related to user input
homeRoute.post(
    "/search",
    homeController.search
);


// for rendering specific blog
homeRoute.get("/blog-search", homeController.viewBlog);

export default homeRoute;