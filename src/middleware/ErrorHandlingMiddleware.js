import RequestError from "../error/RequestError.js";
export default (error, req, res, next) => {
    if (error instanceof RequestError) {
        return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json("Неожиданная ошибка");
};
