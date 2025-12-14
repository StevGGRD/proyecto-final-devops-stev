Este documento describe la arquitectura y el flujo de trabajo DevOps implementado para una aplicación web simple que utiliza microservicios.

1. Arquitectura y Componentes del Proyecto
La aplicación está diseñada con tres servicios contenerizados, orquestados para trabajar de manera conjunta utilizando Docker Compose.

Frontend UI: Interfaz de usuario que se comunica con la API.

Verificación en: http://localhost:8080

Backend API: Lógica de negocio y servidor de métricas.

Verificación en: http://localhost:5000

Prometheus: Herramienta para la recolección y monitoreo de métricas de rendimiento.

Verificación en: http://localhost:9090

2. Flujo de Trabajo CI/CD
El proyecto utiliza un Pipeline automatizado gestionado por GitHub Actions para garantizar la Integración y Entrega Continua (CI/CD).

Integración Continua (CI)
El proceso se activa al subir cambios a la rama principal.

Se ejecutan pruebas automatizadas para validar el código.

Se construyen las imágenes de Docker (Frontend y Backend) para asegurar la inmutabilidad.

Entrega Continua (CD)
Las imágenes que han pasado las pruebas se etiquetan.

Las imágenes se suben de forma segura a Docker Hub, dejándolas listas para el despliegue en cualquier entorno.

3. Despliegue y Monitoreo
El despliegue local se realiza utilizando Docker Compose, el cual consume las imágenes validadas y publicadas en Docker Hub.

Verificación de Servicios
Una vez que los contenedores están activos:

Funcionalidad: Acceda a la dirección del Frontend (http://localhost:8080) para interactuar con la aplicación.

Monitoreo: Acceda a la interfaz de Prometheus (http://localhost:9090). En la sección de Targets, verifique que el Backend esté reportando métricas correctamente (estado UP).
