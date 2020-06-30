import Sequelize from 'sequelize';
import db from '../database/elephantsql';


//defining schema
const faqs = db.define('faqs',{
    question: {
        type: Sequelize.STRING,
        allowNull: false
    },
    answer: {
        type: Sequelize.STRING
    },
    createdOn: {
        type: Sequelize.DATE,
        default: Sequelize.DATE
    }
});


// exporting
export default faqs;