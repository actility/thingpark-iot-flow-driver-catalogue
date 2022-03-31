
function decodeUplink(input) {
    try{
        var bytes = input.bytes;
        var data = {};
        function decbin (number) {
        if (number < 0) {
            number = 0xFFFFFFFF + number + 1;
        }
        return parseInt(number, 10).toString(2);
        }
        function handleKeepalive(bytes, data){
            var byteArray = bytes.map(function(byte) {
                var number = decbin(byte);
                return Array(9 - number.length).join('0') + number;
            });
            var sAQI1 = byteArray[1].substr(0);
            var sAQI2 = byteArray[2].slice(0, 1);
            var p1 = byteArray[6];
            var p2 = byteArray[7].slice(0, 3);
            var t1 = byteArray[7].substr(4);
            var t2 = byteArray[8].slice(0, 6);

            data.sensorTemperature = (parseInt('' + t1 + t2, 2) - 400) / 10
            data.relativeHumidity = (parseInt(byteArray[5], 2) * 4) / 10
            data.sAQI = parseInt('' + sAQI1 + sAQI2, 2) * 16
            data.AQI = parseInt(byteArray[2].substring(1, 6), 2) * 16
            data.CO2eq = parseInt('' + byteArray[2].slice(6, 8) + byteArray[3], 2) * 32
            data.VOC = parseInt(byteArray[4], 2) * 4
            data.pressure = (parseInt('' + p1 + p2, 2) * 40 + 30000) / 100
            data.accuracyAqi = parseInt(byteArray[8].substr(-2), 2)
            data.batteryVoltage = Number(((parseInt(byteArray[9], 2) * 8 + 1600)/1000).toFixed(2))
            return data;
        }
    
        function handleResponse(bytes, data){
        var commands = bytes.map(function(byte){
            return ("0" + byte.toString(16)).substr(-2); 
        });
        commands = commands.slice(0,-10);
        var command_len = 0;
    
        commands.map(function (command, i) {
            switch (command) {
                case '04':
                    {
                        command_len = 2;
                        var hardwareVersion = commands[i + 1];
                        var softwareVersion = commands[i + 2];
                        data.deviceVersions = { hardware: Number(hardwareVersion), software: Number(softwareVersion) };
                    }
                break;
                case '12':
                    {
                        command_len = 1;
                        data.keepAliveTime = parseInt(commands[i + 1], 16);
                    }
                break;
                case '19':
                    {
                        command_len = 1;
                        var commandResponse = parseInt(commands[i + 1], 16);
                        var periodInMinutes = commandResponse * 5 / 60;
                        data.joinRetryPeriod =  periodInMinutes;
                    }
                break;
                case '1b':
                    {
                        command_len = 1;
                        data.uplinkType = parseInt(commands[i + 1], 16) ;
                    }
                break;
                case '1d':
                    {
                        command_len = 2;
                        var deviceKeepAlive = 5;
                        var wdpC = commands[i + 1] == '00' ? false : commands[i + 1] * deviceKeepAlive + 7;
                        var wdpUc = commands[i + 2] == '00' ? false : parseInt(commands[i + 2], 16);
                        data.watchDogParams= { wdpC: wdpC, wdpUc: wdpUc } ;
                    }
                break;
                default:
                    break;
            }
            commands.splice(i,command_len);
        });
        return data;
        }
        if (bytes[0] == 1) {
            data = handleKeepalive(bytes, data);
        }else{
            data = handleResponse(bytes,data);
            bytes = bytes.slice(-10);
            data = handleKeepalive(bytes, data);
        }
        return data;
    } catch (e) {
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