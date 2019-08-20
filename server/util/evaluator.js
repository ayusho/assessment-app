var axios = require("axios");
var config = require('../config/config');

var text = {
    text: "Game of Thrones is a cultural phenomenon largely because HBO enables fans to elevate the brand in their own authentic way. Despite the intense artistry and attention to detail on Game of Thrones, the show has never taken itself too seriously.There are countless examples of fans using the Game of Thrones brand that, in the context of another brand, might be questionable: YouTube accounts dedicated to fan-made trailers or episode analyses, entire Reddit communities, podcasts, fan-made merchandise for sale on Etsy, the list could go on forever. The point is that most of these entities are not formally licensing the Game of Thrones brand.Loosening the grip on a brand is always a gamble, but in the case of Game of Thrones, it paid off handsomely. While HBO has litigated certain cases of copyright infringement, the majority of unauthorized use seems to be permitted, which further extends the brand’s reach."
}


var headers = {
    headers: {
        'Content-Type': 'application/text'
    }
}
var getRelevance = function (assessment) {
    return new Promise((resolve, reject) => {
        axios.post(config.relevanceURL,
                text,
                headers)
            .then(res => {
                resolve(res.data);
            }, err => {
                reject(err);
            });
    });
};

var getSpellings = function (assessment) {
    return new Promise((resolve, reject) => {
        axios.post(config.spellingURL,
                text,
                headers)
            .then(res => {
                resolve(res.data);
            }, err => {
                reject(err);
            });
    });
};

var getGrammer = function (assessment) {
    return new Promise((resolve, reject) => {
        axios.post(config.grammarURL,
                text,
                headers)
            .then(res => {
                resolve(res.data);
            }, err => {
                reject(err);
            });
    });
};


module.exports = {
    getGrammer,
    getRelevance,
    getSpellings
}