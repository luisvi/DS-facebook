const fs = require("fs")
const request = require("request")
const colors = require("colors")

var parameterText, parameterJSON, endPoint, parameterURL, responseJSON;
var startTime, endTime, startTime1, endTime1;

/**
 * Lectura del archivo de parametros y convertirlo en JSON
 */
parameterText = fs.readFileSync("./facebook_parameters.json")
parameterJSON = JSON.parse(parameterText)
/**
 * Creacion de ruta de endpoint
 */
endpoint = parameterJSON["endpoint"]["start_url"] + "/" + parameterJSON["endpoint"]["api_version"] + "/" + parameterJSON["endpoint"]["campaign_id"] + "/" + parameterJSON["endpoint"]["end_url"]
endpoint += "?access_token=" + parameterJSON["credentials"]["access_token"]

/**
 * Creacion de parametros adicionales para el endpoints
 */
if (parameterJSON["parameters"]) {
    for (var i=0; i < parameterJSON["parameters"].length; i++) {
        endpoint += "&"+parameterJSON["parameters"][i]["parameter"]+"="+parameterJSON["parameters"][i]["value"]
    }
}
console.log(endpoint.blue)

/**
 * Recuperar datos consultando el end point
 */
request.get(endpoint, function (err, response, body) {
    if (err) {
        console.log("Error created by request: ".red)
        console.log(err.red)
        console.log(err.toString().red)
    }
    responseJSON = JSON.parse(body)
    if (responseJSON["error"]) {
        console.log("Error returned by API: ".red)
        console.log(responseJSON["error"]["message"].red)
    }
    else {
        console.log(body.green)
    }
})
