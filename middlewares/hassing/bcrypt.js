import pkg from 'bcrypt';
const { genSalt, hash } = pkg;

export default async function(req, res, next){
    if(req.body.password){
        try{
            const salt = await genSalt(10);
            const hashedPassword = await hash(req.body.password, salt);
            req.body.password = hashedPassword;
            next()
        } catch(err) {
            next(err);
        }
    } else{
        next();
    }
};