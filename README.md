# Users App

**Users App** es una prueba técnica desarrollada para la empresa Digital Harbor.  
Este proyecto permite gestionar y visualizar usuarios, implementando buenas prácticas de desarrollo y accesibilidad.

## Versiones utilizadas

- **Node.js**: v22.19.0
- **Angular**: v20.3.1
- **npm**: v10.9.3

## Instalación y ejecución

1. **Clona el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd dh-technical-interview
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Ejecuta la aplicación en modo desarrollo:**
   ```bash
    ng serve
   ```
   La aplicación estará disponible en [http://localhost:4200](http://localhost:4200).

## Ejecución de pruebas unitarias

Para ejecutar los tests unitarios, utiliza el siguiente comando:

```bash
 ng test
```

Esto abrirá el runner de pruebas y mostrará los resultados en tiempo real.

---

## Arquitectura del proyecto

Este proyecto utiliza la arquitectura **Features Module**, recomendada por Angular para aplicaciones escalables y mantenibles.

La estructura se organiza en módulos de características (features), donde cada módulo agrupa los componentes, servicios y archivos relacionados con una funcionalidad principal de la aplicación. Por ejemplo, la gestión de usuarios se encuentra en el módulo `users`, que contiene sus páginas, componentes y servicios propios.

## Funcionalidades principales

La aplicación cuenta con dos páginas principales:  
- **Listado de usuarios:** muestra la lista, permite buscar por nombre, paginar y consultar el historial de búsquedas recientes. La URL se sincroniza con el estado del servicio, manteniendo la página y el filtro de nombre al refrescar.
- **Detalle de usuario:** muestra la información de un usuario específico, obteniendo el ID desde la URL.

La lógica está centralizada en el servicio `Users`, utilizando **signals** para la reactividad, lo que elimina la necesidad de suscripciones manuales y mejora el rendimiento gracias a `ChangeDetectionStrategy.OnPush`.  
Esta combinación permite compartir estados fácilmente entre componentes y páginas, optimizando la experiencia y la mantenibilidad del proyecto.

## Uso de nuevas sintaxis de Angular

El proyecto utiliza todas las nuevas sintaxis y características recomendadas por Angular, incluyendo:

- **Standalone Components** para una estructura más simple.
- **Signals** para manejar la reactividad de forma eficiente y moderna.
- **Templates con sintaxis Angular 17** (`@if`, `@for`, etc.) para mayor claridad y rendimiento.
- **ChangeDetectionStrategy.OnPush** para optimizar la actualización de vistas.

Esto asegura que la aplicación esté alineada con las mejores prácticas y evoluciones del framework.

## Pruebas unitarias

Se implementaron pruebas unitarias tanto para el servicio `Users` como para el componente `UserList`.  

