import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { StudentsModule } from './modules/students/students.module';
import { CoursesModule } from './modules/courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // All Modules Forl all end-ponts
    UsersModule,
    OrdersModule,
    ProductsModule,
    StudentsModule,
    CoursesModule,
    AuthModule,
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1d' } }),
    MongooseModule.forRoot(
      'mongodb+srv://Yahia:5zWu1tXNnkqiJ9dI@cluster0.z0wznpm.mongodb.net/test',
    ),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
