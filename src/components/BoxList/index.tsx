import "./BoxList.css";

import { FC, useState } from "react";
import Box from "../Box";
import NewBoxForm, { Box as IBox } from "../NewBoxForm";

const BoxList: FC = () => {
  const [boxList, setBoxList] = useState<IBox[]>([]);

  const addBox = (newBox: IBox) => {
    setBoxList([...boxList, newBox]);
  };

  const removeBox = (id: string) => {
    setBoxList(boxList.filter((box) => box.id !== id));
  };

  return (
    <div className="BoxList">
      <NewBoxForm addBox={addBox} />
      <div className="BoxList__boxes">
        {boxList.map(({ width, height, id, backgroundColor }) => {
          return (
            <Box
              key={id}
              width={width}
              height={height}
              id={id}
              bgColor={backgroundColor}
              removeBox={removeBox}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BoxList;
