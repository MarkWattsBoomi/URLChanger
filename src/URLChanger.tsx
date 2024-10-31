import { FCMCore } from "fcmlib/lib/FCMCore";
import React, { CSSProperties } from "react";
declare const manywho: any;

/*
This class shows a chat history.

*/
export default class _URLChanger extends React.Component<any,any> {
    
    component: FCMCore;
    constructor(props: any) {
        super(props);
        this.component = this.props.parent;
        if(this.component.getAttribute("outcomeName") && this.component.outcomes[this.component.getAttribute("outcomeName")]){
            this.component.triggerOutcome(this.component.getAttribute("outcomeName"));
        }
        else {
            window.location.href = this.props.parent.contentValue;
        }
    }

    async componentDidMount() {
    }
    
    render() {
        
        return(
            <div/>
        );
    }
}