import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LongDateFormatterComponent } from './formatter/longDateFormatter';
import { UsernameFormatterComponent } from './formatter/usernameFormatter';
import { AreaTypeFormatterComponent } from './formatter/areaTypeFormatter';
import { CheckFormatterComponent } from './formatter/checkFormatter';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BlockUIModule.forRoot()
  ],
  declarations: [
    LongDateFormatterComponent,
    UsernameFormatterComponent,
    AreaTypeFormatterComponent,
    CheckFormatterComponent,
  ],
  exports: [
    LongDateFormatterComponent,
    UsernameFormatterComponent,
    AreaTypeFormatterComponent,
    CheckFormatterComponent
  ],
  entryComponents: [
    AreaTypeFormatterComponent,
    UsernameFormatterComponent,
    LongDateFormatterComponent,
    CheckFormatterComponent
  ],
})

export class SharedModule { }
