export const createSourceCode = async (req, res) => {
    if (!req.file) {
        res.status(403).json({ status: false, error: "Please upload a file" });
        return;
    }
    const data = {
        url: req.file.location,
        type: req.file.mimetype
    };
    try {
        res.send({
            data: data,
            status: true
        });
    } catch (error) {
        res.status(403).json({ status: false, error: error.message });
    }
}
