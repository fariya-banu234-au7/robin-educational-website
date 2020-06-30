export default (res, data, message, error, state) => {
    res.status(state).json({
        data,
        message,
        error
    });
};