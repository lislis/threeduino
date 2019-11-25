// https://github.com/tockn/MPU6050_tockn
// SDA A4
// SCL A5

#include <MPU6050_tockn.h>
#include <Wire.h>

MPU6050 mpu6050(Wire);

long timer = 0;

void setup() {
  Serial.begin(9600);
  Wire.begin();
  mpu6050.begin();
  mpu6050.calcGyroOffsets(true);
}

void loop() {
  mpu6050.update();

  if(millis() - timer > 300){
    Serial.print(mpu6050.getGyroAngleX());
    Serial.print(",");
    Serial.print(mpu6050.getGyroAngleY());
    Serial.print(",");
    Serial.println(mpu6050.getGyroAngleZ());
    timer = millis(); 
  }
}
