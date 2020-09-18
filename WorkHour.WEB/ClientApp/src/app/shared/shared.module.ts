import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { LongDateFormatterComponent } from './formatter/longDateFormatter';
import { UsernameFormatterComponent } from './formatter/usernameFormatter';
import { AreaTypeFormatterComponent } from './formatter/areaTypeFormatter';
import { CheckFormatterComponent } from './formatter/checkFormatter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    LongDateFormatterComponent,
    UsernameFormatterComponent,
    AreaTypeFormatterComponent
    UsernameFormatterComponent,
    CheckFormatterComponent
  ],
  exports: [
    LongDateFormatterComponent,
    UsernameFormatterComponent,
    CheckFormatterComponent
    UsernameFormatterComponent,
    AreaTypeFormatterComponent
  ],
  entryComponents: [
    UsernameFormatterComponent,
    LongDateFormatterComponent,
    CheckFormatterComponent
  ],
    LongDateFormatterComponent,
    AreaTypeFormatterComponent
  ],  
})

export class SharedModule { }
