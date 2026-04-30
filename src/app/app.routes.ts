import { Routes } from '@angular/router';
import { Settings } from './pages/settings/settings';
import { Users } from './pages/users/users';
import { Absences } from './pages/absences/absences';
import { Layout } from './components/layout/layout';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: 'settings', component: Settings },
    {
        path: '',
        component: Layout,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' },
            { path: 'users', component: Users },
            { path: 'absences', component: Absences },
        ]
    }
];
