import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { ScheduleModule } from './schedule/schedule.module';
import { MailModule } from './mail/mail.module';
import {EjsAdapter} from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
      synchronize: true,
    }),
    MailerModule.forRoot({

        transport: {
          host: process.env.MAIL_HOST,
          port: 465,
          secure: true,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
          tls: {
            rejectUnauthorized: false,
          },
        },
        defaults: {
          from: `M-Courses" <M-Courses@nestjs.com>`,
        },
        template: {
          dir: __dirname + '/../templates',
          adapter: new EjsAdapter(),
          options: {
            strict: false,
          },
        },
    }),
    NewsModule,
    UserModule,
    AuthModule,
    CourseModule,
    ScheduleModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}