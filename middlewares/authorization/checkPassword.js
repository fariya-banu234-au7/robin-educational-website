export default async (req, res, next) => {
    try{
        const result = await req.user.isCorrectPassword(req.body.oldPassword);
        if(!result) throw new Error("Incorrect password");
        next();
    } catch(err){
        req.app.locals.msg = err.message;
        res.redirect('/update?error=true');
    }
};