// importing model
import userModel from "../models/user.model.js";

// checking for uniq email
export default async (value) => {
    try {
        const user = await userModel.findOne({ where: { email: value } });
        if (user) throw ("");
        return true;
    } catch(error){
        throw(error);
    }
};
