import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateHandlerParams {
  @IsNotEmpty()
  @IsString()
  id: string;
}
