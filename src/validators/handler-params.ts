import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlerParams {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export class ProfessionalHandlerParams {
  @IsNotEmpty()
  id: string;
}
