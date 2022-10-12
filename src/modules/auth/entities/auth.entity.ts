import { ApiProperty } from '@nestjs/swagger';

export class LoginEntity {
  @ApiProperty()
  access_token: {
    access: {
      token: string;
      expires: Date;
    };
    refresh: {
      token: string;
      expires: Date;
    };
  };
}

export class RefreshEntity extends LoginEntity {}
