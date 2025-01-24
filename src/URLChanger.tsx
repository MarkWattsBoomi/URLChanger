import { FCMCore } from "fcmlib/lib/FCMCore";
import React, { CSSProperties } from "react";
declare const manywho: any;

/*
This class shows a chat history.

*/
export default class _URLChanger extends React.Component<any,any> {
    
    timerId = -1;
    
    outcomeName: string;
    delay: number;

    component: FCMCore;

    constructor(props: any) {
        super(props);
        this.timeout = this.timeout.bind(this);
        this.component = this.props.parent;
        if(this.component.getAttribute("outcomename") && this.component.outcomes[this.component.getAttribute("outcomename")]){
            this.outcomeName = this.component.getAttribute("outcomename");
            this.delay = parseInt(this.component.getAttribute("delay", "0"));
            if(this.delay <=1) {
                this.component.triggerOutcome(this.component.getAttribute("outcomeName"));
            }
            else {
                this.timerId = window.setTimeout(this.timeout.bind(this), this.delay);
            }
        }
        else {
            window.location.href = this.props.parent.contentValue;
        }
    }

    async timeout(){
        this.component.triggerOutcome(this.outcomeName);
    }
    
    render() {
        
        return(
            <div/>
        );
    }
}