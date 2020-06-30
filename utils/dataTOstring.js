import datauri from 'datauri/parser.js';
import path from 'path';

// making instance of datauri
const dURI = new datauri();

// this will change buffer into data url
const dataURI = req => {
    return dURI.format(path.extname(req.file.originalname).toString(), req.file.buffer).content;
};

export default dataURI;