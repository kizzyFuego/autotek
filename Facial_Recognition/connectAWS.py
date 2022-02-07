from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient

host = "THING-END-POINT-"
certPath = "/home/pi/demo/demo-cert/"
clientId = "AutoTekClientID"
topic = "demo-topic"


GPIO.setmode(GPIO.BOARD)
myMQTTClient = AWSIoTMQTTClient(clientId) #random key, if another connection using the same key is opened the previous one is auto closed by AWS IOT
myMQTTClient.configureEndpoint(host, 8883)

myMQTTClient.configureCredentials("/home/pi/AWSIoT/root-ca.pem", "/home/pi/AWSIoT/private.pem.key", "/home/pi/AWSIoT/certificate.pem.crt")

myMQTTClient.configureOfflinePublishQueueing(-1) # Infinite offline Publish queueing
myMQTTClient.configureDrainingFrequency(2) # Draining: 2 Hz
myMQTTClient.configureConnectDisconnectTimeout(10) # 10 sec
myMQTTClient.configureMQTTOperationTimeout(5) # 5 sec
print ('Initiating Realtime Data Transfer From Raspberry Pi...')
myMQTTClient.connect()

def send_message():
    print("Publishing Message To AWS Server....")
    myMQTTClient.publish(
        topic = topic,
        QoS = 1,
        payload = "{'Access':'Granted'}"
        )

def aws_disconnect():
    myMQTTClient.disconnect()
