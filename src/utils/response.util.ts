export function customResponse<T>(
    status: boolean,
    message: string,
    data: T[] = []
  ): { status: boolean; message: string; data: T[] } {
    return {
      status,
      message,
      data,
    };
  }
