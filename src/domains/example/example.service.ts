import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
  async test(): Promise<{ success: true }> {
    return {
      success: true,
    };
  }
}
