import React, { Component } from "react";
import PixelWindow from "./PixelWindow";
import PixelStreamingClient from "./lib/app";
import PixelStreamingContext from "./lib/pixel-streaming-context";

export default class ReactPixelStreaming extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: PixelStreamingClient.load,
      addResponseEventListener: PixelStreamingClient.addResponseEventListener,
      removeResponseEventListener:
        PixelStreamingClient.removeResponseEventListener,
      emitCommand: PixelStreamingClient.emitCommand,
      emitDescriptor: PixelStreamingClient.emitDescriptor,
      emitUIInteraction: PixelStreamingClient.emitUIInteraction,
      controlScheme: PixelStreamingClient.controlScheme,
      suppressBrowserKeys: PixelStreamingClient.suppressBrowserKeys,
      fakeMouseWithTouches: PixelStreamingClient.fakeMouseWithTouches,
      logs: [123, 456],
      webrtcState: "",
      webRtcPlayerObj: PixelStreamingClient.webRtcPlayerObj,
      connect: PixelStreamingClient.connect,
      actions: {
        updateWebRTCStat: this.updateWebRTCStat
      }
    };
  }

  updateWebRTCStat = webrtcStat => {
    this.setState({
      webrtcState: webrtcStat
    });
  };

  componentDidMount() {
    //        this.state.addResponseEventListener("handle_responses", this.props.handler);
    //        console.log("atached handler");
  }

  componentWillUnmount() {
    //        this.state.removeResponseEventListener("handle_responses");
    //        console.log("removed handler");
  }

  render() {
    const {
      load,
      addResponseEventListener,
      removeResponseEventListener,
      emmitCommand,
      emmitDescriptor,
      emmitUIInteraction
    } = this.state;
    return (
      <PixelStreamingContext.Provider value={this.state}>
        <div style={this.props.style}>
          <PixelStreamingContext.Consumer>
            {context => (
              <PixelWindow
                load={context.load}
                updateWebRTCStat={context.actions.updateWebRTCStat}
                connect={context.connect}
                host="localhost"
              />
            )}
          </PixelStreamingContext.Consumer>
          {this.props.children}
        </div>
      </PixelStreamingContext.Provider>
    );
  }
}
