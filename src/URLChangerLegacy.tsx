import { FCMLegacy } from "fcmlib/lib/FCMLegacy";
import * as React from 'react';
import _URLChanger from "./URLChanger";
declare const manywho: any;

class URLChanger extends FCMLegacy {

    constructor(props: any){
        super(props);
    }

    //FCMCore will trigger this if we should update
    
    componentUpdated(changeDetected: boolean){
        if(this.childComponent && this.childComponent.componentUpdated){
            this.childComponent.componentUpdated();
        }
    }

    render() {
        return(
            <_URLChanger 
                key={this.id}
                parent={this}
                ref={(element: any) => {this.childComponent = element}} // here we are giving FCMCore a ref to our component
            />
        );
    }
}
manywho.component.register('urlchanger', URLChanger);