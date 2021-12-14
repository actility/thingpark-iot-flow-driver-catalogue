const translator = require('strips-lora-translator-open-source');

const transformTable = {
    // Indexed by result's value
    CheckInConfirmed:        { func: (r,o)=>{ r.version=o.version; r.idddata = o.idddata; } },
    EmptyReport:             { func: (r,o)=>{}},
    BatteryReport:           { func: (r,o)=>r.battery=o.value },
    IRProximityReport:       { func: (r,o)=>r.proximity=o.value },
    PresenceReport:          { func: (r,o)=>r.presence=o.value },
    IRCloseProximityReport:  { func: (r,o)=>r.closeProximity=o.value},
    CloseProximityAlarm:     { func: (r,o)=>r.closeProximityAlarm=o.value},
    DisinfectAlarm:          { func: (r,o)=>r.disinfectAlarm=o.value },
};

const hiddenFields = {
    historyStart: false,
};

function transformStripsDecodeUplinkToActilityFormat(obj) {
    if (Array.isArray(obj))
        obj = obj[0];
    let result = {}
    for (const key in obj) {
        if (transformTable.hasOwnProperty(key)) {
            let transform = transformTable[key];
            transform.func(result, obj[key]);
        } else {
            if (hiddenFields.hasOwnProperty(key))
                continue;
            else
                throw new Error("The uplink contained " + key + " which is currently not supported by this decoder.");
        }
    }
    return result;
}

// Can only do uplinks
function transformStripsDecodeSettingsUplinkToActilityFormat(obj) {
    var result = {};
    if (Array.isArray(obj))
        obj = obj[0];
    else 
        throw new Error("Unexpected format emitted by decoder");
    if (obj.hasOwnProperty('statusCode'))
        result.statusCode = obj.statusCode.value;
    else
        throw new Error("Settings uplinks are not supported by this decoder");
    return result;
}

// Full functionality
function transformStripsDecodeDownlinkToActilityFormat(obj) {
    let result = {}
    for (const key in obj) {
        if (typeof(obj[key] === 'object') && obj[key].hasOwnProperty('value')) {
            result[key] = obj[key].value;
        }
    }
    if (obj.hasOwnProperty('cmd') && obj.cmd.hasOwnProperty('name'))
        result.cmd = obj.cmd.name;
    return result;
}

// Full functionality
function transformStripsEncodeDownlinkFromActilityFormat(obj) {
    let transformed = {};
    for (const key in obj) {
        if (key == 'cmd')
            transformed.cmd = { name: obj.cmd };
        else
            transformed[key] = { value: obj[key] };
    }
    const encoding = translator.encodeLoraStripsDownlink(transformed);
    // Now holds { port: number, data: hexadecimal string }
    // Convert the hex string to an array of numbers
    const buffer = Buffer.from(encoding.data, "hex");
    var bytes = [];
    for (let i = 0; i < buffer.length; ++i)
        bytes.push(buffer.readUInt8(i));

    return { fPort: encoding.port, bytes };
}

// Limited functionality primarily due to possible limitation of actility decoder return format (timed offsets appear not to be possible to represent)
function decodeUplink(input) {
    const bytes = input.bytes; // Assumed to be byte array
    const port = input.fPort;
    switch(port) {
    case 1: return transformStripsDecodeUplinkToActilityFormat(translator.decodeLoraStripsUplink(port, bytes));
    case 11: return transformStripsDecodeSettingsUplinkToActilityFormat(translator.decodeLoraStripsUplink(port, bytes));
    case 2: throw new Error("This decoder does not support history data.");
    default: throw new Error("This decoder will only decode data points and status codes, not metadata or mac commands.");
    }
}

// Full Strips downlink decoder, all functionality
function decodeDownlink(input) {
    const bytes = input.bytes; // Assumed to be byte array
    const port = input.fPort;
    return transformStripsDecodeDownlinkToActilityFormat(translator.decodeLoraStripsDownlink(port, bytes));
}

// Full strips downlink encoder, all functionality
function encodeDownlink(input) {
    return transformStripsEncodeDownlinkFromActilityFormat(input);
}

// I am confused over the function of this function...
function extractPoints(input) {
    return input.message;
}

exports.decodeUplink   = decodeUplink;
exports.decodeDownlink = decodeDownlink;
exports.encodeDownlink = encodeDownlink;
exports.extractPoints  = extractPoints;
