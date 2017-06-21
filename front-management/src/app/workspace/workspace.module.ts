import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ng2-bootstrap';
import { PaginationModule } from 'ng2-bootstrap';



// 组件
import { WorkspaceComponent } from './workspace.component';

import { GoodsComponent } from '../goods';
import { HeaderComponent } from '../header';
import { OrderComponent } from '../order';
import { UserInfoComponent } from '../userinfo'
import { ShopCartComponent } from '../shopcart/shopcart.component';
import { RollControltComponent } from '../rollcontrol/rollcontrol.component';


//路由 
import { workspaceRoutes } from './workspace.routes';


// 服务
import { SellService } from '../service/sell.service';
import { OrderService } from '../service/order.service';
import { AppState } from '../app.service';
import { EvaluateService } from '../service/evaluate.service'

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
        GoodsComponent,
        HeaderComponent,
        OrderComponent,
        UserInfoComponent,
        ShopCartComponent,
        RollControltComponent,
    ],
    providers: [
        AuthGuard,
        SellService,
        OrderService,
        EvaluateService,
        AppState
    ]
})

export class WorkspaceModule {

}