import { IsString } from 'class-validator';

export class DeleteHandlerParams {
  @IsString()
  id: string;
}
