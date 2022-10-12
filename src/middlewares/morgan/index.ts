import * as morgan from 'morgan';
import logger from '../logger';

morgan.token('message', (req, res) => {
  return res.locals.errorMessage || '';
});

const getIpFormat = (): string =>
  process.env.NODE_ENV === 'production' ? ':remote-addr - ' : '';
const successResponseFormat = `${getIpFormat()}:remote-addr :remote-user :method :url :status :res[content-length] - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:remote-addr :remote-user :method :url :status :res[content-length] - :response-time ms`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: {
    write: (message) => {
      return logger.info(message.trim());
    },
  },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: {
    write: (message) => {
      return logger.error(message.trim());
    },
  },
});

export default {
  successHandler,
  errorHandler,
};
