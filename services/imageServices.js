const Jimp = require('jimp');
const path = require('path');
const { createError } = require('../helpers/createErrors');
const fs = require('fs').promises;



const uploadImage = async (id, file) => {
    const avatarURL = path.join('avatars', `${id}${file.originalname}`);

    try {
      await (await Jimp.read(file.path)).resize(250, 250).write(path.join(__dirname, '../public', avatarURL));

        return avatarURL;
    } catch (error) {
        throw createError();
    } finally {
        await fs.unlink(file.path);
    }

}

module.exports = {
    uploadImage
}