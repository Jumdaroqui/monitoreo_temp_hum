const username = "Jumdaroqui";
const aio_key = "aio_VRMk82MttT5kMoNfDVLIwkdnqDLJ";

const mqtt = new Paho.MQTT.Client("io.adafruit.com", Number(443), "webClient");

mqtt.onMessageArrived = function (message) {
    const topic = message.destinationName;
    const payload = message.payloadString;

    if (topic === username + "/feeds/tem") {
        document.getElementById("tempValue").innerText = payload;
    } else if (topic === username + "/feeds/hum") {
        document.getElementById("humValue").innerText = payload;
    } else if (topic === username + "/feeds/peso") {
        document.getElementById("weightValue").innerText = payload;
    }
};

mqtt.connect({
    useSSL: true,
    userName: Jumdaroqui,
    password: aio_VRMk82MttT5kMoNfDVLIwkdnqDLJ,
    onSuccess: onConnect,
    onFailure: function (e) { console.log(e); }
});

function onConnect() {
    console.log("Conectado a Adafruit IO MQTT");
    mqtt.subscribe(username + "/feeds/tem");
    mqtt.subscribe(username + "/feeds/hum");
    mqtt.subscribe(username + "/feeds/peso");
}
