const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validate({
                body: req.body,
                query: req.query,
                params: req.params,
                user: req.user
            });
            next();
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(404).json({ message: error.message });
            }
        }
    };
};
export default validateRequest;
