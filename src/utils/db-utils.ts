import { QueryFailedError } from 'typeorm';

function parseDatabaseError(err: Error): DatabaseConstraintError {
  try {
    if (!(err instanceof QueryFailedError)) {
      return { type: 'unknown', message: 'An unknown database error has occurred.' };
    }

    const driverErrorString: string = err.driverError.toString();

    console.log(`[INFO] Driver error string: ${driverErrorString}`);

    const driverErrorStringTokens: string[] = driverErrorString.split(':');

    if (driverErrorStringTokens.length < 3) {
      return { type: 'unknown', message: 'An unknown database error has occurred.' };
    }

    const constraintType: string = driverErrorStringTokens[1].trim().toLowerCase();

    switch (constraintType) {
      case 'unique': {
        const columnName: string = driverErrorStringTokens[2].trim().split('.').at(-1) ?? '';
        return {
          type: 'unique',
          columnName,
          message: `The '${columnName}' property must be unique.`,
        };
      }
      case 'not null': {
        const columnName: string = driverErrorStringTokens[2].trim().split('.').at(-1) ?? '';
        return {
          type: 'not null',
          columnName,
          message: `The '${columnName}' property must not be null.`,
        };
      }
      case 'check': {
        return { type: 'check', message: `Failed a check constraint.` };
      }
      default: {
        return { type: 'unknown', message: 'An unknown database error has occurred.' };
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`[ERROR] ${error.message}\n\t${error.stack}`);
      throw error;
    } else {
      console.error(`[ERROR] ${error}`);
      throw error;
    }
  }
}

export { parseDatabaseError };
