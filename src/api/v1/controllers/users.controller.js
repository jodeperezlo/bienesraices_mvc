import { check, validationResult } from 'express-validator';
import User from '../models/User.js';
import { generateId } from '../helpers/tokens.js';
import { OK, FAIL } from '../middlewares/responses.js';

const formLogin = (req, res) => {
  res.render('auth/login', {
    page: 'Login',
    title: 'Inicia sesión',
  });
};

const formRegister = (req, res) => {
  res.render('auth/register', {
    page: 'Registro',
    title: 'Crea tu cuenta',
  });
};

const registerUser = async (req, res) => {
  // Validation
  await check('Name', 'Escribe tu nombre para poder registrarte.').notEmpty().run(req);
  await check('Email', 'Escribe un correo electrónico válido para poder registrarte.')
    .isEmail()
    .run(req);
  await check('Password', 'Tu contraseña debe de tener al menos 6 caracteres.')
    .isLength({ min: 6 })
    .run(req);
  await check('ConfirmPassword', 'Las contraseñas no coinciden.')
    .equals(req.body.Password)
    .run(req);

  let resultValidation = validationResult(req);

  const { Name, Email, Password } = req.body;

  if (!resultValidation.isEmpty()) {
    return res.render('auth/register', {
      page: 'Registro',
      title: 'Crea tu cuenta',
      errors: resultValidation.array(),
      user: {
        Name,
        Email,
      },
    });
  }

  // Check if the email is already registered
  const userExists = await User.findOne({ where: { Email } });

  if (userExists) {
    return res.render('auth/register', {
      page: 'Registro',
      title: 'Crea tu cuenta',
      errors: [
        {
          msg: 'El correo electrónico ya se encuentra registrado. Si no recuerdas tu contraseña puedes recuperarla.',
        },
      ],
      user: {
        Name,
        Email,
      },
    });
  }

  // Create the user
  const userSaved = await User.create({
    Name,
    Email,
    Password,
    Token: generateId(),
  });

  // Send the email

  // Redirect to confirm email
  res.render('templates/message', {
    page: 'Success',
    title: 'Cuenta creada correctamente',
    message: 'Te hemos enviado un correo electrónico para que puedas confirmar tu cuenta.',
  });
};

const formForgotPassword = (req, res) => {
  res.render('auth/forgot-password', {
    page: 'Recuperar contraseña',
    title: 'Recupera tu contraseña',
  });
};

export { formLogin, formRegister, formForgotPassword, registerUser };
