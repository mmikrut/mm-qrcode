import { html, css, LitElement } from 'lit';

export class MmQrcode extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        color: var(--mm-qrcode-text-color, #000);
      }
    `;
  }

  static get properties() {
    return {
      qrText: { type: String, },
      dataUrl: { type: String, },
    };
  }

  constructor() {
    super();
    this.qrText = '';
    this.dataUrl = '';
  }

  requestUpdate(propName,oldVal) {
      const newVal = this[propName];  
      //console.debug('requestUpdate - propName,oldVal,newVal:', propName,oldVal,newVal ); 
      if ( propName === 'qrText' && oldVal !== newVal && !!newVal && typeof QRCode !== "undefined" && QRCode?.toDataURL ) {
        QRCode.toDataURL( newVal).then( (ret) => { /* console.debug('ret:',ret); */ this.dataUrl = ret; });   
      }
      return super.requestUpdate(propName, oldVal);
    }
  
  render() {
    //console.debug("MmQrcode:render()" );
    return html`

    <img src="${this.dataUrl}"/>

    `;
  }
}
