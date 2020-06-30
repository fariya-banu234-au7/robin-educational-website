import Sequelize from 'sequelize';
import db from '../database/elephantsql';

import bcrypt from 'bcrypt';


// defining
const review = db.define('review', {
    name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    email: {
        type: String,
        allowNull: false,
        unique: {
            args: true
        }
    },
    password: {
        type: Sequelize.STRING
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    blogs: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: []
    },
    questions: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: []
    },
    key: {
        type: Sequelize.STRING
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    profilePicLink: {
        type: Sequelize.STRING,
        defaultValue: 'http://res.cloudinary.com/dqephruum/image/upload/v1592380257/doojzhewxigdpfgk6w2h.png'
    }
});



export default user;