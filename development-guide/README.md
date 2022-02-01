# IoT Flow JavaScript driver developer guide

This project describes how to build a javascript driver for the ThingPark X IoT Flow framework.

A driver allows to easily integrate new devices in ThingPark X IoT Flow. With it you define
how to decode uplinks/downlinks, how to encode downlinks and how to extract points.

-   [IoT Flow JavaScript driver developer guide](#IoT-Flow-JavaScript-driver-developer-guide)
    - [Concepts](#concepts)
        -   [Driver](#driver)
        -   [Thing](#thing)
        -   [Point](#point)
        -   [Application](#application)
        -   [Uplink](#uplink)
        -   [Downlink](#downlink)
    - [API](#API)
        - [Driver definition](#driver-definition)
        - [Driver functions](#driver-functions)
            - [Uplink decode](#uplink-decode)
            - [Downlink encode](#downlink-encode)
            - [Downlink decode](#downlink-decode)
            - [Points extraction](#points-extraction)
        - [Payload examples](#payload-examples)
        - [Json schemas](#json-schemas)
    - [Packaging](#packaging)
    - [Testing](#testing)
    - [Templates](#templates)
        - [Simple driver](#simple-driver)
        - [Advanced driver](#advanced-driver)
    - [Submission](#submission)

## Concepts

### Driver

The `driver` is the piece of code responsible to decode uplinks/downlinks and to encode downlinks for a single device
communication protocol. It is the core part of the IoT Flow framework to interact with new devices.

If a device is exposing several incompatible communication protocols, then several drivers needs to be implemented,
one for each.

The programming language used in this codec is the JavaScript which is a lightweight, interpreted, just-in-time compiled programming language with first class functions.

More precisely, the JavaScript ES5 is used as it is simple and widely supported in most communities.

### Thing

The `thing` is the cloud representation of a device that can interact with the IoT Flow framework. It can be of two
kinds:

-   A device: a physical device that uses a communication protocol (for example LoRaWAN).
-   A "virtual" device: some application running on an appliance that acts like a physical device or which represents an
    aggregated view of several devices (for example an aggregated temperature).

### Point

The `point` represents a value that could be extracted from a `thing`. It maps directly with a sensor, an
actuator or a configuration variable. It is defined by an `id`, a `unitId` and a `type`.
The `point` extracted by the driver is composed of a list of point in values (although most of the time there is only one of them).

One of two properties `record` or `records` must present according to your needs.

`record` that represents the actual value of the point. 
The `record` can be a string, number, or an array. 
There is two cases where a record can be an array:
- The point extracted contains different values.
- The point extracted define a geolocation value where the first element of the array is the latitude, and the second is the longitude.

`records` represents different values of the same point, in different timestamp.
`records` is an array of `object` where each object has a mandatory `eventTime` and a `value` .
The `value` represents the actual value of the point at the given `eventTime`.


The points defined in each driver must follow a predefined ontology of units if exist. You can find more information in [driver definition](#driver-definition) section.

### Application

The `application` identifies a communication protocol exposed by a device. It is composed of 3 information:

-   `producerId`: who specifies this communication protocol, could be either a manufacturer or an entity defining a
    public standard. **This value must be agreed with Actility**.
-   `moduleId`: an identifier for the communication protocol name. This value is decided by the manufacturer or the
    entity providing the public standard.
-   `version`: the communication protocol version. This value is decided by the manufacturer or the entity providing
    the public standard. It must only identifies the major version of the protocol.

This information is important for ThingPark X IoT Flow framework as it allows to identify the protocol exposed by
a device especially when several are possible for a single one.

Here are some examples explaining how the `application` works (we assume we are the acme company providing a fictive
humidity sensor):

#### Example 1

Our humidity sensor is exposing a proprietary communication protocol with any firmware strictly lower than v3. Starting
from v3 the device is now exposing a standard ZCL (ZigBee Cluster Library) payload.

In this case the `application` for pre v3 firmware devices would be:

-   `producerId`: `acme` (decided with Actility).
-   `moduleId`: `generic` (any name convenient to identify the protocol for `acme` company)
-   `version`: `1` (major version of the acme generic protocol).

For post v3 firmware devices the protocol would be:

-   `producerId`: `zba` (decided with Actility to identify the ZigBee Alliance)
-   `moduleId`: `zcl` (name of the protocol in the ZigBee Alliance)
-   `version`: `1` (major ZCL version)

#### Example 2

Our humidity sensor is exposing a proprietary communication protocol with any firmware strictly lower than v4. Starting
from v4 the device is now exposing a new incompatible proprietary communication protocol. It means the new
payload cannot be decoded by the same `driver` even using the payload length or the LoRaWAN context like the `fPort` or
the future `profileID`.

A possible example for this would be:

-   the pre v4 uplink payload is a single byte with an integer value from 0 to 100 representing the humidity in %RH
-   the post v4 uplink payload is a single byte with an integer value from 0 to 254 representing the humidity in %RH
    (from 0 to 100). Therefore, to get the %RH the read value must be multiplied by 100 and divided by 254.

In this example, there is no possible way to know in which case we are when receiving the uplink even looking at the
payload length or the LoRaWAN context. Therefore, we need to declare two `application` and by construction two `driver`.

So for this example, the `application` for pre v4 firmware devices would be:

-   `producerId`: `acme` (decided with Actility).
-   `moduleId`: `generic` (any name convenient to identify the protocol for `acme` company).
-   `version`: `1` (major version of the acme generic protocol).

For post v4 firmware devices the protocol would be:

-   `producerId`: `acme` (decided with Actility).
-   `moduleId`: `generic` (any name convenient to identify the protocol for `acme` company).
-   `version`: `2` (major version of the acme generic protocol).

### Uplink

A packet sent from the `thing` to the cloud.

### Downlink

A packet sent from the cloud to the `thing`.

## API

A driver is composed of 2 parts:

-   a static configuration defining the `driver` metadata.
-   a javascript code made of four possible functions to perform the encoding and decoding tasks.

### Driver definition

The driver definition must be declared in the driver's NPM's `package.json`.

This is the first condition for a driver to be valid: being an NPM package that includes a `driver` object in its
`package.json` which must declare at least a `producerId`, a `type` and an `application`.

Here is an example of a `driver` definition:

```json
{
  "name": "example-driver",
  "version": "1.0.0",
  "description": "My example driver",
  "specification": "https://github.com/actility/thingpark-iot-flow-js-driver/blob/master/examples/simple-driver/README.md",
  "deviceImageUrl": "https://market.thingpark.com/media/catalog/product/cache/e0c0cc57a7ea4992fdbd34d6aec6829f/r/o/roximity-detection-_-contact-tracing-starter-kit.jpg",
  "manufacturerLogoUrl": "https://www.actility.com/wp-content/uploads/2019/04/Actility_LOGO_color_RGB_WEB.png",
  "providerLogoUrl": "https://www.actility.com/wp-content/uploads/2019/04/Actility_LOGO_color_RGB_WEB.png",
  "main": "index.js",
  "scripts": {
    "test": "jest --collectCoverage"
  },
  "driver": {
    "description": "An example driver that is able to decode/encode data from temperature and humidity sensors with a pulse counter",
    "producerId": "actility",
    "type": "thingpark-x-js",
    "private": false,
    "application": {
      "producerId": "myProducer",
      "moduleId": "myModule",
      "version": "1"
    },
    "points": {
      "temperature": {
        "unitId": "Cel",
        "type": "double"
      },
      "humidity": {
        "unitId": "%RH",
        "type": "double"
      },
      "airHumidity": {
        "unitId": "%RH",
        "type": "double",
        "standardNaming": "unsupported"
      },
      "pulseCounter": {
        "type": "int64"
      }
    }
  },
  "devDependencies": {
    "jest": "^25.4.0"
  }
}
```

Here we declare a `driver.producerId` equal to `actility`. It means the `driver` is developed by Actility and it
implements a communication protocol (`driver.application`) coming from a fictive `myManufacturer`. Most of the time,
the `driver` developer is also the manufacturer and therefore `driver.producerId` and `driver.application.producerId`
are the same. Like in the `application` the `driver.producerId` must be agreed with Actility.

We also declare a `driver.type` equal to `thingpark-x-js`. This allows the ThingPark X IoT Flow framework to know what
kind of driver it is as it supports several formats. In this documentation we only describe the `thingpark-x-js`
format therefore the `driver.type` must be set to this value.

In addition, we declare `driver.description` equal to `An example driver that is able to decode/encode data from temperature and humidity sensors with a pulse counter`. This allows the user to see a brief description of the driver. Be careful, this driver description differs from the NPM property `description` (which is described below), this one provides a full description and can be longer than the short friendly name of the driver.

In order to protect your driver code from being visible, you can declare `driver.private` to be `true`, else your driver code is visible in our platform.

This driver also declares that it will extract 3 points which are: `temperature`, `humidity` and `pulseCounter`.

The `points` section is **mandatory** only when using the `extractPoints(input)` function (see [here](#points-extraction)
for a complete description). It describes a "contract" of points that can be extracted with the `driver`. 
The name of the point must follow the ontology naming convention if a `unitId` defined, unless it is declared that standard naming is unsupported. 
[Here](UNITS.md) you can see a list of all possible points names in the property `fields` in each unit.

Our ontology/units follow the form of  [oBIX protocol](http://docs.oasis-open.org/obix/obix/v1.1/csprd01/obix-v1.1-csprd01.pdf)
which provides an extensive database of predefined units that are represented in seven main dimensions.
These seven dimensions are represented in SI respectively as kilogram (kg), meter (m), 
second (sec), Kelvin (K), ampere (A), mole (mol), and candela (cd).

Each point can declare three properties:

- `type`: this is a **mandatory** property representing the [point type](#point-types). 
- `unitId`: this is an optional value that represents the point unit in case its `type` is `double`, `int64`, or `object`. The
    list of possible units are predefined [here](UNITS.md) according to the ontology. If a `unitId` is missing, you can raise an issue in this project
    to integrate it.
- `standardNaming`: this is an optional property that can take the value `unsupported` in case the point define a unit and does not follow 
    the ontology concerning its `name`.

###### Point types
The only possible values for a point type are:
- `string`
- `int64`
- `double`
- `boolean`
- `object`

Some regular NPM properties in `package.json` are also leveraged by ThingPark X IoT Flow framework. These are:

- `name`: will be used as a module identifier for the `driver`. If you are using an NPM scope in the form
    `@actility/example-driver`, the scope will be removed when building it.
- `version`: will be used as the `driver` version. Therefore, developer is required to build a new version when
    modifying its `driver`.
- `description`: will be used as a short friendly name for the `driver`. It should not be very long.

In ThingPark X IoT Flow framework the unique identifier for the `driver` will be
`{driver.producerId}:{name-without-scope}:{major-version}`.

Some optional properties can be added to ease the use of the driver:

- `specification`: A url that refers to the datasheet/manual of the device that corresponds to this driver.
- `deviceImageUrl`: A url that refers to the image of the device that corresponds to this driver.
- `manufacturerLogoUrl`: A url that refers to the logo image of the manufacturer of the device.
- `providerLogoUrl`: A url that refers to the logo image of the provider of this driver.

#### Limitations on length of fields
**Important:** There is some limitations on the length of fields in `package.json`:

-   `name` must be a string of maximum 16 characters.
-   `producerId` must be a string of maximum 8 characters.
-   `moduleId` must be a string of maximum 16 characters.
-   `driver.producerId` must be a string of maximum 8 characters.
-   `driver.application.producerId` must be a string of maximum 8 characters.
-   `driver.application.moduleId` must be a string of maximum 16 characters.

### Driver functions

The following sections describe the four javascript functions that a driver can declare to perform encoding and decoding
tasks.

A driver must at least declare a `decodeUplink(input)` function to be valid (see next section).

#### Uplink decode

Uplinks are decoded by calling the following function:

```javascript
function decodeUplink(input) {...}
```

_Note:_ _this function is required in order for the driver to be valid_.

The `input` is an object provided by the IoT Flow framework that is represented by the following json-schema:

```json
{
    "bytes": {
        "description": "the uplink payload byte array",
        "type": "array",
        "items": {
            "type": "number"
        },
        "required": true
    },
    "fPort": {
        "description": "the uplink payload fPort",
        "type": "number",
        "required": false
    },
    "time": {
        "description": "the datetime of the uplink message, it is a real javascript Date object",
        "type": "string",
        "format": "date-time",
        "required": true
    }
}
```

and the returned object of the function must be the decoded object.

#### Downlink encode

Downlinks are encoded by calling the following function:

```javascript
function encodeDownlink(input) {...}
```

The `input` is an object provided by the IoT Flow framework that is represented by the following json-schema:

```json
{
    "message": {
        "type": "object",
        "required": true
    }
}
```

where the `message` object is the higher-level object representing your downlink.

The function must return an object containg 2 fields:

-   bytes: array of numbers as it will be sent to the device.
-   fPort: the fPort on which the downlink must be sent.

#### Downlink decode

Downlinks are decoded by calling the following function:

```javascript
function decodeDownlink(input) {...}
```

The `input` is an object provided by the IoT Flow framework that is represented by the following json-schema:

```json
{
    "bytes": {
        "type": "array",
        "items": {
            "type": "number"
        },
        "required": true
    },
    "fPort": {
        "type": "number",
        "required": false
    }
}
```

and the returned object of the function must be the decoded object.

#### Points extraction

Points can be extracted once an uplink has been decoded. In order to extract points, a driver must provide the following function:

```javascript
function extractPoints(input) {...}
```

The `input` is an object provided by the IoT Flow framework that is represented by the following json-schema:

```json
{
    "message": {
        "description": "the object message as returned by the decodeUplink function",
        "type": "object",
        "required": true
    },
    "time": {
        "description": "the datetime of the uplink message, it is a real javascript Date object",
        "type": "string",
        "format": "date-time",
        "required": true
    }
}
```

The returned object must be:
- The wrapped object from the decoded one in case all the event are done at the same time, respecting the ontology.
Here's an example:
```json
{
    "temperature": 31.4,
    "location": [48.875158, 2.333822],
    "fft": [0.32, 0.33, 0.4523, 0.4456, 0.4356]
}
```
- OR, it is defined by the following json-schema in case the point has several values in different timestamp.

```json
{
  "type": "object",
  "additionalProperties": {
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "eventTime": {
          "type": "string",
          "format": "date-time",
          "required": true
        },
        "value": {
          "type": ["string", "number", "boolean"],
          "required": false
        }
      }
    }
  }
}
```
Here's an example:
```json
{
  "temperature": [
    {
      "eventTime": "2019-01-01T10:00:00+01:00",
      "value": 31.4
    },
    {
      "eventTime": "2019-01-01T11:00:00+01:00",
      "value": 31.2
    },
    {
      "eventTime": "2019-01-01T12:00:00+01:00",
      "value": 32
    }
  ]
}
```

### Payload examples

The following section describes the examples of the payloads of the driver.

Several examples of uplink and downlink payloads must be declared directly in the driver package and especially in a directory `/example`. The name of each examples file must follow the pattern `*.examples.json`. You can split and organize the examples files according to your own logic.

These examples will be used in order to provide for the users of the driver some examples of the payload to be decoded/encoded to test the driver. In addition, it will be used to facilitate the testing of the driver while development ( you can look at [here](templates/simple-driver/test/driver-examples.spec.js) ).

An `*.examples.json` file contains an array of several uplink/downlink examples. You can find an example of this file in the driver example [here](templates/simple-driver/examples/humidity.examples.json).

#### Example

The uplink/downlink example used is an object represented by the following json-schema:

```json
{
    "description": {
        "description": "the description of the uplink/downlink example",
        "type": "string",
        "required": true
    },
    "type": {
        "description": "the type of the uplink/downlink example",
        "type": "string",
        "enum": ["uplink", "downlink"],
        "required": true
    },
    "bytes": {
        "description": "the uplink/downlink payload expressed in hexadecimal",
        "type": "string",
        "required": true
    },
    "fPort": {
        "description": "the uplink/downlink message LoRaWAN fPort",
        "type": "number",
        "required": true
    },
    "time": {
        "description": "the uplin/downlink message time",
        "type": "string",
        "format": "date-time",
        "required": false
    },
    "data": {
        "description": "the decoded uplink/downlink view",
        "type": "object",
        "required": true
    },
    "points": {
        "description": "the extracted points. This field is allowed for uplink examples only",
        "type": "object",
        "required": "false",
        "additionalProperties": {
            "type": "object",
            "properties": {
                "unitId": {
                    "description": "the unit of the extracted point",
                    "type": "string",
                    "required": true
                },
                "type": {
                    "description": "the data type of the point extracted",
                    "type": "string",
                    "required": true
                },
                "record": {
                    "type": ["string", "number", "boolean"],
                    "required": false
                },
                "records": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "eventTime": {
                          "type": "string",
                          "format": "date-time",
                          "required": true
                        }, 
                        "value": {
                          "type": ["string", "number", "boolean"],
                          "required": false
                        }
                      }
                },
                "required": false
              }
            }
        }
    }
}
```

**Important**

- `description`: This field must be unique.
- `points`: This field can be used in the `uplink` example if there is some values in the field `data` must be extracted
  as points.

### Json Schemas

The following section describes the Json Schema of the decoded payloads of the driver.

As the output data from the decoding payload process is not predictable, it is better to declare Json schemas that defines the structure of this output to ease the use of driver after decoding.

The Json schemas of uplink and downlink payloads must be declared directly in the driver package and especially in a directory `/json-schemas`.
Two Json schemas can be declared following the pattern: `uplink.schema.json` for uplink data, and `downlink.schema.json` for downlink data if supported.

An `*.schema.json` file contains a generic json schema for all types of payload decoded by this driver of several uplink/downlink examples. You can find an example of this file in the driver example [here](templates/simple-driver/json-schemas). 

## Packaging

To simplify the open distribution and integration with our platform, a packaging leveraging NPMs is defined.

NPM was chosen because it is the most widely used packaging system for JavaScript code. Also, this approach defines a
clear code layout that can be distributed independently using the developer preferred version control tool.

You can find a full description of packaging in the README file of simple driver [here](templates/simple-driver/README.md).

## Testing

Testing your driver is a very important process, thus the user is highly encouraged to test the driver in most possible
use cases as well as error cases.

You can find a full example of tests [here](templates/simple-driver/test).

**Important:** The test of your driver is needed to prove a minimum test coverage of 85% to be valid on our framework.

## Templates

### Simple driver

You will find [here](templates/simple-driver/README.md) a tutorial explaining how to create your first driver. It follows
the creation of a driver for a fictive device exposing a temperature, humidity and a pulse counter.

### Advanced driver

If your device payload is complex and requires several source code files to increase readability and maintainability you
can look at this example [here](templates/advanced-driver/README.md). In this tutorial, we will restart from the
previously created driver and transform it to use several files.

## Submission

In order to submit your device and driver to the shared library, you can register to the [ThingPark Ignite program](https://community.thingpark.org/index.php/thingpark-ignite-program/) and [submit your code](https://community.thingpark.org/index.php/submit-your-thingpark-x-driver/).
