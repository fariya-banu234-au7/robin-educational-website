import askMeModel from '../models/askMe.model.js';
import userModel from '../models/user.model.js';
import { sendEmail } from '../utils/mailer.js';
import { GMAIL_USER } from '../config/mailer.js';
import { askMeAnswer } from '../utils/emailBody.js';
import userAutherized from '../middlewares/authorization/userAutherized.js';

// creating object
const askMeController = {};


// making a question
askMeController.createQuestion = async (req, res, next) => {
    try{
        // saving question
        let question = new askMeModel({
            question: req.body.question,
            user: req.params.user
        });
        question = await question.save();

        // saving on user side
        const user = await userModel.findOne({_id: req.params.user});
        user.questions.push(question._id);
        await user.save();

        // response
        res.render('questionRecieved');

    } catch(err) {
        next(err)
    }
};


// answer by admin
askMeController.answer = async (req, res, next) => {
    try{
        // searching question
        const questionID = req.params.id;
        await askMeModel.findOne({ where: { id: questionID } })
            // .populate('user', 'email')
            // .exec()
            // .then(docs => {
            //     docs.answer = req.body.answer;
            //     docs.solved = true;
            //     docs.save()
            //         .then(docs => {
            //             // sending mail
            //             sendEmail(GMAIL_USER, docs.user.email, 'Your question answered', askMeAnswer());
            //         });
            // });
        res.redirect('/admins/askMe');
    } catch(err) {
        next(err);
    }
};
 

// exporting files
export default askMeController;