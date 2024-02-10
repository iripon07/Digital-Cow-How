import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import ApiError from '../../error/ApiError';
import handleCastError from '../../error/handleCastError';
import handleValidationError from '../../error/handleValidationError';
import handleZodError from '../../error/handleZodError';
import { IGenericErrorMessage } from '../../interfaces/error';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`Global error handler`, error);
  let statusCode = 500;
  let message = `Something went wrong`;
  let errorMessage: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error?.name === 'CastError') {
    const simpliFiedError = handleCastError(error);
    statusCode = simpliFiedError.statusCode;
    message = simpliFiedError.message;
    errorMessage = simpliFiedError.errorMessage;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }
  res.status(400).json({ err: error });
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
