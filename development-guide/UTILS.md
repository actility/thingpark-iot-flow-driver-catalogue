In this section you will find several util functions that will ease the driver development process.

_Note: This functions are provided as is and only as a help in your development process. Users are highly
encouraged to thoroughly test the drivers when using these functions._

Contents:

-   [Functions](#functions)
    -   [Hexadecimal string to byte array](#hexadecimal-string-to-byte-array)
    -   [Byte array to hexadecimal string](#byte-array-to-hexadecimal-string)

# Functions

All of the following functions either take or return an array of bytes. It must be noted that
in javascript bytes are represented as numbers between 0 and 255.

## Hexadecimal string to byte array

This function will convert a properly formatted hexadecimal string into an array of bytes.

```javascript
function hexToBytes(hex) {
    if ((hex.length & 1) !== 0) {
        throw Error("input string must be hexadecimal, odd number of characters");
    }
    var bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        if (Number.isNaN(parseInt(hex.substr(i, 1), 16)) || Number.isNaN(parseInt(hex.substr(i + 1, 1), 16))) {
            throw Error("input string must be hexadecimal, invalid character");
        }
        const byte = parseInt(hex.substr(i, 2), 16);
        bytes.push(byte);
    }
    return bytes;
}
```

## Byte array to hexadecimal string

This function is the inverse of [hexToBytes](#hexadecimal-string-to-byte-array), it will convert an array
of bytes into an hexadecimal string.

```javascript
function bytesToHex(bytes) {
    return Array.from(bytes, (byte) => {
        return ("0" + (byte & 0xff).toString(16)).slice(-2);
    }).join("");
}
```
