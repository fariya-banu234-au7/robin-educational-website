import Sequelize from 'sequelize';
import db from '../database/elephantsql';


//defining schema
const blog = db.define('blog', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdOn: {
        type: Sequelize.DATE,
        default: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    },
    createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tag: {
        type: Sequelize.STRING,
        allowNull: false
    },
    report: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: []
    },
    noOreport: {
        type: Sequelize.INTEGER,
        defaultValue:  0
    }
});



// exporting
export default blog;