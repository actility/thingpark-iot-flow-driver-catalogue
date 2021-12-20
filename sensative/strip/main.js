var driver;(()=>{var e={473:e=>{"use strict";e.exports=(e,n)=>{const t=(n,t)=>{switch(127&n){case 0:t.emptyFrame={};break;case 1:t.battery={},t.battery=e[i++];break;case 2:t.temperature={},t.temperature.value=((128&e[i]?-65536:0)|e[i++]<<8|e[i++])/10;break;case 3:t.tempAlarm={},t.tempAlarm.highAlarm=!!(1&e[i]),t.tempAlarm.lowAlarm=!!(2&e[i]),i++;break;case 4:t.averageTemperature={},t.averageTemperature.value=((128&e[i]?-65536:0)|e[i++]<<8|e[i++])/10;break;case 5:t.avgTempAlarm={},t.avgTempAlarm.highAlarm=!!(1&e[i]),t.avgTempAlarm.lowAlarm=!!(2&e[i]),i++;break;case 6:t.humidity={},t.humidity.value=e[i++]/2;break;case 7:t.lux={},t.lux.value=e[i++]<<8|e[i++];break;case 8:t.lux2={},t.lux2.value=e[i++]<<8|e[i++];break;case 9:t.door={},t.door.value=!!e[i++];break;case 10:t.doorAlarm={},t.doorAlarm.value=!!e[i++];break;case 11:t.tamperReport={},t.tamperReport.value=!!e[i++];break;case 12:t.tamperAlarm={},t.tamperAlarm.value=!!e[i++];break;case 13:t.flood={},t.flood.value=e[i++];break;case 14:t.floodAlarm={},t.floodAlarm.value=!!e[i++];break;case 15:t.foilAlarm={},t.foilAlarm.value=!!e[i++];break;case 16:t.userSwitch1Alarm={},t.userSwitch1Alarm.value=!!e[i++];break;case 17:t.doorCount={},t.doorCount.value=e[i++]<<8|e[i++];break;case 18:t.presence={},t.presence.value=!!e[i++];break;case 19:t.IRproximity={},t.IRproximity.value=e[i++]<<8|e[i++];break;case 20:t.IRcloseproximity={},t.IRcloseproximity.value=e[i++]<<8|e[i++];break;case 21:t.closeProximityAlarm={},t.closeProximityAlarm.value=!!e[i++];break;case 22:t.disinfectAlarm={},t.disinfectAlarm.value=e[i++],0==t.disinfectAlarm.value&&(t.disinfectAlarm.state="dirty"),1==t.disinfectAlarm.value&&(t.disinfectAlarm.state="occupied"),2==t.disinfectAlarm.value&&(t.disinfectAlarm.state="cleaning"),3==t.disinfectAlarm.value&&(t.disinfectAlarm.state="clean");break;case 80:t.humidity={},t.humidity.value=e[i++]/2,t.temperature={},t.temperature=((128&e[i]?-65536:0)|e[i++]<<8|e[i++])/10;break;case 81:t.humidity={},t.humidity.value=e[i++]/2,t.averageTemperature={},t.averageTemperature.value=((128&e[i]?-65536:0)|e[i++]<<8|e[i++])/10;break;case 82:t.door={},t.door.value=!!e[i++],t.temperature={},t.temperature=((128&e[i]?-65536:0)|e[i++]<<8|e[i++])/10;break;case 112:t.capacitanceFlood={},t.capacitanceFlood.value=e[i++]<<8|e[i++];break;case 113:t.capacitancePad={},t.capacitancePad.value=e[i++]<<8|e[i++];break;case 110:t.swversion={};const n=(e[i++]<<24|e[i++]<<16|e[i++]<<8|e[i++])>>>0;t.swversion.value=n.toString(16),t.startUpCount={},t.startUpCount.value=e[i++],t.watchdogCount={},t.watchdogCount.value=e[i++],t.stackTxFailRebootCount={},t.stackTxFailRebootCount.value=e[i++],t.badConditionsCounter={},t.badConditionsCounter.value=e[i++];break;case 114:t.capacitanceEnd={},t.capacitanceEnd.value=e[i++]<<8|e[i++]}};var o,r={},i=0;switch(n){case 1:if(e.length<2){r.error="Wrong length of RX package";break}for(r.historySeqNr=e[i++]<<8|e[i++],r.prevHistSeqNr=r.historySeqNr;i<e.length;)128&(o=e[i++])&&r.prevHistSeqNr--,t(o,r);break;case 2:var a=new Date;if(r.history={},e.length<2){r.history.error="Wrong length of RX package";break}for(var d=e[i++]<<8|e[i++];i<e.length;){r.history[d]={},r.history.now=a.toUTCString();const n=e[i++]<<24|e[i++]<<16|e[i++]<<8|e[i++];r.history[d].timeStamp=new Date(a.getTime()-1e3*n).toUTCString(),t(o=e[i++],r.history[d]),d++}}return r}},519:(e,n,t)=>{const{BADHINTS:o}=t(670),{report:r}=t(303),i=e=>e.toString(10),a=e=>"Ox"+e.toString(16);function d(e,n){const t=2*n;var o=Number(e).toString(16);for(o.length>t&&(o=o.substring(o.length-t));o.length<t;)o="0"+o;return o}const s=e=>d(parseInt(e.substring(2),16),4),c=e=>d(e,4),l={getsize:(e,n)=>1,decode:(e,n)=>e[n]},u={getsize:(e,n)=>l.getsize(e,n),decode:(e,n)=>l.decode(e,n)/2},m={getsize:(e,n)=>2,decode:(e,n)=>(e[n++]<<8)+e[n]},p={getsize:(e,n)=>2,decode:(e,n)=>((e,n)=>(128&e[n]?-65536:0)|e[n++]<<8|e[n++])(e,n)/10},h={getsize:(e,n)=>1,decode:(e,n)=>({high:!!(1&e[n]),low:!!(2&e[n])})},g={getsize:(e,n)=>1,decode:(e,n)=>!!e[n]},f={getsize:(e,n)=>u.getsize(e,n)+p.getsize(e,n+1),decode:(e,n)=>({humidity:{value:u.decode(e,n),unit:"%"},temp:{value:p.decode(e,n+1),unit:"C"}})},E={getsize:(e,n)=>3,decode:(e,n)=>({door:{value:g.decode(e,n),unit:"bool"},temp:{value:p.decode(e,n+1),unit:"C"}})},T=2,A=8,R=16,_=32,v=64,L=128,O=256,w=512,P={CheckInConfirmed:{reportbit:0,sensors:T,coding:{getsize:(e,n)=>8,decode:(e,n)=>({version:d((e[n++]<<24)+(e[n++]<<16)+(e[n++]<<8)+e[n++],4),idddata:d((e[n++]<<24)+(e[n++]<<16)+(e[n++]<<8)+e[n++],4)})},channel:110,unit:""},EmptyReport:{reportbit:-1,sensors:T,coding:{getsize:(e,n)=>0,decode:(e,n)=>0},channel:0,unit:""},BatteryReport:{reportbit:1,sensors:4,coding:l,channel:1,unit:"%"},TempReport:{reportbit:2,sensors:A,coding:p,channel:2,unit:"C"},TempAlarm:{reportbit:3,sensors:A,coding:h,channel:3,unit:""},AverageTempReport:{reportbit:4,sensors:A,coding:p,channel:4,unit:"C"},AverageTempAlarm:{reportbit:5,sensors:A,coding:h,channel:5,unit:""},HumidityReport:{reportbit:6,sensors:R,coding:u,channel:6,unit:"%"},LuxReport:{reportbit:7,sensors:_,coding:m,channel:7,unit:"Lux"},LuxReport2:{reportbit:8,sensors:_,coding:m,channel:8,unit:"Lux"},DoorReport:{reportbit:9,sensors:v,coding:g,channel:9,unit:""},DoorAlarm:{reportbit:10,sensors:v,coding:g,channel:10,unit:""},TamperReport:{reportbit:11,sensors:L,coding:g,channel:11,unit:""},TamperAlarm:{reportbit:12,sensors:L,coding:g,channel:12,unit:""},FloodReport:{reportbit:13,sensors:O,coding:l,channel:13,unit:""},FloodAlarm:{reportbit:14,sensors:O,coding:g,channel:14,unit:""},FoilAlarm:{reportbit:15,sensors:O,coding:g,channel:15,unit:""},TempHumReport:{reportbit:16,sensors:A|R,coding:f,channel:80,unit:""},AvgTempHumReport:{reportbit:17,sensors:A|R,coding:f,channel:81,unit:""},TempDoorReport:{reportbit:18,sensors:A|v,coding:E,channel:82,unit:""},CapacitanceFloodReport:{reportbit:19,sensors:O,coding:m,channel:112,unit:""},CapacitancePadReport:{reportbit:20,sensors:O,coding:m,channel:113,unit:""},CapacitanceEndReport:{reportbit:21,sensors:O,coding:m,channel:114,unit:""},UserSwitch1Alarm:{reportbit:22,sensors:L,coding:g,channel:16,unit:""},DoorCountReport:{reportbit:23,sensors:v,coding:m,channel:17,unit:""},PresenceReport:{reportbit:24,sensors:w,coding:g,channel:18,unit:""},IRProximityReport:{reportbit:25,sensors:w,coding:m,channel:19,unit:""},IRCloseProximityReport:{reportbit:26,sensors:w,coding:m,channel:20,unit:""},CloseProximityAlarm:{reportbit:27,sensors:w,coding:g,channel:21,unit:""},DisinfectAlarm:{reportbit:28,sensors:w,coding:l,channel:22,unit:""}},C=e=>{let n="";for(var t in P)e&1<<P[t].reportbit&&(""!=n&&(n+="|"),n+=t);return n},S=e=>{const n=e.split("|");let t=0;return n.map((e=>{if(e.length>0){if(!P.hasOwnProperty(e))throw{message:"Invalid report id: "+e};t|=1<<P[e].reportbit}})),d(t,4)},b={INVERT_DOOR:1,HIGH_POWER_PROXIMITY:2},I={NONE:{id:0,unit:"none",decode:a,encode:s,name:"None"},VERSION:{id:1,unit:"version",decode:a,encode:s,name:"Version"},BASE_POLL_INTERVAL:{id:2,unit:"ms",decode:i,encode:c,name:"Base poll interval"},REPORTS_ENABLED:{id:3,unit:"reports",decode:C,encode:S,name:"Reports enabled"},TEMP_POLL_INTERVAL:{id:4,unit:"s",decode:i,encode:c,name:"Temp poll interval"},TEMP_SEND_IMMEDIATELY_TRESHOLD:{id:5,unit:"mC",decode:i,encode:c,name:"Temp send immediately treshold"},TEMP_SEND_THROTTLED_TRESHOLD:{id:6,unit:"mC",decode:i,encode:c,name:"Temp send throttled treshold"},TEMP_SEND_THROTTLED_TIME:{id:7,unit:"s",decode:i,encode:c,name:"Temp send throttled time"},TEMP_LOW_ALARM:{id:8,unit:"mC",decode:i,encode:c,name:"Temp low alarm"},TEMP_HIGH_ALARM:{id:9,unit:"mC",decode:i,encode:c,name:"Temp high alarm"},TEMP_ALARM_HYSTERESIS:{id:10,unit:"mC",decode:i,encode:c,name:"Temp alarm hysteresis"},AVGTEMP_AVERAGE_TIME:{id:11,unit:"s",decode:i,encode:c,name:"Average temp average time"},AVGTEMP_MIN_TEMP:{id:12,unit:"mC",decode:i,encode:c,name:"Average temp min temp"},AVGTEMP_SEND_IMMEDIATELY_TRESHOLD:{id:13,unit:"mC",decode:i,encode:c,name:"Averate temp send immediately treshold"},AVGTEMP_LOW_ALARM:{id:14,unit:"mC",decode:i,encode:c,name:"Average temp low alarm"},AVGTEMP_HIGH_ALARM:{id:15,unit:"mC",decode:i,encode:c,name:"Average temp high alarm"},AVGTEMP_ALARM_HYSTERESIS:{id:16,unit:"mC",decode:i,encode:c,name:"Average temp hysteresis"},HUMIDITY_POLL_INTERVAL:{id:17,unit:"s",decode:i,encode:c,name:"Humidity poll interval"},HUMIDITY_TRESHOLD:{id:18,unit:"%",decode:i,encode:c,name:"Humidity treshold"},LUX_POLL_INTERVAL:{id:19,unit:"s",decode:i,encode:c,name:"Lux poll interval"},LUX_HIGH_LEVEL_1:{id:20,unit:"Lux",decode:i,encode:c,name:"Lux high level 1"},LUX_LOW_LEVEL_1:{id:21,unit:"Lux",decode:i,encode:c,name:"Lux low level 1"},LUX_HIGH_LEVEL_2:{id:22,unit:"Lux",decode:i,encode:c,name:"Lux high level 2"},LUX_LOW_LEVEL_2:{id:23,unit:"Lux",decode:i,encode:c,name:"Lux low level 2"},FLOOD_POLL_INTERVAL:{id:24,unit:"s",decode:i,encode:c,name:"Flood poll interval"},FLOOD_CAPACITANCE_MIN:{id:25,unit:"capacitance",decode:i,encode:c,name:"Flood capacitance min"},FLOOD_CAPACITANCE_MAX:{id:26,unit:"capacitance",decode:i,encode:c,name:"Flood capacitance max"},FLOOD_REPORT_INTERVAL:{id:27,unit:"s",decode:i,encode:c,name:"Flood report interval"},FLOOD_ALARM_TRESHOLD:{id:28,unit:"%",decode:i,encode:c,name:"Flood alarm treshold"},FLOOD_ALARM_HYSTERESIS:{id:29,unit:"%",decode:i,encode:c,name:"Flood alarm hysteresis"},SETTINGS_FOIL_TRESHOLD:{id:30,unit:"capacitance",decode:i,encode:c,name:"Foil treshold"},CAPACITANCE_FLOOD_REPORT_INTERVAL:{id:31,unit:"s",decode:i,encode:c,name:"Cap flood report interval"},CAPACITANCE_PAD_REPORT_INTERVAL:{id:32,unit:"s",decode:i,encode:c,name:"Cap pad report interval"},CAPACITANCE_END_REPORT_INTERVAL:{id:33,unit:"s",decode:i,encode:c,name:"Cap end report interval"},SENSORS_COMBINED_1:{id:34,unit:"reports",decode:C,encode:S,name:"Combined sensors 1"},SENSORS_COMBINED_2:{id:35,unit:"reports",decode:C,encode:S,name:"Combined sensors 2"},SENSORS_COMBINED_3:{id:36,unit:"reports",decode:C,encode:S,name:"Combined sensors 3"},HISTORY_REPORTS:{id:37,unit:"reports",decode:C,encode:S,name:"History reports"},DEMO_TRYJOIN_INTERVAL:{id:38,unit:"min",decode:i,encode:c,name:"Try join interval"},LUX_PLASTIC_COMP:{id:39,unit:"%",decode:i,encode:c,name:"Lux plastic comp"},LORA_DATA_RATE:{id:40,unit:"datarate",decode:i,encode:c,name:"Lora data rate"},LED_LEVEL:{id:41,unit:"ledlevel",decode:i,encode:c,name:"Led level"},LINK_CHECK_INTERVAL:{id:42,unit:"unknown",decode:i,encode:c,name:"Link check interval"},RESEND_RESET_TIME:{id:43,unit:"unknown",decode:i,encode:c,name:"Resend reset time"},LUX_LOW_CUTOFF:{id:44,unit:"lux",decode:i,encode:c,name:"Lux low cutoff"},DOOR_COUNT_REPORT_INTERVAL:{id:45,unit:"s",decode:i,encode:c,name:"Door count interval"},IR_PROXIMITY_REPORT_INTERVAL:{id:46,unit:"s",decode:i,encode:c,name:"IR Proximity report interval"},PRESENCE_POLL_INTERVAL:{id:47,unit:"s",decode:i,encode:c,name:"Presence poll interval"},PRESENCE_TRESHOLD:{id:48,unit:"reflection",decode:i,encode:c,name:"Presence treshold"},PRESENCE_TIMEOUT:{id:49,unit:"s",decode:i,encode:c,name:"Presence timeout"},SENSOR_CONFIGURATION:{id:50,unit:"config",decode:e=>{let n="";for(let t in b)e&b[t]&&(""!=n&&(n+="|"),n+=t);return n},encode:e=>{const n=e.split("|");let t=0;return n.map((e=>{for(let n in b)e==n&&(t|=b[n])})),d(t,4)},name:"Sensor configuration"}},y={DEFAULT:{id:0,name:"Default"},COMFORT_TEMP:{id:1,name:"Comfort Temp"},COMFORT_TEMP_LUX:{id:2,name:"Comfort Temp and Lux"},COMFORT_AVGTEMP:{id:3,name:"Comfort Average Temp"},GUARD_STD:{id:4,name:"Guard Standard"},DRIP_STD:{id:5,name:"Drip Standard"},PRESENCE_OFFICE:{id:6,name:"Presence Office"},PRESENCE_PUBLIC:{id:7,name:"Presence Public"},DISINFECT_OFFICE:{id:8,name:"Disinfect Office"},CLOSE_PROXIMITY_SLOW:{id:9,name:"Close Proximity Slow"},ALL_CAP_SENSORS_RAW:{id:240,name:"All cap sensors raw"}};function k(e){for(var n in I)if(I[n].id==e)return n;return null}const N={SET_SETTING:{port:11,cmd:1,decode:function(e,n){var t=new Object;if(n==e.end)throw{message:"No settings to set"};for(;n<e.length;){if(e.length<n+5)throw{message:"Set settings: Bad data size"};const r=e[n++],i=(e[n++]<<24)+(e[n++]<<16)+(e[n++]<<8)+e[n++];let a=!1;for(var o in I)I[o].id==r&&(a=!0,t[o]={id:r,name:I[o].name,unit:I[o].unit,value:I[o].decode(i)});if(0==a)throw{message:"Unknown setting: "+r}}return t},encode:function(e){var n="";for(var t in e)I.hasOwnProperty(t)&&(n+=d(I[t].id,1)+I[t].encode(e[t].value));return n},name:"Set setting"},GET_SETTING:{port:11,cmd:2,decode:function(e,n){let t=new Object;const o=e[n++],r=k(o);if(null==r)throw{message:"Get settings: Unknown setting "+o};return t[r]={id:o,name:r,unit:I[r].unit},t},encode:function(e){let n="";for(var t in e)for(var o in I)if(t==o){n+=d(I[o].id,1);continue}return n},name:"Get setting"},GET_HISTORY:{port:2,cmd:1,decode:function(e,n){if(5!=e.length)throw{message:"Get history command: Bad package size"};return{first:(e[n++]<<8)+e[n++],last:(e[n++]<<8)+e[n++],unit:"History sequence number"}},encode:function(e){if(0==e.hasOwnProperty("first")||0==e.hasOwnProperty("last"))throw{message:"Expected properties first and last missing"};return d(e.first,2)+d(e.last,2)},name:"Get history"},SET_PROFILE:{port:10,cmd:1,decode:function(e,n){if(2!=e.length)throw{message:"Set profile command: Bad package size"};const t=e[n++];for(var o in y)if(y[o].id==t)return{profile:y[o].name,id:o};throw{message:"Unknown profile "+t}},encode:function(e){if(0==e.hasOwnProperty("id"))throw{message:"Profile id is missing"};const n=e.id;if(0==y.hasOwnProperty(n))throw{message:"Unknown profile "+n};return d(y[n].id,1)},name:"Set profile"},CMD_UNJOIN:{port:10,cmd:8,decode:function(e,n){if(3!=e.length)throw{message:"Unjoin command: Bad package size"};return{minutes:(e[n++]<<8)+e[n++]}},encode:function(e){if(0==e.hasOwnProperty("minutes"))throw{message:"Unjoin requires minutes field"};return d(e.minutes,2)},name:"Unjoin"},CMD_ENDCOMP:{port:224,cmd:6,decode:function(e,n){if(1!=e.length)throw{message:"End compliance test: Bad package size"};return{}},encode:function(e){return""},name:"End compliance test"}},D=e=>{for(let n in P)if(P[n].channel==e)return n;throw{message:"Unknown channel: "+e}},x=(e,n,t,o)=>{const r=e.coding.decode(n,t);let i;return i="object"==typeof r?r:{value:r,unit:e.unit},null!=o&&(i.historyPosition=o),i},M=["OK","Bad setting","Bad payload length","Value not accepted","Unknown command"],U={DIRECT_PORT:{port:1,decode:e=>{if(e.length<2)throw"message: Too few bytes";let n=0;const t=e[n++]<<8|e[n++];let o={};o.historyStart=t;let r=t;for(;n<e.length;){let t=null;128&e[n]&&(t=r--);const i=D(127&e[n++]),a=P[i],d=n+a.coding.getsize(e,n);if(d>e.length)throw{message:"Incomplete data"};o[i]=x(a,e,n,t),n=d}return[o]}},HISTORY_PORT:{port:2,decode:e=>{let n=0,t=[],o=(new Date).getTime();if(e.length<2)throw{message:"Too small history package"};let r=e[n++]<<8|e[n++];for(;n<e.length-5;){let i=1e3*(e[n++]<<24|e[n++]<<16|e[n++]<<8|e[n++]);const a=D(127&e[n++]),d=P[a],s=n+d.coding.getsize(e,n);if(s>e.length)throw{message:"Incomplete data"};let c={};c.timestamp=o-i,c[d]=x(d,e,n,r++),t.push(c),n=s}if(n!=e.length)throw{message:"Invalid history package size"};return t}},SETTINGS_PORT:{port:11,decode:e=>{let n=0,t=[];if((new Date).getTime(),e.length<1)throw{message:"To small settings package"};for(;n<e.length;){let o=e[n++];if(2==o){if(n+5<e.length)throw{message:"Incomplete settings data"};const o=e[n++],r=k(o);if(null==r)throw{message:"Unknown setting id "+o};let i={};i[r]={id:o,value:e[n++]<<24|e[n++]<<16|e[n++]<<8|e[n++],unit:I[r].unit},t.push(i)}else{if(3!=o)throw{message:"Unknown settings uplink format: "+o};{if(n+1!=e.length)throw{message:"Bad status code message length"};const o=e[n++];if(o>=M.length)throw{message:"Unknown status code: "+o};decoded={},decoded.statusCode={value:o,status:M[o]},t.push(decoded)}}}return t}}},F=(e,n)=>{for(let t in U)if(U[t].port==e)return U[t].decode(n);throw"No function for decoding uplinks on port "+e},H=(e,n)=>{if(null==n||n.length<1)throw{message:"Not enough data"};const t=n[0];for(var o in N)if(N[o].port==e&&N[o].cmd==t){let e=N[o].decode(n,1);return e.cmd=N[o],e}throw{message:"Unrecognized downlink"}},V=t(473),G={d:{name:"downlink",func:(e,n)=>H(e,n)},u:{name:"uplink",func:(e,n)=>F(e,n)},l:{name:"legacy uplink",func:(e,n)=>V(n,e)}};function z(e){e.question("Select mode ("+Object.keys(G).map((e=>e+"="+G[e].name))+"): ",(n=>{if(!G[n])return console.log("** Unknown mode: "+n),void z(e);const t=G[n].func,o=G[n].name;e.question("Enter "+o+" port (decimal): ",(n=>{n=Number(n),e.question("Enter "+o+" (hex format): ",(o=>{try{let e=o.replace(/\s/g,""),r=Buffer.from(e,"hex"),i=t(n,r);console.log(JSON.stringify(i))}catch(e){console.log(e)}z(e)}))}))}))}n.decodeLoraStripsDownlink=H,n.decodeLoraStripsUplink=F,n.encodeLoraStripsDownlink=e=>{if(null==e||0==e.hasOwnProperty("cmd"))throw{message:"Bad object for encode, null or missing cmd."};const n=e.cmd.name;for(var t in N)if(n==N[t].name)return{data:d(N[t].cmd,1)+N[t].encode(e),port:N[t].port};throw{message:"Unknown command: "+n}},n.commandLine=function(){let e=null;try{e=t(Object(function(){var e=new Error("Cannot find module 'readline'");throw e.code="MODULE_NOT_FOUND",e}()))}catch(e){console.log(e)}z(e.createInterface({input:process.stdin,output:process.stdout}))},n.rawTranslate=V},670:()=>{},303:()=>{}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var i=n[o]={exports:{}};return e[o](i,i.exports,t),i.exports}var o={};(()=>{var e=o;const n=t(519),r={CheckInConfirmed:{func:(e,n)=>{e.version=n.version,e.idddata=n.idddata}},EmptyReport:{func:(e,n)=>{}},BatteryReport:{func:(e,n)=>e.battery=n.value},IRProximityReport:{func:(e,n)=>e.proximity=n.value},PresenceReport:{func:(e,n)=>e.presence=n.value},IRCloseProximityReport:{func:(e,n)=>e.closeProximity=n.value},CloseProximityAlarm:{func:(e,n)=>e.closeProximityAlarm=n.value},DisinfectAlarm:{func:(e,n)=>e.disinfectAlarm=n.value}},i={historyStart:!1};e.decodeUplink=function(e){const t=e.bytes,o=e.fPort;switch(o){case 1:return function(e){Array.isArray(e)&&(e=e[0]);let n={};for(const t in e){if(!r.hasOwnProperty(t)){if(i.hasOwnProperty(t))continue;throw new Error("The uplink contained "+t+" which is currently not supported by this decoder.")}r[t].func(n,e[t])}return n}(n.decodeLoraStripsUplink(o,t));case 11:return function(e){var n={};if(!Array.isArray(e))throw new Error("Unexpected format emitted by decoder");if(!(e=e[0]).hasOwnProperty("statusCode"))throw new Error("Settings uplinks are not supported by this decoder");return n.statusCode=e.statusCode.value,n}(n.decodeLoraStripsUplink(o,t));case 2:throw new Error("This decoder does not support history data.");default:throw new Error("This decoder will only decode data points and status codes, not metadata or mac commands.")}},e.decodeDownlink=function(e){const t=e.bytes,o=e.fPort;return function(e){let n={};for(const t in e)e[t],e[t].hasOwnProperty("value")&&(n[t]=e[t].value);return e.hasOwnProperty("cmd")&&e.cmd.hasOwnProperty("name")&&(n.cmd=e.cmd.name),n}(n.decodeLoraStripsDownlink(o,t))},e.encodeDownlink=function(e){return function(e){let t={};for(const n in e)"cmd"==n?t.cmd={name:e.cmd}:t[n]={value:e[n]};const o=n.encodeLoraStripsDownlink(t),r=Buffer.from(o.data,"hex");var i=[];for(let e=0;e<r.length;++e)i.push(r.readUInt8(e));return{fPort:o.port,bytes:i}}(e)},e.extractPoints=function(e){return e.message}})(),driver=o})();