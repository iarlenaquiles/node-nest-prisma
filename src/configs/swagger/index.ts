import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Node API')
  .setDescription('The Node API description')
  .setVersion('1.0')
  .addTag('user')
  .build();

const customOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customSiteTitle: 'Node Api Docs',
};

// swagger
const initialization = (app): void => {
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, customOptions);
};

export default initialization;
