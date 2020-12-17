import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  //{path: '', component: ProductsComponent},
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  //{ path: 'products', loadChildren: './products/products.module.ts#ProductsModule' }
  // If above string giving error in new version, try below code
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  // shopping-list
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
   ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
