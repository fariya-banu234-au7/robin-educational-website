export default (req, res, next) => {
    if(req.user && req.user.admin){
       return next();
    }
    // It will redirect user to '/' path.
    res.status(403).redirect(401, "back");
};