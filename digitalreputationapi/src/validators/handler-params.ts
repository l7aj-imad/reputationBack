import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class HandlerParams {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export class ProfessionalHandlerParams {
  @IsNotEmpty()
  @IsString()
  id: string;
}
