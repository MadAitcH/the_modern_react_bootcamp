import "./BoxList.css";

import { Component } from "react";
import Box from "../Box";
import NewBoxForm, { Box as IBox } from "../NewBoxForm";

interface BoxListState {
  boxList: IBox[];
}

// TODO: fix any types
class BoxList extends Component<any, BoxListState> {
  constructor(props: any) {
    super(props);

    this.state = {
      boxList: [],
    };

    this.addBox = this.addBox.bind(this);
    this.removeBox = this.removeBox.bind(this);
  }

  addBox(newBox: IBox) {
    this.setState((st) => {
      return {
        boxList: [...st.boxList, newBox],
      };
    });
  }

  removeBox(id: string) {
    this.setState((st) => {
      return {
        boxList: st.boxList.filter((box) => box.id !== id),
      };
    });
  }

  render() {
    return (
      <div className="BoxList">
        <NewBoxForm addBox={this.addBox} />
        <div className="BoxList__boxes">
          {this.state.boxList.map(({ width, height, id, backgroundColor }) => {
            return (
              <Box
                key={id}
                width={width}
                height={height}
                id={id}
                bgColor={backgroundColor}
                removeBox={this.removeBox}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default BoxList;
