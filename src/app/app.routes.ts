import { Routes } from '@angular/router';
import { Settings } from './pages/settings/settings';
import { Users } from './pages/users/users';
import { Absences } from './pages/absences/absences';
import { Layout } from './components/layout/layout';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' },
            { path: 'users', component: Users },
            { path: 'settings', component: Settings },
            { path: 'absences', component: Absences },
        ]
    }
];
