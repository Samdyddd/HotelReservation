import { WorkspaceComponent } from './workspace.component';

import { GoodsComponent } from '../goods';
import { OrderComponent } from '../order';
import { UserInfoComponent } from '../userinfo';

import { AuthGuard } from './auth-guard';

export const workspaceRoutes = [
    {
        path: '',
        component: WorkspaceComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'goods', pathMatch: 'full' },
            { path: 'goods', component: GoodsComponent },
            { path: 'ratings', component: OrderComponent },
            { path: 'userinfo', component: UserInfoComponent }
        ]
    }]