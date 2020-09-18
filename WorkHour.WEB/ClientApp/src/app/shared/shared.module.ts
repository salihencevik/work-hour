import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';
import { LongDateFormatterComponent } from './formatter/longDateFormatter';
import { UsernameFormatterComponent } from './formatter/usernameFormatter';
import { AreaTypeFormatterComponent } from './formatter/areaTypeFormatter';

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
  ],
  exports: [
    LongDateFormatterComponent,
    UsernameFormatterComponent,
    AreaTypeFormatterComponent
  ],
  entryComponents: [
    UsernameFormatterComponent,
    LongDateFormatterComponent,
    AreaTypeFormatterComponent
  ],  
})

export class SharedModule { }
