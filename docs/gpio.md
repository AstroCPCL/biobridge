# BioBridge GPIO & Hardware Guide

Guía para conectar y configurar sensores físicos en Raspberry Pi.

## Requisitos

### Hardware
- Raspberry Pi 3/4/5 (64-bit OS recomendado)
- Sensores I2C/SPI compatibles
- Cables jumper / breadboard

### Software
- Raspberry Pi OS (Bullseye o posterior)
- I2C y SPI habilitados
- BioBridge en modo `gpio`

## Configuración inicial

### 1. Habilitar interfaces

```bash
# Opción A: raspi-config
sudo raspi-config
# -> Interface Options -> I2C -> Enable
# -> Interface Options -> SPI -> Enable

# Opción B: Manual
sudo nano /boot/config.txt
# Agregar/descomentar:
# dtparam=i2c_arm=on
# dtparam=spi=on

sudo reboot
```

### 2. Verificar interfaces

```bash
# I2C
ls /dev/i2c*
# Debería mostrar: /dev/i2c-1

# SPI
ls /dev/spidev*
# Debería mostrar: /dev/spidev0.0  /dev/spidev0.1

# Detectar dispositivos I2C
sudo apt install i2c-tools
sudo i2cdetect -y 1
```

### 3. Instalar dependencias Python

```bash
# En el contenedor o venv
pip install RPi.GPIO smbus2 spidev
```

## Sensores soportados

### Temperatura (I2C)

#### TMP102 / TMP117
- Dirección: 0x48 (default)
- Precisión: ±0.5°C (TMP102) / ±0.1°C (TMP117)
- Rango: -40°C a +125°C

**Conexión:**
```
TMP102    ->    Raspberry Pi
VCC       ->    3.3V (Pin 1)
GND       ->    GND (Pin 6)
SDA       ->    SDA1 (Pin 3)
SCL       ->    SCL1 (Pin 5)
```

**Configuración en .env:**
```bash
GPIO_SENSOR_ADDR_TEMP=0x48
```

### Humedad (I2C)

#### SHT31 / SHT40
- Dirección: 0x44 o 0x45
- Precisión: ±2% RH
- Incluye temperatura

**Conexión:**
```
SHT31     ->    Raspberry Pi
VCC       ->    3.3V (Pin 1)
GND       ->    GND (Pin 6)
SDA       ->    SDA1 (Pin 3)
SCL       ->    SCL1 (Pin 5)
```

#### HTU21D / Si7021
- Dirección: 0x40
- Precisión: ±2% RH

### pH (Analog via ADC)

Los sensores de pH son analógicos y requieren un ADC.

#### Con ADS1115 (ADC I2C)
- Dirección: 0x48 (configurable)
- Resolución: 16-bit

**Conexión:**
```
ADS1115   ->    Raspberry Pi
VCC       ->    3.3V
GND       ->    GND
SDA       ->    SDA1
SCL       ->    SCL1
A0        ->    Salida del módulo pH
```

### Oxígeno disuelto (Analog via ADC)

Similar al pH, requiere ADC. Sensores como Atlas Scientific DO.

### Luz (I2C)

#### BH1750
- Dirección: 0x23 o 0x5C
- Rango: 1-65535 lux

**Conexión:**
```
BH1750    ->    Raspberry Pi
VCC       ->    3.3V
GND       ->    GND
SDA       ->    SDA1
SCL       ->    SCL1
```

## Configuración de Docker

Para acceso GPIO desde contenedor:

```yaml
# docker-compose.yml
services:
  backend:
    # ...
    privileged: true
    devices:
      - /dev/gpiomem:/dev/gpiomem
      - /dev/i2c-1:/dev/i2c-1
      - /dev/spidev0.0:/dev/spidev0.0
      - /dev/spidev0.1:/dev/spidev0.1
```

**Nota de seguridad:** `privileged: true` da acceso completo al hardware. En producción, es preferible usar solo los `devices` necesarios.

## Ejemplo de configuración completa

### .env para modo GPIO

```bash
BIOBRIDGE_MODE=gpio

# I2C
GPIO_I2C_BUS=1

# Sensores
GPIO_SENSOR_ADDR_TEMP=0x48      # TMP102
GPIO_SENSOR_ADDR_HUMIDITY=0x44  # SHT31
GPIO_SENSOR_ADDR_LIGHT=0x23     # BH1750
GPIO_SENSOR_ADDR_ADC=0x48       # ADS1115 para pH/DO
```

### Configuración avanzada en código

```python
# backend/app/services/acquisition/sources/gpio.py
gpio_config = {
    "sensors": [
        {
            "name": "main_temp",
            "type": "i2c",
            "address": "0x48",
            "driver": "tmp102",
            "metric": "temperature",
            "unit": "°C"
        },
        {
            "name": "ambient_humidity",
            "type": "i2c",
            "address": "0x44",
            "driver": "sht31",
            "metric": "humidity",
            "unit": "%"
        },
        {
            "name": "ph_sensor",
            "type": "adc",
            "address": "0x48",
            "channel": 0,
            "driver": "ads1115",
            "metric": "ph",
            "unit": "pH",
            "calibration": {
                "v_ref": 2.5,
                "slope": -5.70,
                "offset": 21.34
            }
        }
    ]
}
```

## Troubleshooting

### "Permission denied" en /dev/i2c-1

```bash
# Agregar usuario al grupo i2c
sudo usermod -aG i2c $USER
# Logout/login

# O cambiar permisos (menos seguro)
sudo chmod 666 /dev/i2c-1
```

### Sensor no detectado en i2cdetect

1. Verificar conexiones físicas
2. Verificar voltaje (3.3V vs 5V)
3. Verificar resistencias pull-up (algunas placas las incluyen)
4. Probar con otro sensor/cable

### Lecturas erráticas

1. Verificar conexiones sueltas
2. Agregar capacitor de desacople (100nF) cerca del sensor
3. Usar cables más cortos
4. Alejar de fuentes de ruido EMI

### El contenedor no ve /dev/i2c-1

1. Verificar que I2C está habilitado en el host
2. Verificar mapeo de devices en docker-compose.yml
3. Probar con `privileged: true`

## Diagrama de conexión

```
Raspberry Pi GPIO Header
========================

           3.3V  (1) (2)  5V
   SDA1 / GPIO2  (3) (4)  5V
   SCL1 / GPIO3  (5) (6)  GND
         GPIO4  (7) (8)  GPIO14
            GND  (9) (10) GPIO15
        GPIO17 (11) (12) GPIO18
        GPIO27 (13) (14) GND
        GPIO22 (15) (16) GPIO23
           3.3V (17) (18) GPIO24
  SPI_MOSI/10  (19) (20) GND
  SPI_MISO/9   (21) (22) GPIO25
  SPI_SCLK/11  (23) (24) GPIO8 / SPI_CE0
           GND (25) (26) GPIO7 / SPI_CE1


Conexión típica I2C:
===================

  Sensor        Pi
  ------       ----
   VCC  -----> Pin 1 (3.3V)
   GND  -----> Pin 6 (GND)
   SDA  -----> Pin 3 (GPIO2/SDA1)
   SCL  -----> Pin 5 (GPIO3/SCL1)
```

## Recursos adicionales

- [Raspberry Pi GPIO Pinout](https://pinout.xyz/)
- [I2C Tutorial](https://learn.sparkfun.com/tutorials/i2c)
- [Atlas Scientific Sensors](https://atlas-scientific.com/)
- [Adafruit Sensor Guide](https://learn.adafruit.com/adafruit-sensors-guide)
