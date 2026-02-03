# Hardware Images

Este directorio debe contener las imágenes reales del hardware para la landing page.

## Imágenes Necesarias

1. **emstat-pico.png** - EmStat Pico Development Kit
   - Recomendado: Foto del módulo EmStat Pico
   - Dimensiones sugeridas: 800x600px o similar
   - Formato: PNG con fondo transparente o blanco

2. **raspberry-pi-4.png** - Raspberry Pi 4 Model B
   - Recomendado: Foto de la Raspberry Pi 4 con labels de GPIO
   - Dimensiones sugeridas: 800x600px o similar
   - Formato: PNG

3. **flipper-zero-gpio.png** - Flipper Zero GPIO Pinout
   - Recomendado: Diagrama de pinout GPIO del Flipper Zero
   - Dimensiones sugeridas: 600x800px o similar
   - Formato: PNG

## Cómo Añadir Imágenes

1. Coloca las imágenes en este directorio con los nombres exactos listados arriba
2. Las imágenes se cargarán automáticamente en la landing
3. No necesitas modificar el código - solo reemplaza los placeholders

## Fuentes Sugeridas

- **EmStat Pico**: https://www.palmsens.com/product/emstat-pico/
- **Raspberry Pi**: https://www.raspberrypi.com/products/raspberry-pi-4-model-b/
- **Flipper Zero**: https://docs.flipper.net/gpio

## Nota

Actualmente se muestran placeholders con íconos. Una vez que agregues las imágenes reales,
actualiza las rutas en `/frontend/src/Landing.jsx` de placeholders a:
```jsx
src="/images/hardware/emstat-pico.png"
src="/images/hardware/raspberry-pi-4.png"
src="/images/hardware/flipper-zero-gpio.png"
```
