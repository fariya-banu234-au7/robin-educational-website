import Sequelize from 'sequelize';
import db from '../database/elephantsql';


const review = db.define('review', {
    review: {
        type: Sequelize.STRING,
        allowNull: true
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Date.now
    },
    blog: {
        type: Sequelize.INTEGER,
        ref: 'blogModel',
        allowNull: false
    },
    user: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});



export default review;





