import { envs } from "./envs";


// Retorna una cadena con el html del correo de verificación
export const checkEmailTemplate = (token: string) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Registro en ContApp</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Gabarito&family=Josefin+Sans:wght@300&family=Staatliches&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Josefin Sans', sans-serif;
            background-color: #f4f4f4;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        table {
            width: 100%;
            margin: 0 auto;
            background-color: white;
            flex-grow: 1;
        }
        h2 {
            font-family: 'Staatliches', sans-serif;
            color: #63000A;
            font-size: 35px;
        }
        p {
            font-family: 'Josefin Sans', sans-serif;
            color: #333;
            font-size: 25px;
        }
        a {
            display: inline-block;
            padding: 12px 24px;
            background-color: #63000A;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-family: 'Staatliches', sans-serif;
            margin-top: 20px;
        }
        .header, .footer {
            background-color: #63000A;
            color: white;
            text-align: center;
            padding: 40px;
        }
        .content {
            text-align: center;
            padding: 30px 20px;
        }
        .footer {
            text-align: left;
            padding: 20px;
        }
        .footer h4 {
            margin: 0;
            font-size: 14px;
            padding-left: 20px;
        }
        @media screen and (max-width: 600px) {
            .header, .footer {
                padding: 20px;
            }
            h2 {
                font-size: 50px;
            }
            p {
                font-size: 14px;
            }
            a {
                padding: 10px 20px;
                font-size: 25px;
            }
            .footer h4 {
                font-size: 12px;
            }
        }
    </style>
</head>
<body>
    <table cellpadding="0" cellspacing="0">
        <tr>
            <td class="header">
                <h1 style="margin: 0;">ContApp</h1>
            </td>
        </tr>
        <tr>
            <td class="content">
                <h2>Confirmación de registro</h2>
                <p>Gracias por registrarte en ContApp. Haz clic en el siguiente botón para confirmar tu registro.</p>
                <br>
                <a href="${envs.API_SERVICE}/register/${token}">Confirmar registro</a>
            </td>
        </tr>
    </table>
    <div class="footer">
        <h4>Todos los derechos reservados</h4>
        <h4>Padilla Pérez Miguel Angel @_miguel_pa</h4>
        <h4>Tenorio Miranda Diego de Jesús @diegoocp10</h4>
    </div>
</body>
</html>`;

export const forgotPasswordEmailTemplate = (token: string) => `
<!DOCTYPE html>
<html>
<head>
    <title>Recuperación de contraseña en ContApp</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Gabarito&family=Josefin+Sans:wght@300&family=Staatliches&display=swap"
        rel="stylesheet">
</head>
<body>
    <table align="center" width="600" cellpadding="0" cellspacing="0">
        <tr>
            <td bgcolor=" #63000A" align="center" style="padding: 40px 0;"></td>
        </tr>
        <tr>
            <td style="text-align: center; padding: 30px; height: 300px;" >
                <h2 style="font-family: 'Gabarito';">Cambio de contraseña</h2>
                <p style="font-family: 'Gabarito';" >Entra al siguente enlace para completar tu proceso de de recuperación de constraseña a ContApp</p>
                <br>
                <a  style="font-family: 'Gabarito';" href="${envs.API_SERVICE}/forgot-pasword/${token}" >Crear cuenta</a>
            </td>
        </tr>
        <tr>
            <td bgcolor=" #63000A" align="center" style="padding: 20px 0;">
                <h4 style="color: white; font-family: 'Gabarito'; margin: 0; padding-left: 2rem; display: flex; justify-content: flex-start;">Todos los derechos reservados </h3>
                <h4 style="color: white; font-family: 'Gabarito'; margin: 0; padding-left: 2rem; display: flex; justify-content: flex-start;">Padilla Pérez Miguel Angel @_migue_pa</h3>
                <h4 style="color: white; font-family: 'Gabarito'; margin: 0; padding-left: 2rem; display: flex; justify-content: flex-start;">Tenorio Miranda Diego de Jesús @diegoocp10</h3>
            </td>
        </tr>
    </table>
</body>
</html>`;