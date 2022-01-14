import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class HandlerParams {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  professionalId: string;

  @IsNotEmpty()
  @IsString()
  taskId: string;
}
