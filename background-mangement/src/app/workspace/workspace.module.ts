import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ng2-bootstrap';
import { PaginationModule } from 'ng2-bootstrap';

import { LeftNavComponent } from '../left-nav/left-nav.component';
import { TopMenuComponent } from '../top-menu/top-menu.component';
import { WorkspaceComponent } from './workspace.component';
import { OrderComponent } from '../order/order.component';
import { EvaluateComponent } from '../evaluate/evaluate.component';
import { FoodsComponent } from '../foods/foods.component';
import { SysMonitorComponent } from '../sys/sys-monitor.component';

import { workspaceRoutes } from './workspace.routes';

import { EChartOptionDirective1 } from '../sys/echart-option.directive';

// 服务
import { CategoryService } from '../service/category.service';
import { EvaluateService } from '../service/evaluate.service';
import { FoodsService } from '../service/foods.service';
import { OrderService } from '../service/order.service';
import { SysService } from '../service/sys.service';

import { AuthGuard } from './auth-guard';

@NgModule({
    imports: [
        ShareModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        RouterModule.forChild(workspaceRoutes)
    ],
    declarations: [
        WorkspaceComponent,
        TopMenuComponent,
        LeftNavComponent,
        SysMonitorComponent,
        EChartOptionDirective1,
        OrderComponent,
        EvaluateComponent,
        FoodsComponent
    ],
    providers: [
        AuthGuard,
        CategoryService,
        FoodsService,
        OrderService,
        EvaluateService,
        SysService
    ]
})

export class WorkspaceModule {

}