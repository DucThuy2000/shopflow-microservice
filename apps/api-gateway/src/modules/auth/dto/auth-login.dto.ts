import { LoginUserPayload } from '@app/contracts';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthLoginDto implements LoginUserPayload {
  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @MaxLength(50)
  @MinLength(4)
  password: string;
}
