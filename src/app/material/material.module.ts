import { NgModule } from '@angular/core';
   import { MatFormFieldModule } from '@angular/material/form-field';
   import { MatInputModule } from '@angular/material/input';
   import { MatButtonModule } from '@angular/material/button';
   import { MatSelectModule } from '@angular/material/select';
   import { MatToolbarModule } from '@angular/material/toolbar';
   import { MatMenuModule } from '@angular/material/menu';

   @NgModule({
     exports: [
       MatFormFieldModule,
       MatInputModule,
       MatButtonModule,
       MatSelectModule,
       MatToolbarModule,
       MatMenuModule
     ]
   })
   export class MaterialModule {}