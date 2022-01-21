let driver = require('./index.js');

const example = {
    bytes: 'ffff016310011603',
    fPort: 1,
    time: "2020-08-02T20:00:00.000+05:00",
}

const decoded = driver.decodeUplink({ bytes: Buffer.from(example.bytes, 'hex'), fPort: example.fPort});
console.log('decodeUplink output:');
console.log(JSON.stringify(decoded, null, 4));

console.log('extractPoints output:');
const extracted = driver.extractPoints({ message: decoded, time: example.time });
console.log(JSON.stringify(extracted, null, 4));
