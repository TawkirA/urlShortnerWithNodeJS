const mongoose = require('mongoose');
const validUrl = require('valid-url');
const shortUrlModel = mongoose.model('shortUrl');
const shortId = require('shortid');
const errorUrl = 'http://localhost/error';

module.exports = app => {
    app.get('/api/item/:code', async (req, res) => {
        const urlCode = req.params.code;
        const item = await shortUrlModel.findOne({ urlCode: urlCode});

        if (item) {
            return res.redirect(item.originalUrl);
        }else {
            return res.redirect(errorUrl);
        }
    });

    app.post('/api/item', async (req, res) => {
        const { originalUrl, shortBaseUrl } = req.body;
        if (validUrl.isUri(shortBaseUrl)) {

        }else {
            return res.status(401).json("Invalid base Url");
        }

        const urlCode = shortId.generate();
        const updatedAt = new Date();

        if (validUrl.isUri(originalUrl)) {
            try {
                const item = await shortUrlModel.findOne({ originalUrl: originalUrl });
                if (item) {
                    res.status(200).json(item);
                }else {
                    shortUrl = shortBaseUrl + '/' + urlCode;
                    const item = new shortUrlModel({
                        originalUrl,
                        shortUrl,
                        urlCode,
                        updatedAt
                    });
                    await item.save();
                    res.status(200).json(item);
                }
            } catch (err) {
                res.status(401).json("invalid id");
            }
        } else {
            return res.status(401).json("invalid original url");
        }
    })
}

