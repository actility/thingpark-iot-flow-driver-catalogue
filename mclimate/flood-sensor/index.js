
function decodeUplink(input) {
	try{
		var bytes = input.bytes;
		var decbin = function(number) {
			return parseInt(number, 10).toString(2);
		};
		var byteArray = bytes.map(function(byte) {
			var number = decbin(byte);
			return Array(9 - number.length).join('0') + number;
		});
		var messageTypes = [ 'keepalive', 'testButtonPressed', 'floodDetected', 'fraudDetected', 'fraudDetected' ];
		toBool = function(value) {
			return value == '1';
		};
		shortPackage = function(byteArray) {
			return {
					reason: messageTypes[parseInt(byteArray[0].slice(0, 3),2)],
					boxTamper: toBool(byteArray[0][4]),
					flood: toBool(byteArray[0][6]),
					batteryVoltage: (parseInt(byteArray[1], 2) * 16)/1000,
			};
		};
		longPackage = function(byteArray) {
			return {
					reason: messageTypes[parseInt(byteArray[0].slice(0, 3),2)],
					boxTamper: toBool(byteArray[0][4]),
					flood: toBool(byteArray[0][6]),
					batteryVoltage: (parseInt(byteArray[1], 2) * 16)/1000,
					temperature: parseInt(byteArray[2], 2),
			};
		};
		if(byteArray.length < 2){
			throw new Error('Unhandled data');
		}
		if (byteArray.length > 2) {
			return longPackage(byteArray);
		} else {
			return shortPackage(byteArray);
		}
	}catch (e) {
        throw new Error('Unhandled data');
    }
}


function decodeDownlink(input) {
}

function encodeDownlink(input) {
}

function extractPoints(input) {
    let result = {};
    let elements = input.message.volumes;
    if (typeof elements !== "undefined") {
        result.volume = [];
        elements.forEach(element => {
            result.volume.push({
                eventTime: element.time,
                value: element.volume
            })
        });
    }
    return result;
}

exports.decodeUplink = decodeUplink;
exports.decodeDownlink = decodeDownlink;
exports.encodeDownlink = encodeDownlink;
exports.extractPoints = extractPoints;