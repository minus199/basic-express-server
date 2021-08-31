const express = require("express");
const router = express.Router();
const fetch = require("node-fetch")
const baseURL = 'https://api.dictionaryapi.dev/api/v2/entries'


const supportedLangs = {
    en_US: "English (US)",
    hi: "Hindi",
    es: "Spanish",
    fr: "French",
    ja: "Japanese",
    ru: "Russian",
    en_GB: "English (UK)",
    de: "German",
    it: "Italian",
    ko: "Korean",
    'pt-BR': "Brazilian Portuguese",
    ar: "Arabic",
    tr: "Turkish",
}

//api/dictionary/supported-langs
router.get('/supported-languages', function (req, res, next) {
    res.json(supportedLangs)
})

//https://api.dictionaryapi.dev/api/v2/entries/en_US/hello
router.get('/entries/:langCode/:searchTerm', function (req, res, next) {
    const { langCode, searchTerm } = req.params;
    if (!searchTerm) {
        res.status(400).send("Search term is empty")
        return
    }

    if (!langCode || !Object.keys(supportedLangs).includes(langCode)) {
        res.status(400).send("Language code is empty")
        return
    }

    fetch(`${baseURL}/${langCode}/${searchTerm}`)
        .then(dictRes => dictRes.json())
        .then(payload => res.json(payload))
})


module.exports = router