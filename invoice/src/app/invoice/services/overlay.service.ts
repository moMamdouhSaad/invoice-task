import { Injectable } from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayComponent } from '../views/overlay/overlay.component';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  private overlayRef: OverlayRef = null;

  constructor(private overlay: Overlay) { }

  showOverlay(){
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }
    const overlayPortal = new ComponentPortal(OverlayComponent); // portal : piece of ui
    const component = this.overlayRef.attach(overlayPortal); // Attach ComponentPortal to PortalHost
    return true
  }

  public hideOverlay() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  
}
