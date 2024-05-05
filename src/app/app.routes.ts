import { Routes } from "@angular/router";
import { authenticationGuard } from "./guards/authentication.guard";

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'player',
        pathMatch: 'full'
    },
    {
        path: 'player',
        loadChildren: () => import('./pages/player/player.module').then(x => x.PlayerModule),
        canMatch: [authenticationGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(x => x.LoginModule)
    }
]