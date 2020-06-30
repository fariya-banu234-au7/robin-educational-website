import faqModel from "../models/faqs.model.js";

// creating object
const faqController = {};


// defining controle

// rendering page for creating new faqs
faqController.new = (req, res) => {
    // checking if error
    let error = false;
    if(req.query.error) error = true

    res.render('createFAQ', {error});
}

// Rendering Update Page
faqController.edit = async (req, res, next) => {
    try{
        // checking if it redirected
        let error = false;
        if(req.query.error) error = true;

        const id = req.params.id;
        const faq = await faqModel.findOne({ where: { id: id } });
        // if not found
        if(!faq) return res.redirect("/faqs/show?notFound=true");
        // render
        res.render('editFAQ', {faq, error});
    } catch(err) {
        next(err);
    }
};

// creating faq
faqController.create = async (req, res, next) => {
    try{
        // creating
        const faq = await faqModel.create({ ...req.body });
        // saving
        await faq.save();

        // response
        res.status(200).redirect('/faqs/show');
    } catch(err) {
        next(err);
    }
};

// showing faqs
faqController.show = async (req, res, next) => {
    try{
        // checking if admin is accessing
        let admin = false
        if(req.user && req.user.admin) admin = true
        // fetching all faqs
        await faqModel.findAll()
            .sort('createdOn')
            .then(faqs => {
                // response
                res.status(200).render('faqs', {faqs, admin})
            });
    } catch(err) {
        next(err);
    }
};


// faq update
faqController.update = async (req, res, next) => {
    try {
        // finding faq
        const _id = req.params.id;
        const faq = await faqModel.findOne({where: { id: id }});

        // updating
        if(req.body.question) faq.question = req.body.question;
        if(req.body.answer) faq.answer = req.body.answer;

        // saving faq
        await faq.save();

        // redirect
        res.redirect('/faqs/show');
    } catch(err) {
        next(err);
    }
}


// deleting faq with id
faqController.delete = async (req, res, next) => {
    try{
        const _id = req.params.id;
        // finding and removing faq
        await faqModel.destroy({ where: { id: id } });
        // response
        res.status(200).redirect('/faqs/show');
    } catch(err) {
        next(err);
    }
};


// exporting module
export default faqController;