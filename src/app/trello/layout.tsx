import React, { PropsWithChildren } from "react";
import { Toaster } from 'sonner'

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Toaster />
      <div className="p-6">{children}</div>
    </div>
  )
};

export default layout;
