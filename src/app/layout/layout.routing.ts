import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { LayoutComponent } from "./layout.component";


const LAYOUT_ROUTES: Routes = [
	{
		path: "",
		component: LayoutComponent,
		children: [


			{ path: "", redirectTo: "signin", pathMatch: "full", },

      {
        path: "home",
        loadChildren: () => import('src/app/pages/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard]
      },{
        path: "signin",
        loadChildren: () => import('src/app/pages/login/login.module').then(m => m.LoginModule)
      },{
        path: "signup",
        loadChildren: () => import('src/app/pages/register/register.module').then(m => m.RegisterModule)
      },
		]
	},

	// 404 Page Not Found
	{ path: "**", redirectTo: "" }
];

export const LayoutRoutingModule = RouterModule.forChild(LAYOUT_ROUTES);

