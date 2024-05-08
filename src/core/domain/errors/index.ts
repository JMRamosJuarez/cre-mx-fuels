import AppError from '@core/domain/entities/app_error';
import FileSystemError from '@core/domain/entities/file_system_error';
import axios, { AxiosError } from 'axios';

export type GenericError =
  | unknown
  | Error
  | AxiosError
  | AppError
  | FileSystemError;

export const instanceOfAppError = (error: GenericError): error is AppError => {
  return (
    error !== null &&
    error !== undefined &&
    typeof error === 'object' &&
    'name' in error &&
    error.name === 'AppError' &&
    'type' in error
  );
};

export const instanceOfAxiosError = (
  error: GenericError,
): error is AxiosError => {
  if (error && typeof error === 'object') {
    return axios.isAxiosError(error);
  }
  return false;
};

export const instanceOfError = (error: GenericError): error is Error => {
  if (error && typeof error === 'object') {
    return 'name' in error && 'message' in error && 'stack' in error;
  }
  return false;
};
export const instanceOfFileSystemError = (
  error: GenericError,
): error is FileSystemError => {
  if (error && typeof error === 'object') {
    return 'message' in error && 'code' in error;
  }
  return false;
};
