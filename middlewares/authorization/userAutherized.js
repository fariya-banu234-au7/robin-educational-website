export default (req, res, next) => {
    if(!req.user || Object.keys(req.user).length === 0){
        return res.redirect('/login');
    }
    next();
};