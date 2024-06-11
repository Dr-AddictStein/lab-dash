export const createImage = async (req, res) => {
    console.log("SOSOS",req)
    if (!req?.file) {
        res.status(403).json({ status: false, error: "please upload a file" })
        return;
    }
    let data = {}
    if (!!req?.file) {
        data = {
            url: req.file.location,
            type: req.file.mimetype
        }
    }
    try {
        res.send({
            data: data,
            status: true
        })
    } catch (error) {
        res.status(403).json({ status: false, error: error })
    }
}

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

export const createStepImage = async (req, res) => {
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
