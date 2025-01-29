import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private sanitizer: DomSanitizer) { }

  onCelIsEnabledDisabled(e) {
    
    if(e.rowType === "data" && (e.column.dataField === "is_enabled")) {
      let is_enabled =e.data.is_enabled;
    
       if(is_enabled){
          
          e.cellElement.style.color = 'white';
          e.cellElement.style.backgroundColor = '#64B0F2';  
        
        }else{
          
          e.cellElement.style.color = 'white';
          e.cellElement.style.backgroundColor = '#FF5D48';  
      
        }
    }
}

onCellCountriesPrepared(e) {
    
  if(e.rowType === "data" && (e.column.dataField === "is_partner_state" || e.column.dataField === "is_tracer_item")) {
    let is_partner_state =e.data.is_partner_state;
    let is_tracer_item =e.data.is_tracer_item;

     if(is_partner_state || is_tracer_item){
        
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#64B0F2';  
      
      }else{
        
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FF5D48';  
    
      }
  }
  
  if(e.rowType === "data" && (e.column.dataField === "is_enabled")) {
    let is_enabled =e.data.is_enabled;
  
     if(is_enabled){
        
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#64B0F2';  
      
      }else{
        
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FF5D48';  
    
      }
  }


}
returnReportIframe(report_url){
  let iframe = '<iframe class="w-100 h-100" style="height:650px !important" src="'+report_url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>Data</iframe>';
  let text = this.sanitizer.bypassSecurityTrustHtml(iframe);
  return text;
  
}

returnFixedHeightReportIframe(report_url,height){
  let iframe = '<iframe class="w-100 h-100" style="height:"'+height+'" !important" src="'+report_url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>Data</iframe>';
  let text = this.sanitizer.bypassSecurityTrustHtml(iframe);
  return text;
}
returnReportIframeFill(report_url){
  let iframe = '<iframe class="col-lg-12 row" style="height:750px !important" src="'+report_url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>Data</iframe>';
  let text = this.sanitizer.bypassSecurityTrustHtml(iframe);
  return text;
  
}
}
