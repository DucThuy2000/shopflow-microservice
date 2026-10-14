import { RegisterUserPayload } from '@app/contracts';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthRegisterDto implements RegisterUserPayload {
  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @MaxLength(50)
  @MinLength(4)
  password: string;

  @IsString()
  name: string;
}
