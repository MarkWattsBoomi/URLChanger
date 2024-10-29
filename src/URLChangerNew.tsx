import { FCMNew } from "fcmlib/lib/FCMNew";
import * as React from 'react';
import _URLChanger from "./URLChanger";

export default class URLChanger extends FCMNew {

    //FCMCore will trigger this if we should update
    componentDidMount() {
        if(this.childComponent && this.childComponent.componentDidMount){
            this.childComponent.componentDidMount();
        }
    }

    render() {
        return(
            <_URLChanger 
                parent={this}
                ref={(element: any) => {this.childComponent = element}} // here we are giving FCMCore a ref to our component
            />
        );
    }
}