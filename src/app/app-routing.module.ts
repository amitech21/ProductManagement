import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  //{path: '', component: ProductsComponent},
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  //{ path: 'products', loadChildren: './products/products.module.ts#ProductsModule' }
  // If above string giving error in new version, try below code
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  // customer-list
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
   ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
