import { HttpStatus, ValidationPipe } from '@nestjs/common';

const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const PASSWORD_RULE_MESSAGE =
  'Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number.';

const VALIDATION_PIPE = new ValidationPipe({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});

export const REGEX = {
  PASSWORD_RULE,
};

export const MESSAGES = {
  PASSWORD_RULE_MESSAGE,
};

export const SETTING = {
  VALIDATION_PIPE,
};
