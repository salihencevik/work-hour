import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { LongDateFormatterComponent } from './formatter/longDateFormatter';
import { UsernameFormatterComponent } from './formatter/usernameFormatter';
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
    CheckFormatterComponent
  ],
  exports: [
    LongDateFormatterComponent,
    UsernameFormatterComponent,
    CheckFormatterComponent
  ],
  entryComponents: [
    UsernameFormatterComponent,
    LongDateFormatterComponent,
    CheckFormatterComponent
  ],
})

export class SharedModule { }
