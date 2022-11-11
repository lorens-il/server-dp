import jwt from "jsonwebtoken";
export default (role) => {
    return (req, res, next) => {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            let token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({ message: "Пользователь не авторизован" });
            }
            token = token.split(" ")[1];
            const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
            if (decodeToken.role !== role) {
                return res.status(403).json({ message: "Доступ запрещён неправильная role" });
            }
            req.user = decodeToken;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Пользователь не авторизован" });
        }
    };
};
