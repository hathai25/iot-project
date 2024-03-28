//----------------------------------------------------------------------
//  IDE: Visual Studio Code + PlatformIO extension
//  Organization: School of Information and Communication Technogloy,
//                Ha Noi Univerversity of Science and Technology
//  Website: https://soict.hust.edu.vn
//  Example: Read NFC Card via RC522 module and send card information to data center SiOT 
//  Purpose: using SPI interface to connect RC522 module
//
//  Using SIOT Center and virtual device:
//  1. Open the SIOT Center http://siot.soict.ai
//  2. Login with account sinno@soict.hust.edu.vn and password is 123456
//  3. On the left navigation menu, click Arduino Siot Client to see realtime data
//  Shortlink: http://siot.soict.ai/devices/siot-demo
//
//  Dependancies:
//    - miguelbalboa/MFRC522@^1.4.10    
//
//  References:
//    - Thank for the original source code from Miki Balboa, see: https://github.com/miguelbalboa/rfid
//    - Youtube: https://youtu.be/VQAy33XYFEY
//----------------------------------------------------------------------

 
#include <Arduino.h>
#include <SPI.h>
#include <MFRC522.h>
#include <PubSubClient.h>

const char* mqtt_server = "2b36dc7ccb434e1897fe31ba8782b243.s1.eu.hivemq.cloud";

static const char *root_ca PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIFazCCA1OgAwIBAgIRAIIQz7DSQONZRGPgu2OCiwAwDQYJKoZIhvcNAQELBQAw
TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh
cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMTUwNjA0MTEwNDM4
WhcNMzUwNjA0MTEwNDM4WjBPMQswCQYDVQQGEwJVUzEpMCcGA1UEChMgSW50ZXJu
ZXQgU2VjdXJpdHkgUmVzZWFyY2ggR3JvdXAxFTATBgNVBAMTDElTUkcgUm9vdCBY
MTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAK3oJHP0FDfzm54rVygc
h77ct984kIxuPOZXoHj3dcKi/vVqbvYATyjb3miGbESTtrFj/RQSa78f0uoxmyF+
0TM8ukj13Xnfs7j/EvEhmkvBioZxaUpmZmyPfjxwv60pIgbz5MDmgK7iS4+3mX6U
A5/TR5d8mUgjU+g4rk8Kb4Mu0UlXjIB0ttov0DiNewNwIRt18jA8+o+u3dpjq+sW
T8KOEUt+zwvo/7V3LvSye0rgTBIlDHCNAymg4VMk7BPZ7hm/ELNKjD+Jo2FR3qyH
B5T0Y3HsLuJvW5iB4YlcNHlsdu87kGJ55tukmi8mxdAQ4Q7e2RCOFvu396j3x+UC
B5iPNgiV5+I3lg02dZ77DnKxHZu8A/lJBdiB3QW0KtZB6awBdpUKD9jf1b0SHzUv
KBds0pjBqAlkd25HN7rOrFleaJ1/ctaJxQZBKT5ZPt0m9STJEadao0xAH0ahmbWn
OlFuhjuefXKnEgV4We0+UXgVCwOPjdAvBbI+e0ocS3MFEvzG6uBQE3xDk3SzynTn
jh8BCNAw1FtxNrQHusEwMFxIt4I7mKZ9YIqioymCzLq9gwQbooMDQaHWBfEbwrbw
qHyGO0aoSCqI3Haadr8faqU9GY/rOPNk3sgrDQoo//fb4hVC1CLQJ13hef4Y53CI
rU7m2Ys6xt0nUW7/vGT1M0NPAgMBAAGjQjBAMA4GA1UdDwEB/wQEAwIBBjAPBgNV
HRMBAf8EBTADAQH/MB0GA1UdDgQWBBR5tFnme7bl5AFzgAiIyBpY9umbbjANBgkq
hkiG9w0BAQsFAAOCAgEAVR9YqbyyqFDQDLHYGmkgJykIrGF1XIpu+ILlaS/V9lZL
ubhzEFnTIZd+50xx+7LSYK05qAvqFyFWhfFQDlnrzuBZ6brJFe+GnY+EgPbk6ZGQ
3BebYhtF8GaV0nxvwuo77x/Py9auJ/GpsMiu/X1+mvoiBOv/2X/qkSsisRcOj/KK
NFtY2PwByVS5uCbMiogziUwthDyC3+6WVwW6LLv3xLfHTjuCvjHIInNzktHCgKQ5
ORAzI4JMPJ+GslWYHb4phowim57iaztXOoJwTdwJx4nLCgdNbOhdjsnvzqvHu7Ur
TkXWStAmzOVyyghqpZXjFaH3pO3JLF+l+/+sKAIuvtd7u+Nxe5AW0wdeRlN8NwdC
jNPElpzVmbUq4JUagEiuTDkHzsxHpFKVK7q4+63SM1N95R1NbdWhscdCb+ZAJzVc
oyi3B43njTOQ5yOf+1CceWxG1bQVs5ZufpsMljq4Ui0/1lvh+wjChP4kqKOJ2qxq
4RgqsahDYVvTH9w7jXbyLeiNdd8XM2w9U/t7y0Ff/9yi0GE44Za4rF2LN9d11TPA
mRGunUHBcnWEvgJBQl9nJEiU0Zsnvgc/ubhPgXRR4Xq37Z0j4r7g1SgEEzwxA57d
emyPxgcYxn/eR44/KJ4EBs+lVDR3veyJm+kXQ99b21/+jh5Xos1AnX5iItreGCc=
-----END CERTIFICATE-----
)EOF";

#define ENABLE_SIOT     // use it to send NFC card infor to SIOT Data Hub. comment it to ignore.
#ifdef ENABLE_SIOT
  #include "src\siot_core_lib.h"   // SIOT Core Lib - all packages or you could select each package manually.
  // Handler adhoc wifi station
  WiFiSelfEnroll * MyWiFi = new WiFiSelfEnroll();
  WiFiClientSecure & wificlient = WiFiSelfEnroll::GetWiFiClient();
  PubSubClient client(wificlient);
  // SIoT Management Handler, send/receive data to/from SIOT API Center 
  SIOTClient siotclient;  
#endif

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message received on topic: ");
  Serial.println(topic);

  Serial.print("Payload: ");
  for (int i = 0; i < length; i++) {
    
      Serial.print((char)payload[i]);
    
  }
  Serial.println();
}


#define ARDUINO_ARCH_ESP8266

#if defined(ARDUINO_ARCH_ESP32)  
 #if defined(ARDUINO_ESP32_DEV)    // for board DOIT ESP32 DevKit as Readme.md
  #define SS_PIN 21     //   SS/SDA
  #define RST_PIN 0    //   Reset
 #elif defined(ARDUINO_ESP32C3_DEV)    // for board ESP32-C3-DevKitM-1 dual USB as Readme.md
  //  Các tổ hợp vị tri SPI đã thử thành công
  #define SS_PIN   5  // 19 //  19 // 10     //SS/SDA
  #define SCLK_PIN 4  // 18 //  18 //  6   
  #define MOSI_PIN 18 // 5 //  5  //  7   
  #define MISO_PIN 19 // 4 //  4  //  2   
  #define RST_PIN   0 // 0 //  0  //  0
  #endif
#elif  defined(ARDUINO_ARCH_ESP8266)
  // ESP8266 luôn cố định 2 cụm  SPI_PINS_HSPI với SCK=14,MISO=12,MOSI=13, CS=15  
  #define SS_PIN   15 
  #define RST_PIN  0
#endif

MFRC522 rfid(SS_PIN, RST_PIN); // Instance of the class

MFRC522::MIFARE_Key key; 

// Init array that will store new NUID 
byte nuidPICC[4];
String json;
char tmp[4];


/**
 * Helper routine to dump a byte array as hex values to Serial. 
 */
void printHex(byte *buffer, byte bufferSize) {  
  json =  "{\"value\":\"";
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], HEX);
    sprintf(tmp, "%2X" , buffer[i]); 
    json = json + tmp;
  }
  json = json + "\"}";  
}
/**
 * Helper routine to dump a byte array as dec values to Serial.
 */
void printDec(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], DEC);
  }
}

void setClock()
{
  configTime(3 * 3600, 0, "pool.ntp.org", "time.nist.gov");

  Serial.print("Waiting for NTP time sync: ");
  time_t now = time(nullptr);
  while (now < 8 * 3600 * 2) {
    delay(500);
    Serial.print(".");
    now = time(nullptr);
  }
  Serial.println("");
  struct tm timeinfo;
  gmtime_r(&now, &timeinfo);
  Serial.print("Current time: ");
  Serial.print(asctime(&timeinfo));
}

void setup() { 
  // Built-in led ready to bright, to be the lamp indicator
  pinMode(LED_BUILTIN, OUTPUT);
  // Turn of the lamp indicator
  digitalWrite(LED_BUILTIN, LOW);

  // Make sure WiFi ssid/password is correct. Otherwise, raise the Adhoc AP Station with ssid = SOICT_CORE_BOARD and password =  12345678
  MyWiFi->setup();

  setClock();
  BearSSL::X509List *serverTrustedCA = new BearSSL::X509List(root_ca);
  wificlient.setTrustAnchors(serverTrustedCA);
  delete  MyWiFi;
  MyWiFi = _NULL;
  // Declare the virtual device information which you have register at http://siot.soict.ai (free)
  siotclient.Checkin("siot-demo","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIwZDI1NWI5Ni05OWMyLTRmNTItOTg1NS0yZWRhNmI3MzYyMzAiLCJpYXQiOjE2ODcwNzQ4OTd9.SHRCTNASXYEPkYR-ZVadu1P19UPRTHQoHcZjzAoUaiM");
// #endif
  
  Serial.begin(115200);

#if defined(ARDUINO_ARCH_ESP32) &&  defined(ARDUINO_ESP32C3_DEV) // for board ESP32-C3 DevKit as Readme.md
  // ESP32 cho phép chọn chân pin bất kì làm SPI
  SPI.begin(SCLK_PIN, MISO_PIN, MOSI_PIN, SS_PIN);
#else  // defined(ARDUINO_ARCH_ESP8266)
  // ESP8266 luôn cố định 2 cụm  SPI_PINS_HSPI với SCK=14,MISO=12,MOSI=13, CS=15
  SPI.begin(); // Init SPI bus
#endif  
  rfid.PCD_Init(); // Init MFRC522 

  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }
  Serial.println(MyWiFi->GetSSID());
  client.setServer(mqtt_server, 8883);
  client.setCallback(callback);
  Serial.println("Mqtt client done.");
  Serial.println(F("This code scan the MIFARE Classsic NUID."));
  Serial.print(F("Using the following key:"));
  printHex(key.keyByte, MFRC522::MF_KEY_SIZE);
}
 
void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("esp8266", "hathai", "this@hiveMQ1512")) {
      Serial.println("connected");
      client.publish("hathaitopic", "hello world");
      client.subscribe("hathaitopic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  // Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
  if ( ! rfid.PICC_IsNewCardPresent())
    return;

  // Verify if the NUID has been readed
  if ( ! rfid.PICC_ReadCardSerial())
    return;


  // Turn on the lamp indicator whenever find something
  digitalWrite(LED_BUILTIN, HIGH);

  Serial.print(F("PICC type: "));
  MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
  Serial.println(rfid.PICC_GetTypeName(piccType));

  // Check is the PICC of Classic MIFARE type
  if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI && 
    piccType != MFRC522::PICC_TYPE_MIFARE_1K &&
    piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
    Serial.println(F("Your tag is not of type MIFARE Classic."));
    return;
  }

  if (rfid.uid.uidByte[0] != nuidPICC[0] || 
    rfid.uid.uidByte[1] != nuidPICC[1] || 
    rfid.uid.uidByte[2] != nuidPICC[2] || 
    rfid.uid.uidByte[3] != nuidPICC[3] ) {
    Serial.println(F("A new card has been detected."));

    // Store NUID into nuidPICC array
    for (byte i = 0; i < 4; i++) {
      nuidPICC[i] = rfid.uid.uidByte[i];
    }
   
    Serial.println(F("The NUID tag is:"));
    Serial.print(F("In hex: "));
    printHex(rfid.uid.uidByte, rfid.uid.size);
    client.publish("hathaitopic", "hihihi");
 

    Serial.println();
    Serial.print(F("In dec: "));
    printDec(rfid.uid.uidByte, rfid.uid.size);
    Serial.println();
  }
  else 
  {
    Serial.println(F("Card read previously. Yeh"));
  }

  delay(200);
  // Turn off the lamp indicator whenever find something
  digitalWrite(LED_BUILTIN, LOW);

  // Halt PICC
  rfid.PICC_HaltA();

  // Stop encryption on PCD
  rfid.PCD_StopCrypto1();
}