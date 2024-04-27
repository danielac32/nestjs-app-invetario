import { Injectable, HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../db-connections/prisma.service';
import { AuthService } from '../auth/auth.service'
import { ProductoService} from '../inventario/producto/producto.service'
import { CategoriasService } from '../inventario/categorias/categorias.service'
import * as bcrypt from 'bcrypt';
import { ValidRoles } from '../auth/interfaces/valid-roles';

@Injectable()
export class SeedService {
    constructor(
    private authService: AuthService,
    private categoriasService: CategoriasService,
    private productoService: ProductoService,
    private prisma: PrismaService,
  ) {}
  
  async createCategoria(){
    const categoriaToCreate = [
        {
          id:1,
          name: 'papeleria'
        },
        {
          id:2,
          name: 'memorias'
        },
        {
          id:3,
          name: 'electricos'
        },
        {
          id:4,
          name: 'herramienta'
        },
        {
          id:5,
          name: 'cables'
        },
    ];
    try {
      await this.prisma.categoria.deleteMany({});
      for (const categoriaData of categoriaToCreate) {
          await this.prisma.categoria.create({
               data: categoriaData
          });
      }
      await this.prisma.$disconnect();
      return true;
    } catch (error) {
     // throw new HttpException('Error eliminando categoria', 500);
      return false;
    }
  }
  async createUsers(){
    const usersToCreate = [
        {
          id:1,
          name: 'daniel quintero',
          email: 'danielquinteroac32@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          rol: ValidRoles.admin,
        },
        {
          id:2,
          name: 'veronica garcia',
          email: 'veronica@gmail.com',
          password: bcrypt.hashSync('123456', 10),
          rol: ValidRoles.user,
        },
    ];

    try {
      const deleted=await this.prisma.userEntity.deleteMany({});
       
      for (const user of usersToCreate) {
        await this.prisma.userEntity.create({
          data: user
        });
      }
      await this.prisma.$disconnect();
      return true;
    } catch (error) {
      //throw new HttpException('Error eliminando usuarios', 500);
      return false;
    }
  }
  async runSeed() {


    if(!this.createUsers())throw new HttpException('Error usuarios', 500);
    if(!this.createCategoria())throw new HttpException('Error categorias', 500);
    const auth=await this.authService.findAll();
    const categoria = await this.categoriasService.findAll();
    return {
          auth,
          categoria

    }
   // this.createCategoria()
  }

}
