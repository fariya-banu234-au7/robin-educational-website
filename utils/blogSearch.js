import blogModel from "../models/blogs.model.js"

export const search = async (req, res) => {
    const word = req.params.word
    // if word match title
    const data1 = await blogModel.findOne({ where: { title: word } });
    // if word matches partially
    const data2 = await blogModel.findOne({ where: { name: { $regex: name, $options: "i" } } })
        .sort({title: -1});

    res.json({
        exactMatches: data1,
        partialMatches_with_length_of_word_lower_to_higher: data2
    })
};