import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default layout;
