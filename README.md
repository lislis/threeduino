# Threeduino

Controlling a ThreeJS cube with a gyro sensor from an arduino.

`arduino` contains the ... Arduino project. You need [this MPU6050 lib](https://github.com/tockn/MPU6050_tockn) installed. That's also the name of the sensor that I used.
Connect GND and 5V like usual and SDA to A4 and SCL to A5.
The arduino will write the gyro data in degree angles in csv format to the serial port.

`server` contains a little node server that reads from serial and encodes it into JSON and broadcasts it over a websocket.

`browser` contains an index.html and ThreeJS. All the magic happens in `browser/js/main.js`, where we read from the websocket and parse the JSON. The ThreeJS is standard spinning cube, but the rotation angles are calculated from the arduino data.

That's it.
