import Sequelize from 'sequelize';
import db from '../database/elephantsql'


// defining schema
const askMe = db.define('askMe',{
    question: {
        type: Sequelize.STRING,
        allowNull: false
    },
    answer: {
        type: Sequelize.STRING
    },
    user: {
        type: Sequelize.INTEGER,   
        allowNull: false
    },
    solved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.DATE
    }
});




export default askMe;