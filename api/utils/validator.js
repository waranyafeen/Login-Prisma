// validate with yup
import { object, string } from 'yup';

export const registerSchema = object({// ใช้แทน req.body.email
  email: string().email().required(),
  password: string().min(6),
  name: string().min(3),
});

export const loginSchema = object({
  // ใช้แทน req.body.email
  email: string().email().required(),
  password: string().min(6),
});

export const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, {abortEarly: false});
        next();
    } catch(err) {
      const errText = err.errors.join(", ");
      console.log(errText);
      const errs = new Error(errText); // ส่ง error ไปแสดงที่ frontend
      next(errs);
    }
};