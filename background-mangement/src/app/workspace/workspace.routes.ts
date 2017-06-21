import { WorkspaceComponent } from './workspace.component';
import { SysMonitorComponent } from '../sys/sys-monitor.component';
import{ OrderComponent } from '../order/order.component';
import{ EvaluateComponent } from '../evaluate/evaluate.component';
import{ FoodsComponent } from '../foods/foods.component';
import { AuthGuard } from './auth-guard';

export const workspaceRoutes = [
    {
        path: '',
        component: WorkspaceComponent,
        canActivate:[AuthGuard],
        children: [
            { path: '',redirectTo:'foods',pathMatch:'full'},
            { path: 'sysmonitor', component: SysMonitorComponent },
            {path: 'order', component: OrderComponent},
            {path: 'evaluate', component: EvaluateComponent},
            {path: 'foods', component: FoodsComponent}
        ]
    }]