# Fake e-commerce

## Descripción

Un ejemplo de e-commerce orientado a demostrar habilidades como backend developer

## Tecnologías

<div style="display: flex; width: 100%; justify-content: center;">
    <a href="https://www.typescriptlang.org/">
        <img style="width: 60px; height: 60px; margin: 10px;"
            src="./docs/typescript.png"
            alt="typescript_logo">
    </a>
    <a href="https://nestjs.com">
        <img style="width: 60px; height: 60px; margin: 10px;"
            src="./docs/nest.svg"
            alt="nestjs_logo">
    </a>
    <a href="https://www.prisma.io/">
        <img style="width: 60px; height: 60px; margin: 10px;"
            src="./docs/prisma.svg" alt="prisma_logo">
    </a>
    <a href="https://www.sqlite.org/index.html">
        <img style="width: 120px; height: 60px; margin: 10px;"
            src="./docs/sqlite.png" alt="sqlite_logo">
    </a>
</div>

## Instalación

npm:

```bash

$  npm  install

```

yarn:

```bash

$  yarn  install

```

## Para correr la app

npm:

```bash

# development

$  npm  run  start



# watch mode

$  npm  run  start:dev



# production mode

$  npm  run  start:prod

```

yarn:

```bash

# development

$  yarn  start



# watch mode

$  yarn  start:dev



# production mode

$  yarn  start:prod

```

## Pruebas

npm:

```bash

# unit tests

$  npm  run  test

```

yarn:

```bash

# unit tests

$  yarn  test

```

## Gestor de Base de Datos

npm:

```bash

# database manager

$  npm  run  prisma -- studio

```

yarn:

```bash

# database manager

$  yarn prisma studio

```

## Resolución de Problemas

##### 1 - Sistema de autorización:

Cada request debe contener un token que identifique al
usuario que está accediendo al endpoint. Este token debe ser único para ese
usuario y debe tener una vigencia máxima de 30 minutos.

##### Respuesta:

Para obtener el token de un usuario, primero debe iniciar sesión en el sistema. Luego, debe obtener el token de acceso de la respuesta y utilizarlo en los demás endpoints a través de la cabecera "Authorization". Para hacerlo, debe incluir la cadena "Bearer" seguida del token en la cabecera de la siguiente manera:

`Authorization: Bearer <token>`

Si está utilizando POSTMAN, puede usar las herramientas disponibles para agregar esta cabecera a sus solicitudes.

<img src="./docs/001.png" ></img>

Es importante tener en cuenta que el token de acceso tiene una duración limitada. En este caso, el token expira después de 30 minutos. Puede encontrar esta información en el archivo "auth.module.ts" en la línea que contiene "expiresIn" (línea 19).

```typescript
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { RolesModule } from '../roles/roles.module';
import enviroment from '@/config/enviroment';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    RolesModule,
    JwtModule.register({
      secret: enviroment().jwt.secret,
      signOptions: { expiresIn: '30m' }
    }),
  ],
  providers: [AuthService, JwtStrategy, ConfigService],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
```

##### Ayuda:

Para iniciar sesión en el sistema, debe utilizar el siguiente endpoint:

``POST - http://localhost:3000/api/auth/login``

En el cuerpo de la solicitud, debe incluir el correo electrónico y la contraseña del usuario. Si la solicitud es exitosa, recibirá una respuesta que contiene los datos generales del usuario (excepto la contraseña) y el token de acceso.

Para obtener todos los roles, debe utilizar el siguiente endpoint:

``GET - http://localhost:3000/api/roles``

La respuesta contendrá un arreglo de roles, cada uno compuesto por su ID y su nombre.

Para registrar un usuario en el sistema, debe utilizar el siguiente endpoint:

``POST - http://localhost:3000/api/auth/register``

En el cuerpo de la solicitud, debe incluir el correo electrónico, el nombre y la contraseña del usuario. También puede incluir el ID del rol del usuario si es necesario. Si la solicitud es exitosa, recibirá un mensaje de confirmación. Tenga en cuenta que existen validaciones para los campos de correo electrónico, nombre y contraseña.

##### 2 - CRUD de productos

Todos los usuarios pueden ver productos por su sku
(identificador) pero solo los administradores y editores pueden crear, editar y
eliminar artículos, el resto de los usuarios solo pueden consultar. Cada producto
debe tener:
● Nombre o título
● Precio.
● Cantidad en stock.
● Categoría.
● Tags.
● Descripción.
● Información adicional.
● Valoración.
● Sku (identificador único).
● Imágenes asociadas (solo urls).

##### Respuesta:

En el sistema, cada usuario tiene asignado un rol que está compuesto por diversos permisos, tal como se puede observar en el siguiente ejemplo:

<img  src="./docs/002.png" ></img>

> Los roles y permisos se agregan al sistema mediante el servicio "launcher" ``src/core/launcher/launcher.service.ts`` para facilitar la resolución de problemas.

Esto significa que cualquier usuario puede obtener un producto utilizando su "sku", pero para crear, actualizar o eliminar un producto, el usuario debe tener el permiso correspondiente en su rol, como se muestra en los siguientes ejemplos.

<img src="./docs/003.png" ></img>

> Para obtener un producto por su sku, consulte el siguiente endpoint ``GET localhost:3000/api/products/:sku``.

<img src="./docs/004.png" ></img>

<img src="./docs/005.png" ></img>

<img src="./docs/004.png" ></img>

POR TERMINAR

##### 3 - Endpoint sobre resultados de busqueda

Endpoint que entregue resultados de una búsqueda enviando cualquiera de las
características del producto, una o varias (permitir paginación en base de 10
resultados). Si no se envía ninguna característica el resultado debe ser la lista de
artículos paginada.

##### Respuesta:

```text
POST      -http://localhost:3000/api/products/fecth

QUERY     -page: pagina actual

BODY      -name: que busca productos por su nombre.
          -price: que busca por el precio del producto.         
          -stockQuantity: que busca por la cantidad de stock disponible.
          -category: que busca por la categoría del producto.       
          -tagIds: que busca por los identificadores únicos universales de sus etiquetas.
          -additionalInformation: que busca por la información.adicional del producto.
          -assessment: que busca por la valoración del producto. 
          -description: que busca por la descripción del producto.
          -associatedImage: que busca por la URL guardada de la imagen asociada al producto.

RESPONSE  -products: total de productos filtrados
          -page: pagina actual,
          -totalElement: total de productos,
          -totalPage: total de paginas,
          -perPage: total de productos por pagina
```

##### 4 - Endpoint sobre cantidad de resultados de busqueda

Endpoint que entregue sólo la cantidad de resultados de una búsqueda enviando
cualquiera de las características del producto.

##### Respuesta:

```text
POST      -http://localhost:3000/api/products/total-element

BODY      -name: que busca productos por su nombre.
          -price: que busca por el precio del producto. 
          -stockQuantity: que busca por la cantidad de stock -disponible.
          -category: que busca por la categoría del producto. -tagIds: que busca por los identificadores únicos universales de sus etiquetas.
          -additionalInformation: que busca por la información.adicional del producto.
          -assessment: que busca por la valoración del producto. 
          -description: que busca por la descripción del producto.
          -associatedImage: que busca por la URL guardada de la imagen asociada al producto.

RESPONSE  totalElement: total de productos
```

##### 5 - Endpoint que permita “vender” un artículo.

Esta funcionalidad debe eliminar un (1)
artículo del stock. No se puede vender más de un (1) tipo de artículo a la vez y no se
puede vender más de un (1) artículo del mismo tipo a la vez.

##### Respuesta:

Para poder vender un producto, el usuario necesita tener el permiso "sell_product" incluido en su rol correspondiente.

```text
POST      -http://localhost:3000/api/products/sell/:sku

RESPONSE  -message: mensaje de confirmación

ERRORS    -si el campo stockQuantity es 0, no permite vender
```

##### 6 - Endpoint que permita mostrar la lista de artículos vendidos.

##### Respuesta:

Para mostrar la lista de articulos vendidos, el usuario necesita tener el permiso "get_items_sold" incluido en su rol correspondiente.

```text
GET       -http://localhost:3000/api/sales

QUERY     -page: pagina actual

RESPONSE  -sales: total de ventas filtradas
          -page: pagina actual,
          -totalElement: total de ventas,
          -totalPage: total de paginas,
          -perPage: total de ventas por pagina
```

##### 7 - Endpoint que permita mostrar la ganancia total.

##### Respuesta:

Para poder ver la ganancia total de ventas, el usuario necesita tener el permiso "get_total_amount" incluido en su rol correspondiente.

```text
GET       -http://localhost:3000/api/sales/total_amount

RESPONSE  -totalAmount: monto total de ventas
```

##### 8 - Endpoint que permita mostrar los artículos que no tienen stock en el almacén.

##### Respuesta:

```text
GET       -http://localhost:3000/api/products/without-stock-quantity

QUERY     -page: pagina actual

RESPONSE  -products: total de productos filtrados con 0 stock
          -page: pagina actual,
          -totalElement: total de productos,
          -totalPage: total de paginas,
          -perPage: total de productos por pagina
```

## Datos Extras

## Autor

[David Alfonso Pereira](https://david200197.github.io/david-portafolio)
