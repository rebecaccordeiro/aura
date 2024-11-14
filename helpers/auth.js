export function checkAuth(req, res, next) {
    const userId = req.session.userid;
    const ngoId = req.session.ngoid;

    if (!userId && !ngoId) {
        res.redirect('/login');
    }

    next();
}