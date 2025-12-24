# Mesa Solidaria

Este proyecto es una aplicación para conectar personas que necesitan ayuda con quienes desean ofrecerla, gestionando diversas formas de colaboración y apoyo.

## Acerca del Proyecto

La aplicación "Mesa Solidaria" se divide en las siguientes secciones principales:

* **Inicio:** Presenta las partes más importantes de la página, ofreciendo una visión general de la iniciativa.
* **Conócenos:** Cuenta la historia de Mesa Solidaria y muestra fotos relacionadas con sus actividades.
* **Proyectos:** Muestra los proyectos actualmente disponibles para participar.
* **Noticias:** Recopila noticias sobre Mesa Solidaria que han aparecido en medios.
* **Sumate:** Incentiva a los usuarios a unirse como voluntarios, con llamados a la acción presentes en toda la página ("Podés ser parte de Mesa").
* **Donar:** Proporciona un correo electrónico para donaciones de materiales (frazadas, etc.) y datos bancarios para donaciones monetarias.

## Primeros Pasos

Para comenzar a utilizar este proyecto, sigue los siguientes pasos:
### Requisitos Previos
**Importante:** Asegúrate de tener el backend de la aplicación funcionando previamente, ya que esta interfaz depende de él.

1.  **Descargar el proyecto:** Clona este repositorio a tu máquina local. Puedes hacerlo usando el siguiente comando:
    ```bash
    git clone [https://github.com/delfi05/FrontMesaSolidaria]
    ```

2.  **Instalar las dependencias:** Navega al directorio del proyecto en tu terminal y ejecuta el siguiente comando para instalar todas las dependencias necesarias:
    ```bash
    npm install
    ```

3.  **Ejecutar el proyecto en modo desarrollo:** Una vez que las dependencias se hayan instalado, puedes iniciar el servidor de desarrollo con el siguiente comando:
    ```bash
    npm run dev
    ```
    Esto debería abrir la aplicación en tu navegador.

## Para Administradores

Para acceder al panel de administración:

1.  Navega a `http://localhost:5173/login` en tu navegador.
2.  Utiliza las siguientes credenciales de administrador:
    * **Email:** `admin@gmail.com`
    * **Contraseña:** `administrador123`
3.  Una vez logueado, en la barra de navegación izquierda, encontrarás las secciones de "Noticias" y "Proyectos". Desde aquí, podrás crear nuevas noticias y proyectos que se mostrarán en la interfaz principal.
4.  Si no hay noticias o proyectos creados, los usuarios verán un mensaje indicando que no hay contenido disponible en esas secciones.
5.  El administrador tiene permisos para agregar, editar y eliminar contenido en todas las secciones del panel de administración, excepto las funcionalidades relacionadas con la gestión de otros administradores.

## Registro de Administradores

Para registrar un nuevo administrador:

1.  Navega a `dministradores

Los administradores pueden registrarse en la plataforma proporcionando su nombre, apellido, email y contraseña para crear una cuenta personal.
