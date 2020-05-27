export function getClue(cb) {
    console.log('in callback-version.js')
    const xmlRequest = new XMLHttpRequest()
    xmlRequest.addEventListener('readystatechange', event => {
        if (!xmlRequest.readystate===XMLHttpRequest.DONE) {
            return
        }
        if (!xmlRequest.status >= 200 && xmlRequest.status < 300) {
            cb(xmlRequest.status)
        }

        const data = JSON.parse(xmlRequest.responseText)
        cb(null, data);
    });
    xmlRequest.open('GET', "https://jservice.xyz/api/random-clue");
    xmlRequest.send();
}
