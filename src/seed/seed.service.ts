import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service'

@Injectable()
export class SeedService {
    constructor(
    private readonly authService: AuthService,
  ) {}


  runSeed() {
    return `This action returns all seed`;
  }

}
